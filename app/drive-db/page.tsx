'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DriveDbFilters } from '../../src/components/drive-db/DriveDbFilters';
import { DriveGrid } from '../../src/components/drive-db/DriveGrid';
import { FilterSidebarContent } from '../../src/components/drive/FilterSidebarContent';
import { MediaType } from '../../src/components/drive/MediaTypeFilter';
import { DriveContext } from '../../src/context/drive';
import { ModelContext } from '../../src/context/model';
import { DBDataResponse, SortOptionKeys } from '../../src/types';
import { parseModelsFromURL, parseTagsFromURL } from '../../src/utils/drive-db';
import { extractHashtags } from '../../src/utils/hashTags';

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
  const previousSearchParams = useRef<string>(searchParams.toString());

  // Sync filters from URL params when URL changes (e.g., back/forward navigation)
  useEffect(() => {
    const currentSearchParams = searchParams.toString();

    // Skip if searchParams haven't actually changed
    if (previousSearchParams.current === currentSearchParams) {
      return;
    }

    // Skip on initial mount (state already initialized from URL)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousSearchParams.current = currentSearchParams;
      return;
    }

    // If we're updating from URL (flag is set), this means router.replace just updated the URL
    // and we should skip updating state since state already matches what we're setting in the URL
    if (isUpdatingFromURL.current) {
      // Just update the ref to the new searchParams value and return
      previousSearchParams.current = currentSearchParams;
      return;
    }

    // Update ref immediately to prevent re-triggering
    previousSearchParams.current = currentSearchParams;

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
      // Reset flag after state updates complete (use a longer timeout to ensure all effects have run)
      setTimeout(() => {
        isUpdatingFromURL.current = false;
      }, 100);
    } else {
      // If nothing changed, ensure flag is reset
      isUpdatingFromURL.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  // Sync filters to URL when filter state changes (user actions)
  useEffect(() => {
    // Skip on initial mount (state already initialized from URL)
    // But mark as no longer initial mount so subsequent changes work
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip if we're updating from URL to prevent infinite loop
    if (isUpdatingFromURL.current) {
      return;
    }

    // Build expected URL from current state
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
    const expectedQueryString = params.toString();

    // Compare by rebuilding current params the same way we build expected params
    // This ensures consistent encoding
    const currentParamsRebuilt = new URLSearchParams();
    const urlTags = searchParams.get('tags');
    const urlModels = searchParams.get('models');
    const urlMediaType = searchParams.get('mediaType');
    if (urlTags) {
      currentParamsRebuilt.set('tags', urlTags);
    }
    if (urlMediaType) {
      currentParamsRebuilt.set('mediaType', urlMediaType);
    }
    if (urlModels) {
      currentParamsRebuilt.set('models', urlModels);
    }
    const currentQueryStringRebuilt = currentParamsRebuilt.toString();

    // Only update URL if query strings don't match
    if (expectedQueryString !== currentQueryStringRebuilt) {
      const newUrl = expectedQueryString ? `${pathname}?${expectedQueryString}` : pathname;
      // Set flag to prevent URL-to-state sync when router.replace triggers
      isUpdatingFromURL.current = true;
      // Update the previousSearchParams ref to the EXPECTED value
      // This prevents the URL-to-state effect from running when router.replace updates the URL
      previousSearchParams.current = expectedQueryString;
      router.push(newUrl); // Use push to create history entries for back button navigation
      // Reset flag after navigation completes
      setTimeout(() => {
        isUpdatingFromURL.current = false;
      }, 100);
    }
    // Note: searchParams is intentionally NOT in dependencies - we only want this to run when state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHashtags, selectedModels, mediaType, pathname, router]);
  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => (e.target.value !== sortDir ? sortBy(e.target.value) : null),
    [sortDir, sortBy]
  );
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
    return filtered;
  }, [driveData, selectedHashtags, selectedModels, mediaType]);
  const sortedModels = useMemo(() => {
    return [...allModels].sort((a, b) => a.name.localeCompare(b.name));
  }, [allModels]);

  const activeFilterCount = selectedHashtags.size + selectedModels.size + (mediaType !== 'all' ? 1 : 0);

  return (
    <>
      <FilterSidebarContent activeFilterCount={activeFilterCount}>
        <DriveDbFilters
          driveData={driveData as DBDataResponse}
          allModels={allModels}
          mediaType={mediaType}
          setMediaType={setMediaType}
          sortDir={sortDir}
          handleSort={handleSort}
          selectedHashtags={selectedHashtags}
          handleHashtagClick={handleHashtagClick}
          selectedModels={selectedModels}
          handleToggleModel={handleToggleModel}
          handleDrive={handleDrive}
        />
      </FilterSidebarContent>
      <DriveGrid
        data={filteredData.sort((a, b) => {
          const [key, dir]: Array<SortOptionKeys | string> = sortDir.split('-');
          if (key === 'lastViewed' || key === 'createdTime') {
            return dir === 'desc'
              ? new Date(b[key] as unknown as string).getTime() - new Date(a[key] as unknown as string).getTime()
              : new Date(a[key] as unknown as string).getTime() - new Date(b[key] as unknown as string).getTime();
          }
          return dir === 'desc' ? Number(b[key] ?? 0) - Number(a[key] ?? 0) : Number(a[key] ?? 0) - Number(b[key] ?? 0);
        })}
        models={sortedModels}
        handleDrive={handleDrive}
        handleModels={handleModels}
      />
    </>
  );
};

export default () => (
  <Suspense fallback={<div>Drive DB Loading...</div>}>
    <DriveDb />
  </Suspense>
);
