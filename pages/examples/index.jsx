import { Component, createRef, useEffect, useState } from "react";
import Link from "next/link";
import serialize from "form-serialize";
import Code from "../../components/Code";
import Layout, { MyContext } from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { pubSubClass } from "../../code-examples";

class Examples extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout about>
        <MyContext.Consumer>
          {context => (
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
              <li>
                Try it out:
                <br />
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const { comment } = serialize(e.target, { hash: true });
                    context.addComment(comment);
                  }}
                >
                  <input type="text" required name="comment" />
                  <input type="submit" value="Add Comment" />
                </form>
              </li>
            </ul>
          )}
        </MyContext.Consumer>
      </Layout>
    );
  }
}
Examples.contextType = MyContext;

export default Examples;
