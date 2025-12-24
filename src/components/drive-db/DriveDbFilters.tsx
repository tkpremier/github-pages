'use client';
import { useCallback } from 'react';
import styles from '../../styles/grid.module.scss';
import { DBDataResponse, MergedData, Model } from '../../types';
import handleResponse from '../../utils/handleResponse';
import { MediaTypeFilter, type MediaType } from '../drive/MediaTypeFilter';
import { Tags } from '../drive/Tags';

interface DriveDbFiltersProps {
  driveData: DBDataResponse;
  allModels: Model[];
  mediaType: MediaType;
  setMediaType: (type: MediaType) => void;
  sortDir: string;
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedHashtags: Set<string>;
  handleHashtagClick: (tag: string) => void;
  selectedModels: Set<number>;
  handleToggleModel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrive: (url: string, options?: RequestInit) => Promise<unknown>;
}

export const DriveDbFilters = ({
  driveData,
  allModels,
  mediaType,
  setMediaType,
  sortDir,
  handleSort,
  selectedHashtags,
  handleHashtagClick,
  selectedModels,
  handleToggleModel,
  handleDrive
}: DriveDbFiltersProps) => {
  const handleSyncDrive = useCallback(async () => {
    const response = await handleResponse(await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-google-sync`));
    if (response instanceof Error) {
      console.error('error: ', response);
    } else {
      if (response.processed > 0 && response.errors === 0) {
        console.log('response: ', response);
        handleDrive(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list`);
      }
    }
  }, [handleDrive]);

  const sortedModels = [...allModels].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
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
    </>
  );
};
