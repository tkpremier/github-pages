import { Component, createContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/layout.module.scss";
import utilStyles from "../styles/utils.module.scss";
import EventsEmitter from "../events";

const name = "TK Premier";
export const MyContext = createContext({
  addComment: () => {},
  comments: []
});
class Layout extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
    this.addComment = this.addComment.bind(this);
    this.eventsEmitter = new EventsEmitter();
    this.eventsEmitter.on("addComment", e => this.addComment(e));
  }
  addComment(comment) {
    this.setState({
      comments: [...this.state.comments, comment]
    });
  }
  render() {
    const { children, home } = this.props;
    const provider = {
      comments: this.state.comments,
      addComment: this.addComment
    };
    return (
      <div className={styles.container}>
        <Head>
          <title>TKPremier</title>
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
        <MyContext.Provider value={provider}>
          <main>{children}</main>
        </MyContext.Provider>
        <main>
          <div className={styles.grid}>
            <Link href="/about">
              <a className={styles.card}>
                <h3>About TK the Dev &rarr;</h3>
                <p>Get to know me.</p>
              </a>
            </Link>
            <Link href="/examples">
              <a className={styles.card}>
                <h3>Examples</h3>
                <p>Check out some more standard components.</p>
              </a>
            </Link>
            <Link href="/add">
              <a className={styles.card}>
                <h3>Add Data</h3>
                <p>Learn by adding new data and &#x1F4AA; on them skills.</p>
              </a>
            </Link>
            <Link href="/model">
              <a className={styles.card}>
                <h3>Models &rarr;</h3>
                <p>My contacts.</p>
              </a>
            </Link>
            <Link href="/drive">
              <a className={styles.card}>
                <h3>Put that data to work, Tommy</h3>
                <p>Show them how data can get sorted.</p>
              </a>
            </Link>
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
        <style jsx>{`
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
              Courier New, monospace;
          }

          .logo {
            height: 1em;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
              Droid Sans, Helvetica Neue, sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    );
  }
}

export default Layout;
