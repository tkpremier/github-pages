import React from 'react';
import Drawer from '../../components/Drawer';
import Layout from '../../components/Layout';
import { getExp } from '../../services/db';
// import dynamic from 'next/dynamic';
// import classNames from 'classnames';
// import { IEventInfo, EditorProps } from '../../components/Editor';
// import Form from '../../components/Form';
// import handleResponse from '../../utils/handleResponse';
// import styles from '../../styles/experience.module.scss';
// import buttonStyles from '../../components/button.module.scss';

interface Exp {
  id: number;
  name: string;
  description: string;
}

// const converter = new showdown.Converter();
type AboutProps = {
  data: Array<Exp>;
};
export async function getServerSideProps() {
  const props = await getExp();
  return {
    props
  };
}

// const Form = () => {
//   // const Editor = useMemo(
//   //   () => dynamic<EditorProps>(() => import('../../components/Editor', { ssr: false } as ImportCallOptions)),
//   //   []
//   // );
//   // const handleUpdate = (e: React.PointerEvent<HTMLButtonElement>) => {
//   //   if (updatedExp.id !== parseInt(e.currentTarget.value)) {
//   //     updateExp(data.find(ex => ex.id === parseInt(e.currentTarget.value)));
//   //   }
//   // };
//   // const handleSubmit = useCallback(
//   //   (e: React.FormEvent<HTMLFormElement>) => {
//   //     e.preventDefault();
//   //     const options = {
//   //       method: 'PUT',
//   //       headers: {
//   //         'Content-Type': 'application/json;charset=utf-8'
//   //       },
//   //       body: JSON.stringify({ ...updatedExp })
//   //     };
//   //     fetch('http://localhost:8000/api/experience', options)
//   //       .then(handleResponse)
//   //       .then(res => {
//   //         console.log('res: ', res);
//   //       })
//   //       .catch(err => console.log('err: ', err));
//   //   },
//   //   [updatedExp]
//   // );
//   // const handleEditor = useCallback(
//   //   (_eventInfo: IEventInfo, editor: any) => {
//   //     if (updatedExp.description !== editor.getData()) {
//   //       updateExp(ex => ({
//   //         ...ex,
//   //         description: editor.getData()
//   //       }));
//   //     }
//   //   },
//   //   [updatedExp]
//   // );
//   // return (
//     {/* <Form onSubmit={handleSubmit}>
//         <h3>Update an Experience.</h3>
//         <label key="interview-company" htmlFor="interview-company">
//           Name
//           <input type="text" name="name" required placeholder="Name" id="exp-company" value={updatedExp.name} />
//         </label>
//         <label htmlFor="interview-retro" key="interview-retro">
//           Retrospective
//           <Editor data={updatedExp.description} onChange={handleEditor} name="description" />
//         </label>
//         <input type="submit" value="Update" />
//       </Form> */}
//   // )
// }

// const ToggleButton = () => (<button
// onClick={handleUpdate}
// className={classNames([styles.updateButton, buttonStyles.button, buttonStyles.primary])}
// aria-label={`edit-${e.id}`}
// value={e.id}
// >
// Update {e.name}
// </button>);

export default function Experience({ data }: AboutProps) {
  // const [updatedExp, updateExp] = useState({ id: 0, name: '', description: '' });
  return (
    <Layout title="About Thomas Kim | Experience | TK Premier">
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
      <ul className="root" style={{ maxWidth: '100%' }}>
        {data.map(e => (
          <Drawer closed header={e.name} key={e.id}>
            <div dangerouslySetInnerHTML={{ __html: e.description }} />
          </Drawer>
        ))}
      </ul>
    </Layout>
  );
}
