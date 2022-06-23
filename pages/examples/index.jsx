import { Component, createRef, useEffect, useState } from "react";
import Link from "next/link";
import Code from "../../components/Code";
import Layout, { MyContext } from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { pubSubClass } from "../../code-examples";

class Examples extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <Layout about>
        <h1 className="title">Software Design Patterns</h1>
        <MyContext.Consumer>
          {context => {
            console.log("value: ", context);
            return (
              <ul className="faq">
                <li>
                  <pre>
                    <a
                      href="https://lolahef.medium.com/react-event-emitter-9a3bb0c719"
                      target="_blank"
                      rel="norefferer nofollower"
                    >
                      Source
                    </a>
                  </pre>
                </li>
                <li>
                  <Code text={pubSubClass} />
                </li>
                <li>Try it out</li>
              </ul>
            );
          }}
        </MyContext.Consumer>

        <style jsx>{`
          .faq {
            max-width: 100%;
            list-style: none;
            padding: 0;
          }
        `}</style>
      </Layout>
    );
  }
}
Examples.contextType = MyContext;

export default Examples;
