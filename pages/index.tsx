import { useEffect, useState, createContext } from "react";
import showdown from "showdown";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.scss";

export default function Home() {
  return (
    <Layout home>
      <h1 className="title">TK Premier</h1>
      <p className="description">
        Get started.
      </p>
      {/* <section className={utilSt yles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, body, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              <span dangerouslySetInnerHTML={{ __html: converter.makeHtml(body) }} />
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}
