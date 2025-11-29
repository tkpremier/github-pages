export const extractHashtags = (description?: string | null): string[] => {
  if (!description) return [];
  // Match words that start with # followed by alphanumeric characters
  const hashtagRegex = /#\w+/g;
  const matches = description.match(hashtagRegex);
  return matches ? [...new Set(matches)] : []; // Return unique hashtags
};
