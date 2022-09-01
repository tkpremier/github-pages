import React, { FormEvent, useCallback, useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { IEventInfo } from '../../components/Editor';
import format from 'date-fns/format';
import serialize from 'form-serialize';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Drawer from '../../components/Drawer';
import Form from '../../components/Form';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import handleResponse from '../../utils/handleResponse';

type Interview = {
  id: number;
  company: string;
  date: string;
  retro: string;
};

interface IInterviewProps {
  data: Array<Interview>;
}

export async function getServerSideProps(): Promise<{ props: IInterviewProps }> {
  const response = await fetch('http://api:9000/api/interview');
  if (!response.ok) {
    return {
      props: {
        data: []
      }
    };
  }
  const props = await response.json();
  return {
    props
  };
}

const InterviewItem = (props: Interview) => {
  const [i, updateItem] = useState(props);
  const [updatedRetro, updateRetro] = useState(i.retro);
  const [interviewDate, setDate] = useState(new Date(i.date));
  const Editor = useMemo(
    () => dynamic(() => import('../../components/Editor', { ssr: false } as ImportCallOptions)),
    []
  );
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = serialize(form, { hash: true }) as any;
      const date = new Date(data.date);
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...data, date, interviewId: i.id, retro: updatedRetro })
      };
      fetch('http://localhost:9000/api/interview', options)
        .then(handleResponse)
        .then(res => {
          updateItem(res.data[0]);
        })
        .catch(err => console.log('err: ', err));
    },
    [updatedRetro]
  );
  const handleUpdateRetro = useCallback(
    (_eventInfo: IEventInfo, editor: any) => {
      if (updatedRetro !== editor.getData()) {
        updateRetro(editor.getData());
      }
    },
    [updatedRetro]
  );
  return (
    <Slider carouselTitle={i.company}>
      <Form onSubmit={handleSubmit}>
        <h3>About TK&rsquo;s interviews with {i.company}</h3>
        <label key="interview-company" htmlFor="interview-company">
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
        <label htmlFor="interview-date" key="interview-date">
          Date
          <DatePicker selected={interviewDate} name="date" onChange={date => setDate(date)} />
        </label>
        <label htmlFor="interview-retro" key="interview-retro">
          Retrospective
          <Editor data={updatedRetro} onChange={handleUpdateRetro} name="retro" />
        </label>
        <input type="submit" value="Update" />
      </Form>
      <div dangerouslySetInnerHTML={{ __html: updatedRetro }} />
    </Slider>
  );
};

const Interview = (props: IInterviewProps) => (
  <Layout title="Interviews">
    <ul className="root">
      {props.data.map(i => (
        <Drawer key={i.id} header={i.company}>
          <InterviewItem key={i.id} {...i} />
        </Drawer>
      ))}
    </ul>
  </Layout>
);

export default Interview;
