import { PropsWithChildren } from 'react';
import { FilterSidebarProviderWrapper } from '../../src/components/drive/FilterSidebarProviderWrapper';
import { DriveProvider } from '../../src/context/drive';
import { ModelProvider } from '../../src/context/model';

const DriveDBLayout = ({ children }: PropsWithChildren<{}>) => (
  <FilterSidebarProviderWrapper>
    <DriveProvider source="drive-db">
      <ModelProvider>{children}</ModelProvider>
    </DriveProvider>
  </FilterSidebarProviderWrapper>
);

export default DriveDBLayout;
