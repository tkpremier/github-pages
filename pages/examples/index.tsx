import React from 'react';
import Link from 'next/link';
import {Layout} from '../../components/Layout';

const Examples: React.FunctionComponent<null> = () => (
  <Layout title="Example Questions">
    <ul className="root">
      <li>
        <Link href="/examples/pub-sub">
          Pub Sub
        </Link>
      </li>
      <li>
        <Link href="/examples/anagram">
          Anagram
        </Link>
      </li>
    </ul>
  </Layout>
);

export default Examples;
