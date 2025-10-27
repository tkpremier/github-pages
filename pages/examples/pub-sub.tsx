import Link from 'next/link';
import { pubSubClass } from '../../code-examples';
import { Code } from '../../components/Code';
import { Layout } from '../../components/Layout';

const PubSub = () => (
  <Layout title="Pub Sub Implementation | TKPremier">
    <ul className="root">
      <li>
        <pre>
          <a
            href="https://lolahef.medium.com/react-event-emitter-9a3bb0c719"
            target="_blank"
            rel="norefferer nofollower noreferrer"
          >
            Source
          </a>
        </pre>
      </li>
      <li>
        <Code text={pubSubClass} />
      </li>
      {/* <li>
        Try it out:
        <br />
        <form
          onSubmit={e => {
            e.preventDefault();
            const { comment } = serialize(e.target, { hash: true });
          }}
        >
          <input type="text" required name="comment" />
          <input type="submit" value="Add Comment" />
        </form>
      </li> */}
      <li>
        <Link href="/examples">
          Back to Examples
        </Link>
      </li>
    </ul>
  </Layout>
);

export default PubSub;
