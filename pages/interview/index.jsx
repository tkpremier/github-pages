import React, { Fragment, useCallback, useState } from 'react';
import format from 'date-fns/format';
import serialize from 'form-serialize';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Drawer from '../../components/Drawer';
import Form from '../../components/Form';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import handleResponse from '../../utils/handleResponse';

export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:9000/api/interview');
  const props = await response.json();
  return {
    props
  };
}

const InterviewItem = props => {
  const [i, updateItem] = useState(props);
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    const form = e.target;
    const data = serialize(form, { hash: true });
    const date = new Date(data.date);
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ ...data, date, interviewId: i.id })
    };
    fetch('http://localhost:9000/api/interview', options)
      .then(handleResponse)
      .then(res => {
        updateItem(res.data[0]);
      })
      .catch(err => console.log('err: ', err));
  }, []);
  return (
    <ul className="root" key={i.id}>
      <Drawer key={`${i.id}-data`} header={`${i.company} - ${format(new Date(i.date), 'EEEE, MMM do, y')}`}>
        <Fragment>
          {i.retro.split('\n').map(l => (
            <p key={l}>{l}</p>
          ))}
        </Fragment>
      </Drawer>
      <Drawer header="Update" key={`${i.id}-form`}>
        <Form onSubmit={handleSubmit}>
          <h3>About TK's interviews with {i.company}</h3>
          <label htmlFor="interview-company">
            Company
            <input
              type="text"
              name="company"
              required
              placeholder="Name"
              id="interview-company"
              defaultValue={i.company}
            />
          </label>
          <label htmlFor="interview-date">
            Date
            <DatePicker selected={new Date(i.date)} name="date" />
          </label>
          <label htmlFor="interview-retro">
            Platform
            <textarea name="retro" id="interview-retro" placeholder="Retrospective" rows="15" defaultValue={i.retro} />
          </label>
          <input type="submit" value="Update" />
        </Form>
      </Drawer>
      <li></li>
    </ul>
  );
};

const Interview = props => (
  <Layout title="Interviews">
    <Slider carouselTitle="Interviews">
      {props.data.map(i => (
        <InterviewItem key={i.id} {...i} />
      ))}
    </Slider>
  </Layout>
);

export default Interview;
