import React, { Component, createContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from './header';
import styles from './layout.module.scss';
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
    const { children, title } = this.props;
    return (
      <div className={styles.container}>
        <Head>
          <title>{title} | TK Premier</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {/* <header className={styles.header}>
          {home ? (
            <>
              
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
        </header> */}
        <MyContext.Provider value={this.state}>
          <main className={styles.mainRoot}>{children}</main>
        </MyContext.Provider>
        <footer>
          <Link href="/about" key="about">
            <a>About</a>
          </Link>
          <Link href="/learn" key="learn">
            <a>Learn</a>
          </Link>
          <Link href="/interview" key="interview">
            <a>Interviews</a>
          </Link>
          <Link href="/examples" key="examples">
            <a>Examples</a>
          </Link>
        </footer>
      </div>
    );
  }
}

export default Layout;
