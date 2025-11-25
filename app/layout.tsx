import type { Metadata } from 'next';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Header } from '../src/components/header';
import styles from '../src/styles/layout.module.scss';
// import { Main } from '../src/components/Main';
import '../src/styles/global.scss';

export const metadata: Metadata = {
  title: 'TK Premier',
  icons: '/favicon.ico'
};

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <html>
    <body>
      <div className={styles.mainRoot}>
        {/* <Main> */}
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
        {/* </Main> */}
      </div>
    </body>
  </html>
);

export default Layout;
