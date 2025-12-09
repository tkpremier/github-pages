'use client';
import isNull from 'lodash/isNull';
import { Form } from './Form';

import serialize from 'form-serialize';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { DBData, GoogleDriveAPIResponse } from '../types';
import handleResponse from '../utils/handleResponse';

const updateDriveFileApi = (
  driveId: string,
  options: RequestInit & { body?: Partial<GoogleDriveAPIResponse> } = {
    method: 'PATCH',
    credentials: 'include'
  } as RequestInit & { body?: Partial<GoogleDriveAPIResponse> }
) => {
  return new Promise<{ data: GoogleDriveAPIResponse } | Error>(async (resolve, reject) => {
    try {
      if (!driveId) {
        reject(new Error('Drive ID is required'));
      }
      const response = await handleResponse(
        await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-file/${driveId}`, options)
      );
      if (response instanceof Error) {
        reject(response);
      } else {
        resolve({ data: response as GoogleDriveAPIResponse });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const DriveFileView = ({
  source = 'drive-google',
  file,
  handleDrive
}: {
  source?: 'drive-db' | 'drive-google';
  file: GoogleDriveAPIResponse;
  handleDrive?: (url: string, options: RequestInit) => Promise<{ data: DBData[] } | Error>;
}) => {
  const [driveFile, setDriveFile] = useState<GoogleDriveAPIResponse>(file);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.target.name: ', e.target.name);
    console.log('e.target.value: ', e.target.value);
    setDriveFile(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = serialize(form, { hash: true }) as any;

      const options = {
        credentials: 'include' as RequestCredentials,
        method: source === 'drive-google' ? 'PATCH' : 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: source === 'drive-google' ? JSON.stringify(data) : JSON.stringify({ ...driveFile, ...data })
      };
      if (source === 'drive-google') {
        updateDriveFileApi(driveFile.id ?? '', options)
          .then(res => {
            if (res instanceof Error) {
              throw res;
            }
            const updatedFile = res.data as GoogleDriveAPIResponse;
            setDriveFile(f => ({ ...f, ...updatedFile }));
          })
          .catch(err => console.log('err: ', err));
        return;
      }
      if (handleDrive) {
        handleDrive(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list/${driveFile?.id}`, options)
          .then(res => {
            if (!(res instanceof Error)) {
              const body: Partial<GoogleDriveAPIResponse> = {
                name: JSON.parse(options.body as string)?.name,
                description: JSON.parse(options.body as string)?.description
              };
              updateDriveFileApi(driveFile.id ?? '', { ...options, method: 'PATCH', body: JSON.stringify(body) })
                .then(googleResponse => {
                  if (googleResponse instanceof Error) {
                    throw googleResponse;
                  }
                  setDriveFile({ ...driveFile, ...googleResponse.data } as unknown as GoogleDriveAPIResponse);
                })
                .catch(err => {
                  console.error('DB Updated successfully, but google API not updated successfully.  err: ', err);
                  setDriveFile({ ...driveFile, ...res.data[0] } as unknown as GoogleDriveAPIResponse);
                });
            }
          })
          .catch(err => console.log('err: ', err));
      }
    },
    [driveFile]
  );
  useEffect(() => {
    if (file.id !== driveFile.id) {
      setDriveFile(file);
    }
  }, [file, driveFile]);
  return !isNull(driveFile) && driveFile ? (
    <Form onSubmit={handleSubmit}>
      <h4>Update Drive Info</h4>
      <input type="text" name="name" value={driveFile.name ?? ''} onChange={handleChange} />
      <input type="text" name="description" value={driveFile.description ?? ''} onChange={handleChange} />
      <input type="submit" value="Update" />
    </Form>
  ) : null;
};
