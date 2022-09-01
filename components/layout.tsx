import React, { Component, createContext, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/layout.module.scss';
import utilStyles from '../styles/utils.module.scss';

const name = 'TK Premier';
const initState = {
  name: 'Tommy',
  message: 'Typescript is cool'
};
export const MyContext = createContext(initState);

type State = Readonly<typeof initState>;

type Props = {
  home?: boolean;
  title: string;
};

class Layout extends Component<React.PropsWithChildren<Props>, State> {
  readonly state: State = initState;
  eventsEmitter: any;
  // addComment = comment => {
  //   this.setState({
  //     comments: [...this.state.comments, comment]
  //   });
  // };
  render() {
    const { children, home, title } = this.props;
    return (
      <div className={styles.container}>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <img
                src="/images/fbprofile.jpg"
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <img
                    src="/images/fbprofile.jpg"
                    className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={utilStyles.colorInherit}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <MyContext.Provider value={this.state}>
          <main className={styles.mainRoot}>{children}</main>
        </MyContext.Provider>
        <main className={styles.mainRoot}>
          <div className={styles.grid}>
            <Link href="/about" key="about">
              <a className={styles.card}>
                <h3>About TK the Dev &rarr;</h3>
                <p>Get to know me.</p>
              </a>
            </Link>
            <Link href="/learn" key="learn">
              <a className={styles.card}>
                <h3>My Learning </h3>
                <p>Always. Be. Collecting (new knowledge).</p>
              </a>
            </Link>
            <Link href="/interview" key="interview">
              <a className={styles.card}>
                <h3>My Interview Experience</h3>
                <p>Companies, dates, and feedback notes.</p>
              </a>
            </Link>
            {/* <Link href="/add" key="add">
              <a className={styles.card}>
                <h3>Add Data</h3>
                <p>Learn by adding new data and &#x1F4AA; on them skills.</p>
              </a>
            </Link> */}
            {/* <Link href="/drive" key="drive">
              <a className={styles.card}>
                <h3>Put that data to work, Tommy</h3>
                <p>Show them how data can get sorted.</p>
              </a>
            </Link> */}
            {/* <Link href="/model" key="model">
              <a className={styles.card}>
                <h3>Models &rarr;</h3>
                <p>My contacts.</p>
              </a>
            </Link> */}
          </div>
        </main>
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Vercel
          </a>
        </footer>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Layout;
