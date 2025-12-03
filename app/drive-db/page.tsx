'use client';
import isNull from 'lodash/isNull';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../src/styles/grid.module.scss';
import utilsStyles from '../../src/styles/utils.module.scss';
import { DBData, MergedData, Model } from '../../src/types';
import { emptyArray, formatBytes, getDuration, getImageLink } from '../../src/utils';
import handleResponse from '../../src/utils/handleResponse';
import { Grid, type CellComponentProps } from 'react-window';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Tags } from '../../src/components/drive/Tags';
import { extractHashtags } from '../../src/utils/hashTags';
import { DriveFileView } from '../../src/components/FileEditor';
import { ModelForm } from '../../src/components/ModelForm';

const getDriveFromDb = async () => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list`, { cache: 'no-store', credentials: 'include' })
    );
    if (response instanceof Error) {
      throw response;
    }
    console.log('response: ', response);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    return emptyArray<DBData>();
  }
};

const getModelsFromDb = async () => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/model`, { cache: 'no-store', credentials: 'include' })
    );
    if (response instanceof Error) {
      throw response;
    }
    console.log('response: ', response);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    return emptyArray();
  }
};

// Helper function to get column count based on window width
const getColumnCount = (width: number): number => {
  if (width >= 769) return 4;
  if (width >= 480) return 2;
  return 1;
};

// Estimate row height - adjust based on your actual item height
const ROW_HEIGHT = 1200;

type GridCellProps = CellComponentProps<{ data: DBData[]; columnCount: number; models: Model[] }>;

const GridCell = ({ columnIndex, rowIndex, style, data, columnCount, models }: GridCellProps) => {
  const index = rowIndex * columnCount + columnIndex;
  const drive = data[index];

  if (!drive) {
    return <div style={style}></div>;
  }

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
        <Link href={`/drive/${drive.id}`}>Go to File Page</Link>
        <br />
        <a target="_blank" rel="noreferrer nofollower" href={drive.webViewLink}>
          Go to File
        </a>
      </p>
      {drive.modelId.length > 0 && (
        <p>
          <strong>Model: </strong>
          {drive.modelId.map(modelId => models.find(model => model.id === modelId)?.name).join(', ')}
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
      <ModelForm drive={drive} models={models} />
      <DriveFileView file={drive as unknown as MergedData} />
    </div>
  );
};

const DriveGrid = ({ data, models }: { data: DBData[]; models: Model[] }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const columnCount = getColumnCount(dimensions.width);
  const columnWidth = dimensions.width > 0 ? dimensions.width / columnCount : 0;
  const rowCount = Math.ceil(data.length / columnCount);
  const gridHeight = dimensions.height > 0 ? dimensions.height - 100 : 600; // Adjust 100px for header/nav

  if (dimensions.width === 0 || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: dimensions.width, height: gridHeight, display: 'flex' }}>
      <Grid
        className={utilsStyles.hideScrollbar}
        columnCount={columnCount}
        columnWidth={columnWidth}
        defaultHeight={gridHeight}
        defaultWidth={dimensions.width}
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        cellComponent={GridCell}
        cellProps={{ data, columnCount, models }}
      />
    </div>
  );
};

const DriveDb = () => {
  const [data, setData] = useState<DBData[]>([]);
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(new Set());

  const [selectedModels, setSelectedModels] = useState<Set<number>>(new Set());

  useEffect(() => {
    getModelsFromDb().then(models => {
      setAllModels(models);
    });
    getDriveFromDb().then(data => {
      setData(data);
    });
  }, []);
  const handleHashtagClick = useCallback((tag: string) => {
    setSelectedHashtags(prev => {
      if (tag === 'clear') {
        return new Set();
      }
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  }, []);

  const handleToggleModel = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedModels(prev => {
      const newSet = new Set(prev);
      const modelId = parseInt(e.target.value);
      if (newSet.has(modelId)) {
        newSet.delete(modelId);
      } else {
        newSet.add(modelId);
      }
      console.log('newSet: ', newSet);
      return newSet;
    });
  }, []);
  const filteredData = useMemo(() => {
    return data.filter(
      d =>
        (d.type === 'video' || d.type === 'image') &&
        (selectedHashtags.size > 0 ? extractHashtags(d.description).some(tag => selectedHashtags.has(tag)) : true) &&
        (selectedModels.size > 0 ? d.modelId.some(modelId => selectedModels.has(modelId)) : true)
    );
  }, [data, selectedHashtags, selectedModels]);
  const sortedModels = useMemo(() => {
    return [...allModels].sort((a, b) => a.name.localeCompare(b.name));
  }, [allModels]);
  return (
    <>
      <Tags
        files={data as unknown as MergedData[]}
        selectedHashtags={selectedHashtags}
        toggleHashtag={handleHashtagClick}
      />
      <fieldset className={styles.checkboxWrapper}>
        <legend>Filter by Model</legend>

        {sortedModels.map(model => (
          <div key={model.id}>
            <label>
              <input type="checkbox" name="model" value={model.id} onChange={handleToggleModel} />
              {model.name}
            </label>
          </div>
        ))}
      </fieldset>
      <DriveGrid data={filteredData} models={allModels} />
    </>
  );
};

export default DriveDb;
