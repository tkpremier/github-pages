import React, { FormEvent, useCallback, useState, useMemo, useRef, PropsWithoutRef } from 'react';
import dynamic from 'next/dynamic';
import { IEventInfo, EditorProps } from '../../components/Editor';
import format from 'date-fns/format';
import { enUS } from 'date-fns/locale';
import serialize from 'form-serialize';
import DatePicker from 'react-datepicker';
import Drawer from '../../components/Drawer';
import Form from '../../components/Form';
import { Layout } from '../../components/Layout';
import handleResponse from '../../utils/handleResponse';

type Interview = {
  id: number;
  company: string;
  date: Date;
  retro: string;
  onClick?: (event: React.PointerEvent<HTMLButtonElement>) => void;
};

interface IInterviewProps {
  data: Array<Interview>;
}

export async function getServerSideProps(): Promise<{ props: IInterviewProps }> {
  return {
    props: {
      data: []
    }
  };
  /* const response: Awaited<Promise<Response>> = await fetch('http://api:9000/api/interview');
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
  }; */
}

const InterviewItem = (props: Interview) => {
  const interviewDate = useMemo(() => format(new Date(props.date), 'MM/dd/yyyy', { locale: enUS }), [props.date]);
  return (
    <>
      <p>{interviewDate}</p>
      <div dangerouslySetInnerHTML={{ __html: props.retro }} />
      <button aria-label={`Update ${props.company}`} onClick={props.onClick} value={props.id}>
        Update {props.company}
      </button>
    </>
  );
};

const defaultProps = { id: 0, company: '', date: new Date(Date.now()), retro: '' } as Interview;

const Interview = (props: PropsWithoutRef<IInterviewProps>) => {
  const [updatedInt, updateInt] = useState(defaultProps);
  const Editor = useMemo(
    () => dynamic<EditorProps>(() => import('../../components/Editor', { ssr: false } as ImportCallOptions)),
    []
  );
  const handleDateChange = (date: Date) => {
    // console.log('date: ', typeof date);
    updateInt(i => ({ ...i, date }));
  };
  const handleUpdate = (e: React.PointerEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.value, 10);
    if (id === updatedInt.id) {
      return;
    }
    const selected = props.data.find(i => i.id === id);
    updateInt({ ...selected, date: new Date(selected.date) });
  };
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = serialize(form, { hash: true }) as any;
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          ...updatedInt,
          interviewId: updatedInt.id,
          company: data.company
        })
      };
      fetch('http://localhost:8000/api/interview', options)
        .then(handleResponse)
        .then(res => {
          console.log('res: ', res);
          updateInt(defaultProps);
        })
        .catch(err => console.log('err: ', err));
    },
    [updatedInt]
  );
  const handleEditor = useCallback(
    (_eventInfo: IEventInfo, editor: any) => {
      if (updatedInt.retro !== editor.getData()) {
        updateInt(ex => ({
          ...ex,
          retro: editor.getData()
        }));
      }
    },
    [updatedInt]
  );
  return (
    <Layout title="Interviews">
      <ul className="root">
        {props.data.map(i => (
          <Drawer key={i.id} header={i.company} closed>
            <InterviewItem key={i.id} {...i} onClick={handleUpdate} />
          </Drawer>
        ))}
      </ul>
      <Form onSubmit={handleSubmit}>
        <h3>About TK&rsquo;s interviews with {updatedInt.company}</h3>
        <label key="interview-company" htmlFor="interview-company">
          Company
          <input
            autoComplete="on"
            type="text"
            name="company"
            required
            placeholder="Name"
            id="interview-company"
            defaultValue={updatedInt.company}
          />
        </label>
        <label htmlFor="interview-date" key="interview-date">
          Date
          <DatePicker id="interview-date" selected={updatedInt.date} name="date" onChange={handleDateChange} />
        </label>
        <label htmlFor="interview-retro" key="interview-retro">
          Retrospective
          <Editor data={updatedInt.retro} id="interview-retro" onChange={handleEditor} name="retro" />
        </label>
        <input type="submit" value="Update" />
      </Form>
    </Layout>
  );
};

export default Interview;
