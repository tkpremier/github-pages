import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { isNull } from 'lodash';
import { format, millisecondsToHours, millisecondsToMinutes } from 'date-fns';
import serialize from 'form-serialize';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import { getModel } from '../../services/db';
import handleResponse from '../../utils/handleResponse';

export async function getServerSideProps(context) {
  const { data, driveIds } = await getModel(context.params.id);
  return {
    props: {
      data,
      driveIds,
      id: parseInt(context.params.id)
    }
  };
}

const getDuration = milliseconds => {
  let remainder = new Number(milliseconds);
  const hour = millisecondsToHours(parseInt(milliseconds, 10));
  const hours = hour * 60 * 60 * 1000;
  const min = millisecondsToMinutes(parseInt(milliseconds - hours, 10));
  remainder = (remainder - min * 60 * 1000) / 1000;
  const duration = `${hour > 0 ? `0${hour} hours, ` : ''}${min} minutes,${Math.ceil(remainder / 100)} seconds`;
  return duration;
};
const getImageLink = (link = '', endStr = 's220', split = 's220') => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};

const Card = props => {
  const [contact, updateCard] = useState({
    status: '',
    data: props
  });
  // const [contact, updateCard] = useState({
  //   status: "",
  //   data: {}
  // });
  useEffect(() => {
    fetch(`/api/drive/${props.driveId}`)
      .then(handleResponse)
      .then(res => {
        if (res.data.thumbnailLink !== props.thumbnailLink) {
          updateCard({
            status: contact.status,
            data: {
              ...contact.data,
              thumbnailLink: res.data.thumbnailLink
            }
          });
        }
      })
      .catch(err => console.log(err));
  }, []);
  const handleAdd = e => {
    const data = ['model_id', [parseInt(e.target.value, 10)], e.target.dataset.drive];
    const opt = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };
    fetch(`/api/drive/${props.driveId}`, opt)
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            console.error('API ERROR: ', error);
            throw new Error(error.message);
          });
        }
        return response.text();
      })
      .then(r => {
        console.log('success updating!: ', r);
        updateCard({
          status: r,
          data: {
            ...contact.data,
            modelId: contact.data.id
          }
        });
      })
      .catch(err => console.log('error updating', err));
  };
  return (
    <div key={contact.data.driveId}>
      <a href={contact.data.webViewLink} target="_blank" rel="noreferrer nofollower">
        {typeof contact.data.thumbnailLink !== 'undefined' && !isNull(contact.data.thumbnailLink) ? (
          <img
            src={getImageLink(contact.data.thumbnailLink, 's1260', 's220')}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <img src="/mstile-150x150.png" referrerPolicy="no-referrer" loading="lazy" />
        )}
      </a>
      {isNull(contact.data.modelId) ? (
        <button onClick={handleAdd} name="model_id" data-drive={contact.data.driveId} value={contact.data.id}>
          Add to file
        </button>
      ) : null}
      {contact.status.length > 0 ? <span>{contact.status}</span> : null}
      {contact.data.duration ? (
        <p>
          <strong>Duration</strong>:&nbsp;{getDuration(contact.data.duration)}
        </p>
      ) : null}
      <p>
        <strong>Name</strong>: {contact.data.name}
      </p>
    </div>
  );
};

const Model = props => {
  const [data, setData] = useState(props.data);
  const handleAddDrive = e => {
    e.preventDefault();
    const form = e.target;

    const formData = serialize(form, { hash: true });
    const data = ['drive_ids', [...props.driveIds, formData.driveIds], props.id];
    fetch(`/api/model/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(handleResponse)
      .then(res => console.log('res: ', res))
      .catch(err => console.log('err: ', err));
  };
  const images =
    data.filter(d => d.type === 'image').length > 0 ? (
      <Slider carouselTitle="Images">
        {data
          .filter(d => d.type === 'image')
          .map((d, i) => (
            <Card {...d} key={d.driveId} />
          ))}
      </Slider>
    ) : null;
  const videos =
    data.filter(d => d.type === 'video').length > 0 ? (
      <Slider carouselTitle="Video">
        {data
          .filter(d => d.type === 'video')
          .map((d, i) => (
            <Card {...d} key={d.driveId} />
          ))}
      </Slider>
    ) : null;
  useEffect(() => {
    setData(props.data);
  }, [props.data]);
  return (
    <Layout>
      {data[0] ? (
        <Fragment>
          <header
            style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-betweeen', alignItems: 'center' }}
          >
            {props.id - 1 > 1 ? (
              <Link href={`/model/${props.id - 1}`}>
                <a>Previous Model</a>
              </Link>
            ) : null}

            <h2>{data[0].modelName}</h2>
            <Link href={`/model/${props.id + 1}`}>
              <a>Next Model</a>
            </Link>
          </header>
          {images}
          {videos}
        </Fragment>
      ) : (
        <>
          <p>No Model</p>
          <p>{props.id}</p>
          <Link href={`/model/1}`}>
            <a>First Model</a>
          </Link>
        </>
      )}
      <form onSubmit={handleAddDrive}>
        <label htmlFor="exp-desc">
          Add Drive Ids&nbsp;
          <input type="text" name="driveIds" placeholder="Drive Ids" />
        </label>
        <input type="submit" value="Update" />
      </form>
    </Layout>
  );
};

export default Model;
