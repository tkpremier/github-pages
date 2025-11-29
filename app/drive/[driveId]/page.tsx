import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';
import isNull from 'lodash/isNull';
import Image from 'next/image';
import { Suspense } from 'react';
import { DriveFileView } from '../../../src/components/FileEditor';
import { getDuration, getImageLink } from '../../../src/utils';
import handleResponse from '../../../src/utils/handleResponse';

const getDriveFile = async (driveId: string) => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.INTERNAL_API_URL}/api/drive-file/${driveId}`, { credentials: 'include' })
    );
    return response;
  } catch (error) {
    console.error('DriveFile error: ', error);
    return { data: null };
  }
};

const DriveFile = async ({ params }: PageProps<'/drive/[driveId]'>) => {
  const { driveId } = await params;
  const { data } = await getDriveFile(driveId);
  return !isNull(data) ? (
    <Suspense fallback={<div>Loading...</div>}>
      <h2>{data.name}</h2>
      {data.webViewLink ? (
        <a href={data.webViewLink} target="_blank" rel="noreferrer nofollower">
          {data.thumbnailLink ? (
            <Image
              src={getImageLink(data.thumbnailLink, 's2400', 's220')}
              referrerPolicy="no-referrer"
              loading="lazy"
              title={`${data.name}`}
              alt={`${data.name} - Thumbnail`}
              width={1200}
              height={1200 * (9 / 16)}
              placeholder="blur"
              blurDataURL="/images/video_placeholder_165x103.svg"
            />
          ) : (
            <Image
              src="/images/video_placeholder_165x103.svg"
              alt={`${data.name} - Placeholder`}
              width={600}
              height={338}
            />
          )}
        </a>
      ) : null}
      <p>
        <strong>Created on: </strong>
        {format(new TZDate(data.createdTime ?? '', 'America/New_York'), 'MM/dd/yyyy, h:mm a')}
      </p>
      {data.viewedByMeTime ? (
        <p>
          <strong>Last viewed: </strong>
          {format(new TZDate(data.viewedByMeTime, 'America/New_York'), 'MM/dd/yyyy, h:mm a')}
        </p>
      ) : null}
      {data.videoMediaMetadata?.durationMillis ? (
        <p>
          <strong>Duration: </strong>
          {getDuration(parseInt(data.videoMediaMetadata?.durationMillis ?? '0', 10))}
        </p>
      ) : null}

      <DriveFileView file={data} />
    </Suspense>
  ) : null;
};

export default DriveFile;
