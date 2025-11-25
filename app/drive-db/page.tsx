import isNull from 'lodash/isNull';
import Image from 'next/image';
import Link from 'next/link';
import { Drawer } from '../../src/components/Drawer';
import styles from '../../src/styles/grid.module.scss';
import { DBData } from '../../src/types';
import { emptyArray, getDuration, getImageLink } from '../../src/utils';
import handleResponse from '../../src/utils/handleResponse';

export const dynamic = 'force-dynamic';

const getDriveFromDb = async () => {
  try {
    console.log('process.env.INTERNAL_API_URL: ', process.env.INTERNAL_API_URL);
    const response = await handleResponse(
      await fetch(`${process.env.INTERNAL_API_URL}/api/drive-list`, { cache: 'no-store', credentials: 'include' })
    );
    if (response instanceof Error) {
      throw response;
    }
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    return emptyArray<DBData>();
  }
};

const DriveDb = async () => {
  const data = await getDriveFromDb();
  return (
    <ul className={styles.grid}>
      {data
        .filter((drive: DBData) => drive.type === 'video' || drive.type === 'image')
        .map((drive: DBData) => (
          <li className={styles.gridItem} key={drive.id}>
            <>
              {drive.thumbnailLink && !isNull(drive.thumbnailLink) ? (
                <>
                  <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                      <Image
                        src={getImageLink(drive.thumbnailLink, 's640', 's220')}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        title={`${drive.name}`}
                        alt={`${drive.name} - Thumbnail`}
                        fill={true}
                        placeholder="blur"
                        blurDataURL="/images/video_placeholder_165x103.svg"
                      />
                    </div>
                  </a>
                  <p>
                    <strong>Id:</strong>&nbsp; {drive.id}
                    <br />
                    {/* {drive.description && <strong>{drive.description}</strong>} */}
                    <br />
                    <Link href={`/drive/${drive.id}`}>Go to File Page</Link>
                    <br />
                    <a href={drive.webViewLink}>Go to File</a>
                  </p>
                </>
              ) : (
                <>
                  <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                      <Image
                        src="/images/video_placeholder_165x103.svg"
                        alt={`${drive.name} - Placeholder`}
                        fill={true}
                      />
                    </div>
                  </a>
                  <p>
                    <strong>Id:</strong>&nbsp; {drive.id}
                    <br />
                    {/* {drive.description && <strong>{drive.description}</strong>} */}
                    <br />
                    <a href={drive.webViewLink}>Go to File</a>
                  </p>
                </>
              )}
              <p>
                <strong>{drive.name}</strong>
                <br />
                <strong>Uploaded on:</strong>&nbsp;{drive.createdTime}
              </p>
              <ul>
                <Drawer header={drive.name} key={`${drive.id}-drawer`}>
                  <p>{drive.type}</p>
                  {!isNull(drive.lastViewed) ? (
                    <p>
                      <strong>Last viewed:</strong>&nbsp;{drive.lastViewed}
                    </p>
                  ) : (
                    drive.lastViewed
                  )}
                  {!isNull(drive.duration) ? (
                    <p>
                      <strong>Duration: </strong>
                      {getDuration(drive?.duration ?? 0)}
                    </p>
                  ) : null}
                </Drawer>
              </ul>
            </>
          </li>
        ))}
    </ul>
  );
};

export default DriveDb;
