import { useContext } from 'react';
import { FilterSidebarContext } from '../context/filterSidebar';

export const useFilterSidebar = () => {
  const context = useContext(FilterSidebarContext);
  if (context === undefined) {
    throw new Error('useFilterSidebar must be used within a FilterSidebarProvider');
  }
  return context;
};
