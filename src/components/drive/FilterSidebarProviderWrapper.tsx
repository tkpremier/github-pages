'use client';
import { ReactNode } from 'react';
import { FilterSidebarProvider } from '../../context/filterSidebar';
import { FilterSidebar } from './FilterSidebar';

export const FilterSidebarProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <FilterSidebarProvider>
      {children}
      <FilterSidebar />
    </FilterSidebarProvider>
  );
};
