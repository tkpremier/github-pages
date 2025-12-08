import type { Metadata } from 'next';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Main } from '../src/components/Main';
import { FilterSidebarProviderWrapper } from '../src/components/drive/FilterSidebarProviderWrapper';
import { Header } from '../src/components/header';
import '../src/styles/global.scss';

export const metadata: Metadata = {
  title: 'TK Premier',
  icons: '/favicon.ico'
};

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <html>
    <body>
      <FilterSidebarProviderWrapper>
        <Main>
          <Header />
          {children}
          <footer>
            <Link href="/about" key="about">
              About
            </Link>
            <Link href="/learn" key="learn">
              Learn
            </Link>
            <Link href="/interview" key="interview">
              Interviews
            </Link>
            <Link href="/examples" key="examples">
              Examples
            </Link>
          </footer>
        </Main>
      </FilterSidebarProviderWrapper>
    </body>
  </html>
);

export default Layout;
