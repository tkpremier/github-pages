import { MediaType } from '../components/drive/MediaTypeFilter';

/**
 * Parses comma-separated tags from URL parameter
 * @param tagsParam - URL parameter value for tags (e.g., "#tag1,#tag2")
 * @returns Set of tag strings
 */
export const parseTagsFromURL = (tagsParam: string | null): Set<string> => {
  if (!tagsParam) return new Set();
  return new Set(
    tagsParam
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
  );
};

/**
 * Parses comma-separated model IDs from URL parameter
 * @param modelsParam - URL parameter value for models (e.g., "1,2,3")
 * @returns Set of model IDs as numbers
 */
export const parseModelsFromURL = (modelsParam: string | null): Set<number> => {
  if (!modelsParam) return new Set();
  return new Set(
    modelsParam
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !Number.isNaN(id))
  );
};

/**
 * Syncs filter state to URL by updating the router
 * @param router - Next.js router instance with push method
 * @param pathname - Current pathname
 * @param tags - Set of selected tags
 * @param mediaType - Selected media type
 * @param models - Set of selected model IDs
 */
export const syncFiltersToURL = (
  router: { push: (url: string) => void },
  pathname: string,
  tags: Set<string>,
  mediaType: MediaType,
  models: Set<number>
) => {
  const params = new URLSearchParams();
  if (tags.size > 0) {
    params.set('tags', Array.from(tags).join(','));
  }
  if (mediaType !== 'all') {
    params.set('mediaType', mediaType);
  }
  if (models.size > 0) {
    params.set('models', Array.from(models).join(','));
  }
  const queryString = params.toString();
  const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
  router.push(newUrl);
};

