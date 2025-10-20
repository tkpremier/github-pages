import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from './header';
import styles from './layout.module.scss';


type Props = {
  title: string;
};

export const Layout = ({ children, title }: PropsWithChildren<Props>) => (
  <div className={styles.container}>
    <Head>
      <title>{`${title} | TK Premier`}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
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
  </div>
);