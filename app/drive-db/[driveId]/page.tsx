import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';
import Image from 'next/image';
import { Suspense } from 'react';
import { DriveFileView } from '../../../src/components/FileEditor';
import { getDuration, getImageLink } from '../../../src/utils';
import handleResponse from '../../../src/utils/handleResponse';

const getDriveFile = async (driveId: string) => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.INTERNAL_API_URL}/api/drive-list/${driveId}`, { credentials: 'include' })
    );
    return response;
  } catch (error) {
    console.error('DriveFile error: ', error);
    return { data: [undefined] };
  }
};

const DriveDbFile = async ({ params }: { params: Promise<{ driveId: string }> }) => {
  const { driveId } = await params;
  const { data } = await getDriveFile(driveId);
  const drive = data[0];
  return drive ? (
    <Suspense fallback={<div>Loading...</div>}>
      <h2>{drive.name}</h2>
      {drive.webViewLink ? (
        <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
          {drive.thumbnailLink ? (
            <Image
              src={getImageLink(drive.thumbnailLink, 's2400', 's220')}
              referrerPolicy="no-referrer"
              loading="lazy"
              title={`${drive.name}`}
              alt={`${drive.name} - Thumbnail`}
              width={1200}
              height={1200 * (9 / 16)}
              placeholder="blur"
              blurDataURL="/images/video_placeholder_165x103.svg"
            />
          ) : (
            <Image
              src="/images/video_placeholder_165x103.svg"
              alt={`${drive.name} - Placeholder`}
              width={600}
              height={338}
            />
          )}
        </a>
      ) : null}
      <p>
        <strong>Created on: </strong>
        {format(new TZDate(drive.createdTime ?? '', 'America/New_York'), 'MM/dd/yyyy, h:mm a')}
      </p>
      {drive.viewedByMeTime ? (
        <p>
          <strong>Last viewed: </strong>
          {format(new TZDate(drive.viewedByMeTime, 'America/New_York'), 'MM/dd/yyyy, h:mm a')}
        </p>
      ) : null}
      {drive.duration ? (
        <p>
          <strong>Duration: </strong>
          {getDuration(parseInt(drive.duration ?? '0', 10))}
        </p>
      ) : null}

      <DriveFileView file={drive} source="drive-db" />
    </Suspense>
  ) : null;
};

export default DriveDbFile;
