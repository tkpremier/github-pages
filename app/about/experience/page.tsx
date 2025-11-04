import { Metadata } from 'next';
import { Drawer } from '../../../src/components/Drawer';
import handleResponse from '../../../src/utils/handleResponse';

export const metadata: Metadata = {
  title: 'Experience | TK Premier',
  description: "TK Premier's Experience"
};

const getExp = async () => {
  const response = await handleResponse(await fetch(`${process.env.NEXT_PUBLIC_SERVERURL}/api/experience`));
  return response;
};

export default async function Experience() {
  const data = await getExp();
  // const [updatedExp, updateExp] = useState({ id: 0, name: '', description: '' });
  return (
    <>
      <h1 className="title">My Tech &#x1F305;</h1>
      <blockquote className="description">
        <figure>
          Tell me about your journey into tech.
          <ul>
            <li>How did you get interested in coding?</li>
            <li>Why was web development a good fit for you?</li>
            <li>How is that applicable to our role or company goals?</li>
          </ul>
        </figure>
      </blockquote>
      {Array.isArray(data.data) ? (
        <ul className="root" style={{ maxWidth: '100%' }}>
          {data.data.map(e => (
            <Drawer closed header={e.name} key={e.id}>
              <div dangerouslySetInnerHTML={{ __html: e.description }} />
            </Drawer>
          ))}
        </ul>
      ) : null}
    </>
  );
}
