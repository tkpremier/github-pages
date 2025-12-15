import type { Metadata } from 'next';
import Link from 'next/link';
import { PropsWithChildren, Suspense } from 'react';
import { Main } from '../src/components/Main';
import { Header } from '../src/components/header';
import '../src/styles/global.scss';

export const metadata: Metadata = {
  title: 'TK Premier',
  icons: '/favicon.ico'
};

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <html>
    <body>
      <Main>
        <Suspense fallback={<header>Loading...</header>}>
          <Header />
        </Suspense>
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
        </footer>
      </Main>
    </body>
  </html>
);

export default Layout;
