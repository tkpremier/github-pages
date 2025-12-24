'use client';
import isNull from 'lodash/isNull';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/grid.module.scss';
import { DBData, DriveHandler, DriveResponse, MergedData, Model } from '../../types';
import { formatBytes, getDuration, getImageLink } from '../../utils';
import { DriveFileView } from '../FileEditor';
import { ModelForm } from '../ModelForm';

interface GridCellProps {
  drive: DBData;
  models: Model[];
  handleModels: (url: string, options?: RequestInit & { body?: Model }) => Promise<{ data: Model[] } | Error>;
  handleDrive: DriveHandler<DriveResponse>;
  style?: React.CSSProperties;
}

export const GridCell = ({ drive, models, handleModels, handleDrive, style }: GridCellProps) => {
  return (
    <div style={style} className={styles.gridItem}>
      {drive.thumbnailLink && !isNull(drive.thumbnailLink) ? (
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
      ) : (
        <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <Image src="/images/video_placeholder_165x103.svg" alt={`${drive.name} - Placeholder`} fill={true} />
          </div>
        </a>
      )}
      <p>
        <strong>Id:</strong>&nbsp; {drive.id}
        <br />
        {drive.description && <strong>{drive.description}</strong>}
        <br />
        <Link href={`/drive-db/${drive.id}`}>Go to File Page</Link>
        <br />
        <a target="_blank" rel="noreferrer nofollower" href={drive.webViewLink}>
          Go to File
        </a>
      </p>
      {drive.modelId.length > 0 && (
        <p>
          <strong>Model: </strong>
          {drive.modelId.map(modelId => (
            <Link key={modelId} href={`/model/${modelId}`}>
              {models.find(model => model.id === modelId)?.name}
            </Link>
          ))}
        </p>
      )}
      <p>
        <strong>{drive.name}</strong>
        <br />
        <strong>Uploaded on:</strong>&nbsp;{drive.createdTime}
      </p>
      {drive.size && (
        <p>
          <strong>Size: </strong>
          {formatBytes(drive?.size ?? 0)}
        </p>
      )}
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
      <ModelForm drive={drive} models={models} handleModels={handleModels} handleDrive={handleDrive} />
      <DriveFileView source="drive-db" file={drive as unknown as MergedData} handleDrive={handleDrive} />
    </div>
  );
};
