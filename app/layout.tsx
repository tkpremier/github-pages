import type { Metadata } from 'next';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Header } from '../src/components/header';
import '../src/styles/global.scss';
import styles from '../src/styles/layout.module.scss';

export const metadata: Metadata = {
  title: 'TK Premier',
  icons: '/favicon.ico'
};

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <html className={styles.container}>
    <body>
      <Header />
      <main className={styles.mainRoot}>{children}</main>

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
    </body>
  </html>
);

export default Layout;
