'use client';
import isNull from 'lodash/isNull';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Grid, type CellComponentProps } from 'react-window';
import { DriveFileView } from '../../src/components/FileEditor';
import { ModelForm } from '../../src/components/ModelForm';
import { FilterSidebarContent } from '../../src/components/drive/FilterSidebarContent';
import { MediaTypeFilter, type MediaType } from '../../src/components/drive/MediaTypeFilter';
import { Tags } from '../../src/components/drive/Tags';
import { DriveContext } from '../../src/context/drive';
import { ModelContext } from '../../src/context/model';
import styles from '../../src/styles/grid.module.scss';
import utilsStyles from '../../src/styles/utils.module.scss';
import {
  DBData,
  DBDataResponse,
  DriveHandler,
  DriveResponse,
  MergedData,
  Model,
  SortOptionKeys
} from '../../src/types';
import { formatBytes, getDuration, getImageLink } from '../../src/utils';
import { parseModelsFromURL, parseTagsFromURL } from '../../src/utils/drive-db';
import handleResponse from '../../src/utils/handleResponse';
import { extractHashtags } from '../../src/utils/hashTags';

// Helper function to get column count based on window width
const getColumnCount = (width: number): number => {
  if (width >= 769) return 4;
  if (width >= 480) return 2;
  return 1;
};

// Estimate row height - adjust based on your actual item height
const ROW_HEIGHT = 1200;

type GridCellProps = CellComponentProps<{
  data: DBData[];
  columnCount: number;
  models: Model[];
  handleModels: (url: string, options?: RequestInit & { body?: Model }) => Promise<{ data: Model[] } | Error>;
  handleDrive: DriveHandler<DriveResponse>;
}>;

