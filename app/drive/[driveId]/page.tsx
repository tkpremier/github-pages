import { getDuration, getImageLink } from '../../../src/utils';

const getDriveFile = async (driveId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/api/drive-file/${driveId}`);
  const data = await response.json();
  return data;
};

const DriveFile = async ({ params }: PageProps<'/drive/[driveId]'>) => {
  const { driveId } = await params;
  const { data } = await getDriveFile(driveId);
  return (
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
  );
};

export default DriveFile;
