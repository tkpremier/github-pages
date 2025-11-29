import { useMemo } from 'react';
import { MergedData } from '../../types';
import { extractHashtags } from '../../utils/hashTags';

const isDateHashtag = (tag: string): boolean => {
  // Check if it's an 8-digit hashtag (MMDDYYYY format)
  return /^#\d{8}$/.test(tag);
};

const isYearHashtag = (tag: string): boolean => {
  // Check if it's a 4-digit hashtag (YYYY format)
  return /^#\d{4}$/.test(tag);
};

const sortDateHashtags = (tags: string[]): string[] => {
  return tags.sort((a, b) => {
    const aDigits = a.replace('#', '');
    const bDigits = b.replace('#', '');

    // Parse MMDDYYYY format
    const aMonth = parseInt(aDigits.substring(0, 2), 10);
    const aDay = parseInt(aDigits.substring(2, 4), 10);
    const aYear = parseInt(aDigits.substring(4, 8), 10);

    const bMonth = parseInt(bDigits.substring(0, 2), 10);
    const bDay = parseInt(bDigits.substring(2, 4), 10);
    const bYear = parseInt(bDigits.substring(4, 8), 10);

    // Create date objects for comparison
    const aDate = new Date(aYear, aMonth - 1, aDay);
    const bDate = new Date(bYear, bMonth - 1, bDay);

    return aDate.getTime() - bDate.getTime();
  });
};

const sortYearHashtags = (tags: string[]): string[] => {
  return tags.sort((a, b) => {
    const aYear = parseInt(a.replace('#', ''), 10);
    const bYear = parseInt(b.replace('#', ''), 10);
    return aYear - bYear;
  });
};

export const Tags = ({
  files,
  selectedHashtags,
  toggleHashtag
}: {
  files: MergedData[];
  selectedHashtags: Set<string>;
  toggleHashtag: (tag: string) => void;
}) => {
  const allHashtags = useMemo(() => {
    const hashtagSet = new Set<string>();
    // Only extract hashtags from video and image files
    files
      .filter(file => file?.mimeType?.startsWith('video') || file?.mimeType?.startsWith('image'))
      .forEach(file => {
        const hashtags = extractHashtags(file.description);
        hashtags.forEach(tag => hashtagSet.add(tag));
      });
    return Array.from(hashtagSet);
  }, [files]);

  const categorizedHashtags = useMemo(() => {
    const dateHashtags: string[] = [];
    const yearHashtags: string[] = [];
    const otherHashtags: string[] = [];

    allHashtags.forEach(tag => {
      if (isDateHashtag(tag)) {
        dateHashtags.push(tag);
      } else if (isYearHashtag(tag)) {
        yearHashtags.push(tag);
      } else {
        otherHashtags.push(tag);
      }
    });

    return {
      dates: sortDateHashtags(dateHashtags),
      years: sortYearHashtags(yearHashtags),
      others: otherHashtags.sort()
    };
  }, [allHashtags]);
  return (
    (categorizedHashtags.dates.length > 0 ||
      categorizedHashtags.years.length > 0 ||
      categorizedHashtags.others.length > 0) && (
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>Hashtags</h3>

        {categorizedHashtags.dates.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginTop: 0, marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>Date</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categorizedHashtags.dates.map(tag => {
                const isSelected = selectedHashtags.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleHashtag(tag)}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: isSelected ? '#4CAF50' : '#e0e0e0',
                      color: isSelected ? '#fff' : '#333',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      fontWeight: isSelected ? 'bold' : 'normal'
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#d0d0d0';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#e0e0e0';
                      }
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {categorizedHashtags.years.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ marginTop: 0, marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>Year</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categorizedHashtags.years.map(tag => {
                const isSelected = selectedHashtags.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleHashtag(tag)}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: isSelected ? '#4CAF50' : '#e0e0e0',
                      color: isSelected ? '#fff' : '#333',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      fontWeight: isSelected ? 'bold' : 'normal'
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#d0d0d0';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#e0e0e0';
                      }
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {categorizedHashtags.others.length > 0 && (
          <div>
            <h4 style={{ marginTop: 0, marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>Other</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categorizedHashtags.others.map(tag => {
                const isSelected = selectedHashtags.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleHashtag(tag)}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: isSelected ? '#4CAF50' : '#e0e0e0',
                      color: isSelected ? '#fff' : '#333',
                      border: 'none',
                      borderRadius: '16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      fontWeight: isSelected ? 'bold' : 'normal'
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#d0d0d0';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#e0e0e0';
                      }
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    )
  );

  /**
   *       {(categorizedHashtags.dates.length > 0 ||
        categorizedHashtags.years.length > 0 ||
        categorizedHashtags.others.length > 0) && }
   */
};
