import { Component, createRef, useEffect, useState } from 'react';
import Link from 'next/link';
import serialize from 'form-serialize';
import Code from '../../components/Code';
import Layout, { MyContext } from '../../components/layout';
import utilStyles from '../../styles/utils.module.scss';
import { pubSubClass } from '../../code-examples';

class Examples extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout title="Example Questions">
        <ul className="root">
          <li>
            <Link href="/examples/pub-sub">
              <a>Pub Sub</a>
            </Link>
          </li>
          <li>
            <Link href="/examples/anagram">
              <a>Anagram</a>
            </Link>
          </li>
        </ul>
      </Layout>
    );
  }
}
Examples.contextType = MyContext;

export default Examples;
