import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';

const Examples: React.FunctionComponent<null> = () => (
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

export default Examples;
