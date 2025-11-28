'use client';
import isNull from 'lodash/isNull';
import { Form } from './Form';
import Image from 'next/image';
import { getDuration, getImageLink } from '../utils';
import handleResponse from '../utils/handleResponse';
import { FormEvent, useCallback, useState } from 'react';
import serialize from 'form-serialize';
import { GoogleDriveAPIResponse } from '../types';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export const DriveFileView = ({ file }: { file: GoogleDriveAPIResponse }) => {
  const [driveFile, setDriveFile] = useState<GoogleDriveAPIResponse | null>(file);
  console.log('driveFile: ', driveFile);
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
      <h2>{driveFile.name}</h2>
      {driveFile.webViewLink ? (
        <a href={driveFile.webViewLink} target="_blank" rel="noreferrer nofollower">
          {driveFile.thumbnailLink ? (
            <Image
              src={getImageLink(driveFile.thumbnailLink, 's1200', 's220')}
              referrerPolicy="no-referrer"
              loading="lazy"
              title={`${driveFile.name}`}
              alt={`${driveFile.name} - Thumbnail`}
              width={600}
              height={600 * (9 / 16)}
              placeholder="blur"
              blurDataURL="/images/video_placeholder_165x103.svg"
            />
          ) : (
            <Image
              src="/images/video_placeholder_165x103.svg"
              alt={`${driveFile.name} - Placeholder`}
              width={600}
              height={338}
            />
          )}
        </a>
      ) : null}
      <p>
        <strong>Created on: </strong>
        {format(new TZDate(driveFile.createdTime ?? '', 'America/New_York'), 'MM/dd/yyyy, h:mm a')}
      </p>
      {driveFile.viewedByMeTime ? (
        <p>
          <strong>Last viewed: </strong>
          {format(new TZDate(driveFile.viewedByMeTime, 'America/New_York'), 'MM/dd/yyyy, h:mm a')}
        </p>
      ) : null}
      {driveFile.videoMediaMetadata?.durationMillis ? (
        <p>
          <strong>Duration: </strong>
          {getDuration(parseInt(driveFile.videoMediaMetadata?.durationMillis ?? '0', 10))}
        </p>
      ) : null}
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
