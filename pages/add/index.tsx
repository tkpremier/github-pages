import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import serialize from 'form-serialize';
import DatePicker from 'react-datepicker';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IEventInfo } from '../../components/Editor';
import Form from '../../components/Form';
import Layout from '../../components/Layout';
import layoutStyles from '../../components/layout.module.scss';
import handleResponse from '../../utils/handleResponse';
import 'react-datepicker/dist/react-datepicker.css';
import { getModelList } from '../../services/db';

type AddProps = {
  modelData: Array<any>;
  query: {
    drive?: string;
  };
};
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: AddProps }> {
  const query = context.query || {};
  const { data: modelData } = await getModelList();
  return {
    props: {
      modelData,
      query
    }
  };
}

interface ApiResponse {
  status: string;
  data: {
    id?: number;
  };
}

type State = {
  status: string;
  data: {
    id?: number;
  };
};
const state: State = {
  status: '',
  data: {}
};

const AddPage = (props: AddProps) => {
  const [response, setStatus] = useState(state);
  const [editorData, handleChange] = useState('');
  const [autoCompleteList, updateAutoComplete] = useState('');
  const [interviewDate, setDate] = useState(new Date());

  const Editor = useMemo(
    () => dynamic(() => import('../../components/Editor', { ssr: false } as ImportCallOptions)),
    []
  );
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = serialize(form, { hash: true });
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...data, description: editorData })
      };
      fetch('http://localhost:9000/api/experience', options)
        .then(handleResponse)
        .then((res: ApiResponse) => setStatus({ status: 'experience success', ...res }))
        .catch(err => console.log('err: ', err));
    },
    [editorData]
  );
  // const handleSubmitModel = useCallback(e => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const data = serialize(form, { hash: true });
  //   fetch('/api/model', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(handleResponse)
  //     .then(res => {
  //       setStatus({ ...res, status: 'success' });
  //     })
  //     .catch(err => console.log('err: ', err));
  // }, []);
  // const handleAutoComplete = useCallback(e => {
  //   console.log(e.type);
  // }, []);
  const handleInterview: React.FormEventHandler<HTMLFormElement> = useCallback(e => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = serialize(form, { hash: true }) as any;
    const date = new Date(data.date);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ ...data, date, retro: editorData })
    };
    fetch('http://localhost:9000/api/interview', options)
      .then(handleResponse)
      .then(res => {
        setStatus(res);
      })
      .catch(err => console.log('err: ', err));
  }, []);
  const handleEditorChange = (_eventInfo: IEventInfo, editor: any) => {
    handleChange(editor.getData());
  };
  return (
    <Layout title="Add something about yourself | TK Premier">
      <h1>Add something about yourself.</h1>
      {response.status.length > 0 ? <h2>{response.status}&nbsp;</h2> : null}
      <main className={layoutStyles.grid}>
        <div className={layoutStyles.card}>
          <Form onSubmit={handleSubmit}>
            <h3>About TK the Dev &rarr;</h3>
            <p>
              Talk about your experience, what you&rsquo;lve worked on, what you&rsquo;ve solved, and what goals and
              challenges have been brought upon.
            </p>
            <label htmlFor="exp-name">
              Name
              <input type="text" name="name" required placeholder="Company Name" id="exp-name" />
            </label>
            <label htmlFor="exp-desc">
              Answer
              <Editor data={editorData} onChange={handleEditorChange} name="description" />
            </label>
            <input type="submit" value="Update" />
          </Form>
        </div>
        {/* <div className={layoutStyles.card}>
          <Form onSubmit={handleSubmitModel}>
            <h3>About TK the Philanthropist &rarr;</h3>
            <p>Add about your chariable donations, when, where, who, how long were these donations?</p>
            <label htmlFor="model-name">
              Name
              <input
                type="text"
                name="modelName"
                required
                placeholder="Model Name"
                id="model-name"
                autoComplete="off"
                onFocus={handleAutoComplete}
                onChange={handleAutoComplete}
                onBlur={handleAutoComplete}
              />
            </label>
            <label htmlFor="exp-desc">
              Platform
              <textarea name="platform" placeholder="Platform" />
            </label>
            <label htmlFor="exp-desc">
              Drive Ids
              <input type="text" name="driveIds" placeholder="Drive Ids" defaultValue={props.query.drive || ''} />
            </label>
            <input type="submit" value="Update" />
          </Form>
        </div> */}
        <div className={layoutStyles.card}>
          <h3>About TK&lsquo;s interviews &#x1F935;</h3>
          <p>A retrospective...&#x1F5E3;</p>
          <Form onSubmit={handleInterview}>
            <label htmlFor="interview-company">
              Company
              <input type="text" name="company" required placeholder="Name" id="interview-company" />
            </label>
            <label htmlFor="interview-date">
              Date
              <DatePicker selected={interviewDate} onChange={date => setDate(date)} name="date" />
            </label>
            <label htmlFor="interview-retro">
              Retrospective
              <Editor data="" onChange={handleEditorChange} name="retrospective" />
            </label>
            <input type="submit" value="Update" />
          </Form>
        </div>
      </main>
    </Layout>
  );
};

export default AddPage;
