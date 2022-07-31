import { useEffect, useState, createContext } from "react";
import showdown from "showdown";
import Head from "next/head";
import Link from "next/link";
import Layout, { MyContext} from "../components/layout";
import utilStyles from "../styles/utils.module.scss";

interface UserMessage {
  name: string;
  message: string;
}

const Message = (props: UserMessage): any => <p>{props.name}, {props.message}</p>;

export default function Home() {
  return (
    <Layout home>
      <h1 className="title">TK Premier</h1>
      <p className="description">
        Get started.
      </p>
      <MyContext.Consumer>
      {(context: UserMessage) : any => (
        <Message message={context.message} name={context.name} /> 
      )}
      </MyContext.Consumer>
      {/* <section className={utilSt yles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list} >
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
