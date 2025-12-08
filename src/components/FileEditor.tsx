'use client';
import isNull from 'lodash/isNull';
import { Form } from './Form';

import serialize from 'form-serialize';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { DBData, GoogleDriveAPIResponse } from '../types';
import handleResponse from '../utils/handleResponse';
import isEqual from 'lodash/isEqual';

export const DriveFileView = ({
  source,
  file,
  handleDrive
}: {
  source: 'drive-db' | 'drive-google';
  file: GoogleDriveAPIResponse;
  handleDrive?: (url: string, options: RequestInit) => Promise<{ data: DBData[] } | Error>;
}) => {
  const [driveFile, setDriveFile] = useState<GoogleDriveAPIResponse | null>(file);
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
      console.log('data: ', data);
      if (source === 'drive-google') {
        fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-file/${driveFile?.id}`, options)
          .then(handleResponse)
          .then(res => {
            const updatedFile = res.data as GoogleDriveAPIResponse;
            setDriveFile(f => ({ ...f, ...updatedFile }));
          })
          .catch(err => console.log('err: ', err));
        return;
      }
      if (handleDrive) {
        handleDrive(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-file/${driveFile?.id}`, options)
          .then(res => {
            console.log('res: ', res);
            if (!(res instanceof Error)) {
              setDriveFile({ ...driveFile, ...res.data[0] } as unknown as GoogleDriveAPIResponse);
            }
          })
          .catch(err => console.log('err: ', err));
      }
    },
    [driveFile]
  );
  useEffect(() => {
    if (!isEqual(file, driveFile)) {
      setDriveFile(file);
    }
  }, [file, driveFile]);
  return !isNull(driveFile) && driveFile ? (
    <Form onSubmit={handleSubmit}>
      <h4>Update Drive Info</h4>
      <input type="text" name="name" defaultValue={driveFile.name ?? ''} />
      <input type="text" name="description" defaultValue={driveFile.description ?? ''} />
      <input type="submit" value="Update" />
    </Form>
  ) : null;
};
