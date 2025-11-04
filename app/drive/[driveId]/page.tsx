import isNull from 'lodash/isNull';
import { getDuration, getImageLink } from '../../../src/utils';
import handleResponse from '../../../src/utils/handleResponse';

const getDriveFile = async (driveId: string) => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/api/drive-file/${driveId}`)
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
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <a href={data.webViewLink} target="_blank" rel="noreferrer nofollower">
        <img
          src={getImageLink(data.thumbnailLink, 's1000', 's220')}
          referrerPolicy="no-referrer"
          loading="lazy"
          title={`${data.name}`}
        />
      </a>
      {data.videoMediaMetadata ? (
        <p>
          <strong>Duration: </strong>
          {getDuration(parseInt(data.videoMediaMetadata?.durationMillis ?? '0', 10))}
        </p>
      ) : null}
    </div>
  ) : (
    data
  );
};

export default DriveFile;
