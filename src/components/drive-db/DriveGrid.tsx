'use client';
import { useEffect, useState } from 'react';
import { experimental_VGrid as VGrid } from 'virtua';
import utilsStyles from '../../styles/utils.module.scss';
import { DBData, DriveHandler, DriveResponse, Model } from '../../types';
import { GridCell } from './GridCell';

// Helper function to get column count based on window width
const getColumnCount = (width: number): number => {
  if (width >= 769) return 4;
  if (width >= 480) return 2;
  return 1;
};

// Estimate row height - adjust based on your actual item height
const ROW_HEIGHT = 1200;

interface DriveGridProps {
  data: DBData[];
  models: Model[];
  handleModels: (url: string, options?: RequestInit & { body?: Model }) => Promise<{ data: Model[] } | Error>;
  handleDrive: DriveHandler<DriveResponse>;
}

export const DriveGrid = ({ data, models, handleModels, handleDrive }: DriveGridProps) => {
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
      <VGrid
        className={utilsStyles.hideScrollbar}
        row={rowCount}
        col={columnCount}
        cellHeight={ROW_HEIGHT}
        cellWidth={columnWidth}
        style={{ width: dimensions.width, height: gridHeight }}
      >
        {({ rowIndex, colIndex }) => {
          const index = rowIndex * columnCount + colIndex;
          const drive = data[index];
          if (!drive) {
            return null;
          }
          return <GridCell drive={drive} models={models} handleModels={handleModels} handleDrive={handleDrive} />;
        }}
      </VGrid>
    </div>
  );
};
