import React, { useCallback, useState } from 'react';
import serialize from 'form-serialize';
import Link from 'next/link';
import Form from '../../components/Form';
import Layout from '../../components/layout';
import layoutStyles from '../../styles/layout.module.scss';
import handleResponse from '../../utils/handleResponse';

export async function getServerSideProps(context) {
  const query = context.query || {};
  return {
    props: {
      query
    }
  };
}

const AddPage = props => {
  const [response, setStatus] = useState({
    status: '',
    data: {}
  });
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    const form = e.target;
    const data = serialize(form, { hash: true });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:9000/api/experience', options)
      .then(handleResponse)
      .then(res => setStatus(res))
      .catch(err => console.log('err: ', err));
  }, []);
  const handleSubmitModel = useCallback(e => {
    e.preventDefault();
    const form = e.target;
    const data = serialize(form, { hash: true });
    fetch('/api/model', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(handleResponse)
      .then(res => {
        setStatus(res);
      })
      .catch(err => console.log('err: ', err));
  }, []);
  const handleInterview = useCallback(e => {
    e.preventDefault();
    const form = e.target;
    const data = serialize(form, { hash: true });
    const date = new Date(data.date);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ ...data, date })
    };
    fetch('http://localhost:9000/api/interview', options)
      .then(handleResponse)
      .then(res => {
        console.log('res: ', res);
        setStatus(res);
      })
      .catch(err => console.log('err: ', err));
  }, []);
  return (
    <Layout>
      <h1>Add something about yourself.</h1>
      {response.status.length > 0 ? (
        <h2>
          {response.status}&nbsp;
          {response.data.id ? (
            <Link href={`/model/${response.data.id}`}>
              <a>Go to model</a>
            </Link>
          ) : null}
        </h2>
      ) : null}
      <main className={layoutStyles.grid}>
        <div className={layoutStyles.card}>
          <Form onSubmit={handleSubmit}>
            <h3>About TK the Dev &rarr;</h3>
            <p>
              Talk about your experience, what you've worked on, what you've solved, and what goals and challenges have
              been brought upon.
            </p>
            <label htmlFor="exp-name">
              Name
              <input type="text" name="name" required placeholder="Company Name" id="exp-name" />
            </label>
            <label htmlFor="exp-desc">
              Description
              <textarea name="description" placeholder="Description" />
            </label>
            <input type="submit" value="Update" />
          </Form>
        </div>
        <div className={layoutStyles.card}>
          <Form onSubmit={handleSubmitModel}>
            <h3>About TK the Philanthropist &rarr;</h3>
            <p>Add about your chariable donations, when, where, who, how long were these donations?</p>
            <label htmlFor="model-name">
              Name
              <input type="text" name="modelName" required placeholder="Model Name" id="model-name" />
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
        </div>
        <div className={layoutStyles.card}>
          <Form onSubmit={handleInterview}>
            <h3>About TK's interviews &#x1F935;</h3>
            <p>Add about your chariable donations, when, where, who, how long were these donations?</p>

            <label htmlFor="interview-company">
              Company
              <input type="text" name="company" required placeholder="Name" id="interview-company" />
            </label>
            <label htmlFor="interview-date">
              Date
              <input type="text" name="date" placeholder="Date" />
            </label>
            <label htmlFor="interview-retro">
              Platform
              <textarea name="retro" id="interview-retro" placeholder="Retrospective" rows={30} />
            </label>
            <input type="submit" value="Update" />
          </Form>
        </div>
      </main>
    </Layout>
  );
};

export default AddPage;
