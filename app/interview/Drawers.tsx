'use client';

import { Editor as CKEditor } from 'ckeditor5';
import serialize from 'form-serialize';
import { FormEvent, useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Drawer } from '../../src/components/Drawer';
import { Form } from '../../src/components/Form';
import { HTMLEditor } from '../../src/components/drive/Update';
import { Interview } from '../../src/types';
import handleResponse from '../../src/utils/handleResponse';

const defaultProps = { id: 0, company: '', date: new Date(Date.now()), retro: '' } as Interview;

const InterviewItem = (props: Interview) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: props.retro }} />
      <button aria-label={`Update ${props.company}`} onClick={props.onClick} value={props.id}>
        Update {props.company}
      </button>
    </>
  );
};

export const Interviews = ({ data }: { data: Interview[] }) => {
  const [interviews, setInterviews] = useState<Array<Interview>>(data);
  const [updatedInt, updateInt] = useState<Interview>(defaultProps);

  const handleDateChange = (date: Date) => {
    // console.log('date: ', typeof date);
    updateInt(i => ({ ...i, date }));
  };

  const handleRetroChange = (_: any, editor: CKEditor) => {
    updateInt(i => ({ ...i, retro: editor.getData() }));
  };
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = serialize(form, { hash: true }) as any;

      const interview = {
        ...updatedInt,
        interviewId: updatedInt.id,
        ...data
      };
      const options = {
        method: updatedInt.id === 0 ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(interview)
      };
      fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/interview`, options)
        .then(handleResponse)
        .then(res => {
          const updatedInterview = res.data as Interview;
          setInterviews(interviews.map(i => (i.id === updatedInterview.id ? updatedInterview : i)));
          updateInt(updatedInterview as Interview);
        })
        .catch(err => console.log('err: ', err));
    },
    [updatedInt]
  );
  const handleUpdate = (e: React.PointerEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.value, 10);
    if (id === updatedInt.id) {
      return;
    }
    const selected = interviews.find(i => i.id === id);
    if (selected) {
      updateInt({ ...selected, date: new Date(selected.date) });
    }
  };
  return (
    <>
      <ul className="root">
        {interviews.map((i: Interview) => (
          <Drawer key={i.id} header={`${i.company} - ${new Date(i.date).toLocaleDateString()}`} closed>
            <InterviewItem key={i.id} {...i} onClick={handleUpdate} />
          </Drawer>
        ))}
      </ul>
      <Form onSubmit={handleSubmit}>
        <h3>About TK&rsquo;s interviews with {updatedInt.company}</h3>
        <label key="interview-company" htmlFor="interview-company">
          Company
          <input
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
          <DatePicker selected={updatedInt.date} name="date" onChange={handleDateChange} />
        </label>
        <label htmlFor="interview-retro" key="interview-retro">
          Retrospective
          <HTMLEditor data={updatedInt.retro} name="retro" onChange={handleRetroChange} />
        </label>
        <input type="submit" value="Update" />
      </Form>
    </>
  );
};
