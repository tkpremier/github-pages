'use client';
import React, { FormEvent, useCallback, useState, useMemo, useEffect } from 'react';
import format from 'date-fns/format';
import serialize from 'form-serialize';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UpdateDrive } from '../../src/components/drive/Update';
import { Drawer } from '../../src/components/Drawer';
import { Form } from '../../src/components/Form';
import handleResponse from '../../src/utils/handleResponse';
import { Interview } from '../../src/types';

const getInterviews = async () => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/interview`, { cache: 'no-store' })
    );
    return response;
  } catch (error) {
    console.error('getInterviews error: ', error);
    return {
      data: []
    };
  }
};

const InterviewItem = (props: Interview) => {
  const interviewDate = useMemo(() => format(new Date(props.date), 'MM/dd/yyyy'), [props.date]);
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

export default () => {
  const [interviews, setInterviews] = useState<Array<Interview>>([]);
  useEffect(() => {
    getInterviews().then(response => {
      setInterviews(response.data);
    });
  }, []);
  const [updatedInt, updateInt] = useState<Interview>(defaultProps);

  const handleDateChange = (date: Date) => {
    // console.log('date: ', typeof date);
    updateInt(i => ({ ...i, date }));
  };
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
      fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/interview`, options)
        .then(handleResponse)
        .then(res => {
          console.log('res: ', res);
          updateInt(defaultProps);
        })
        .catch(err => console.log('err: ', err));
    },
    [updatedInt]
  );

  return (
    <>
      <ul className="root">
        {interviews.map((i: Interview) => (
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
          <UpdateDrive data={updatedInt.retro} name="retro" />
        </label>
        <input type="submit" value="Update" />
      </Form>
    </>
  );
};
