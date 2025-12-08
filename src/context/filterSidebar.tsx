'use client';
import { ReactNode, createContext, useState } from 'react';

interface FilterSidebarContextType {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  content: ReactNode | null;
  setContent: (content: ReactNode | null) => void;
  activeFilterCount: number;
  setActiveFilterCount: (count: number) => void;
}

export const FilterSidebarContext = createContext<FilterSidebarContextType | undefined>(undefined);

export const FilterSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <FilterSidebarContext.Provider
      value={{
        isOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
        content,
        setContent,
        activeFilterCount,
        setActiveFilterCount
      }}
    >
      {children}
    </FilterSidebarContext.Provider>
  );
};