const GridCell = ({
  columnIndex,
  rowIndex,
  style,
  data,
  columnCount,
  models,
  handleModels,
  handleDrive
}: GridCellProps) => {
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

const DriveGrid = ({
  data,
  models,
  handleModels,
  handleDrive
}: {
  data: DBData[];
  models: Model[];
  handleModels: (url: string, options?: RequestInit & { body?: Model }) => Promise<{ data: Model[] } | Error>;
  handleDrive: DriveHandler<DriveResponse>;
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth > 1200 ? 1200 : window.innerWidth,
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
        cellProps={{ data, columnCount, models, handleModels, handleDrive }}
      />
    </div>
  );
};

const DriveDb = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [driveData, handleDrive] = use(DriveContext);
  const [allModels, handleModels] = use(ModelContext);

  // Initialize filter state from URL params
  const [sortDir, sortBy] = useState('createdTime-desc');
  const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(() =>
    parseTagsFromURL(searchParams.get('tags'))
  );
  const [selectedModels, setSelectedModels] = useState<Set<number>>(() =>
    parseModelsFromURL(searchParams.get('models'))
  );
  const [mediaType, setMediaType] = useState<MediaType>(() => {
    const urlMediaType = searchParams.get('mediaType');
    return (urlMediaType === 'image' || urlMediaType === 'video' ? urlMediaType : 'all') as MediaType;
  });

  // Track if we're updating from URL to prevent infinite loops
  const isUpdatingFromURL = useRef(false);
  const isInitialMount = useRef(true);

  // Sync filters to URL when filter state changes (user actions)
  useEffect(() => {
    // Skip on initial mount (state already initialized from URL)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip if we're updating from URL to prevent infinite loop
    if (isUpdatingFromURL.current) {
      return;
    }

    // Update URL with current filter state
    const params = new URLSearchParams();
    if (selectedHashtags.size > 0) {
      params.set('tags', Array.from(selectedHashtags).join(','));
    }
    if (mediaType !== 'all') {
      params.set('mediaType', mediaType);
    }
    if (selectedModels.size > 0) {
      params.set('models', Array.from(selectedModels).join(','));
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Only update URL if it's different from current URL
    const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  }, [selectedHashtags, selectedModels, mediaType, pathname, router, searchParams]);

  // Sync filters to URL when URL params change (e.g., back/forward navigation)
  useEffect(() => {
    const urlTags = parseTagsFromURL(searchParams.get('tags'));
    const urlModels = parseModelsFromURL(searchParams.get('models'));
    const urlMediaType = searchParams.get('mediaType');
    const urlMediaTypeValue = (
      urlMediaType === 'image' || urlMediaType === 'video' ? urlMediaType : 'all'
    ) as MediaType;

    // Compare URL params with current state
    const currentTagsStr = Array.from(selectedHashtags).sort().join(',');
    const urlTagsStr = Array.from(urlTags).sort().join(',');
    const tagsChanged = currentTagsStr !== urlTagsStr;

    const currentModelsStr = Array.from(selectedModels)
      .sort((a, b) => a - b)
      .join(',');
    const urlModelsStr = Array.from(urlModels)
      .sort((a, b) => a - b)
      .join(',');
    const modelsChanged = currentModelsStr !== urlModelsStr;

    if (tagsChanged || modelsChanged || urlMediaTypeValue !== mediaType) {
      isUpdatingFromURL.current = true;
      if (tagsChanged) {
        setSelectedHashtags(urlTags);
      }
      if (modelsChanged) {
        setSelectedModels(urlModels);
      }
      if (urlMediaTypeValue !== mediaType) {
        setMediaType(urlMediaTypeValue);
      }
      // Reset flag in next tick after state updates complete
      requestAnimationFrame(() => {
        isUpdatingFromURL.current = false;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);
  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => (e.target.value !== sortDir ? sortBy(e.target.value) : null),
    []
  );
  const handleSyncDrive = async () => {
    const response = await handleResponse(await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-google-sync`));
    if (response instanceof Error) {
      console.error('error: ', response);
    } else {
      if (response.processed > 0 && response.errors === 0) {
        console.log('response: ', response);
        handleDrive(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list`);
      }
    }
  };
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
      return newSet;
    });
  }, []);
  const filteredData = useMemo(() => {
    const filtered = (driveData as DBDataResponse).data.filter(d => {
      // Filter by media type
      const matchesMediaType =
        mediaType === 'all'
          ? d.type === 'video' || d.type === 'image'
          : mediaType === 'image'
          ? d.type === 'image'
          : d.type === 'video';

      // Filter by hashtags
      const matchesHashtags =
        selectedHashtags.size === 0 || extractHashtags(d.description).some(tag => selectedHashtags.has(tag));

      // Filter by models
      const matchesModels = selectedModels.size === 0 || d.modelId.some(modelId => selectedModels.has(modelId));

      return matchesMediaType && matchesHashtags && matchesModels;
    });
    filtered.sort((a, b) => {
      const [key, dir]: Array<SortOptionKeys | string> = sortDir.split('-');
      if (key === 'lastViewed' || key === 'createdTime') {
        return dir === 'desc'
          ? new Date(b[key] as unknown as string).getTime() - new Date(a[key] as unknown as string).getTime()
          : new Date(a[key] as unknown as string).getTime() - new Date(b[key] as unknown as string).getTime();
      }
      return dir === 'desc' ? Number(b[key] ?? 0) - Number(a[key] ?? 0) : Number(a[key] ?? 0) - Number(b[key] ?? 0);
    });
    return filtered;
  }, [driveData, selectedHashtags, selectedModels, mediaType, sortDir]);
  const sortedModels = useMemo(() => {
    return [...allModels].sort((a, b) => a.name.localeCompare(b.name));
  }, [allModels]);

  const activeFilterCount = selectedHashtags.size + selectedModels.size + (mediaType !== 'all' ? 1 : 0);

  return (
    <>
      <FilterSidebarContent activeFilterCount={activeFilterCount}>
        <button onClick={handleSyncDrive}>Sync Drive</button>
        <MediaTypeFilter selectedType={mediaType} onTypeChange={setMediaType} />
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="sort-select" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
            Sort By
          </label>
          <select
            id="sort-select"
            onChange={handleSort}
            defaultValue={sortDir}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px' }}
          >
            <option value="">Choose Sort</option>
            <option value="createdTime-desc">Created - Latest</option>
            <option value="createdTime-asc">Created - Earliest</option>
            <option value="lastViewed-desc">Viewed - Latest</option>
            <option value="lastViewed-asc">Viewed - Earliest</option>
            <option value="duration-desc">Duration - Longest</option>
            <option value="duration-asc">Duration - shortest</option>
            <option value="size-desc">Size - Largest</option>
            <option value="size-asc">Size - Smallest</option>
          </select>
        </div>
        <Tags
          files={(driveData as DBDataResponse).data as unknown as MergedData[]}
          selectedHashtags={selectedHashtags}
          toggleHashtag={handleHashtagClick}
        />
        <div style={{ marginTop: '20px' }}>
          <fieldset
            className={styles.checkboxWrapper}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              margin: 0
            }}
          >
            <legend style={{ fontWeight: 600, padding: '0 8px' }}>Filter by Model</legend>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '10px 0'
              }}
            >
              {sortedModels.map(model => (
                <label
                  key={model.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f5f5f5';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <input
                    type="checkbox"
                    name="model"
                    value={model.id}
                    onChange={handleToggleModel}
                    checked={selectedModels.has(model.id)}
                  />
                  <span>{model.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </FilterSidebarContent>
      <DriveGrid data={filteredData} models={sortedModels} handleDrive={handleDrive} handleModels={handleModels} />
    </>
  );
};

export default () => (
  <Suspense fallback={<div>Drive DB Loading...</div>}>
    <DriveDb />
  </Suspense>
);
