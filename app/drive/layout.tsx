import { PropsWithChildren } from 'react';
import { FilterSidebarProviderWrapper } from '../../src/components/drive/FilterSidebarProviderWrapper';
import { DriveProvider } from '../../src/context/drive';
import { ModelProvider } from '../../src/context/model';

const DriveLayout = ({ children }: PropsWithChildren<{}>) => (
  <FilterSidebarProviderWrapper>
    <DriveProvider source="drive">
      <ModelProvider>{children}</ModelProvider>
    </DriveProvider>
  </FilterSidebarProviderWrapper>
);

export default DriveLayout;
