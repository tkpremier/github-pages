'use client';
import isNull from 'lodash/isNull';
import { Form } from './Form';

import serialize from 'form-serialize';
import { FormEvent, useCallback, useState } from 'react';
import { GoogleDriveAPIResponse } from '../types';
import handleResponse from '../utils/handleResponse';

export const DriveFileView = ({ file }: { file: GoogleDriveAPIResponse }) => {
  const [driveFile, setDriveFile] = useState<GoogleDriveAPIResponse | null>(file);
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = serialize(form, { hash: true }) as any;

      const options = {
        credentials: 'include' as RequestCredentials,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      };
      console.log('data: ', data);
      fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-file/${driveFile?.id}`, options)
        .then(handleResponse)
        .then(res => {
          const updatedFile = res.data as GoogleDriveAPIResponse;
          setDriveFile(f => ({ ...f, ...updatedFile }));
        })
        .catch(err => console.log('err: ', err));
    },
    [driveFile]
  );
  return !isNull(driveFile) && driveFile ? (
    <>
      <Form onSubmit={handleSubmit}>
        <input type="text" name="name" defaultValue={driveFile.name ?? ''} />
        <input type="text" name="description" defaultValue={driveFile.description ?? ''} />
        <input type="submit" value="Update" />
      </Form>
    </>
  ) : (
    driveFile
  );
};
