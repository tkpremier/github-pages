'use client';
import { ReactNode, useEffect } from 'react';
import { useFilterSidebar } from '../../hooks/filterSidebar';

interface FilterSidebarContentProps {
  children: ReactNode;
  activeFilterCount?: number;
}

/**
 * Component to register content with the FilterSidebar.
 * This should wrap the content you want to display in the sidebar.
 * The sidebar itself is rendered via portal and managed globally.
 */
export const FilterSidebarContent = ({ children, activeFilterCount = 0 }: FilterSidebarContentProps) => {
  const { setContent, setActiveFilterCount } = useFilterSidebar();

  useEffect(() => {
    setContent(children);
    setActiveFilterCount(activeFilterCount);

    // Cleanup when component unmounts
    return () => {
      setContent(null);
      setActiveFilterCount(0);
    };
  }, [children, activeFilterCount, setContent, setActiveFilterCount]);

  // This component doesn't render anything itself
  return null;
};
