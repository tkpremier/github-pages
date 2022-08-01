import React, { Fragment, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { isNull } from 'lodash';
import serialize from 'form-serialize';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';
import { getModel } from '../../services/db';
import { getDuration } from '../../utils';
import handleResponse from '../../utils/handleResponse';

export const getServerSideProps: GetServerSideProps = async context => {
  const { data, driveIds } = await getModel(context.params.id);
  return {
    props: {
      data,
      driveIds,
      id: parseInt(context.params.id.toString())
    }
  };
};
const getImageLink = (link = '', endStr = 's220', split = 's220'): string => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};

interface CardProps {
  driveId: string;
  duration: number;
  id: number;
  modelId: Array<number>;
  modelName: string;
  name: string;
  thumbnailLink: string;
  type: string;
  lastViewed: string;
  webViewLink: string;
}

const Card = (props: CardProps) => {
  const [contact, updateCard] = useState({
    status: '',
    data: props
  });
  // const [contact, updateCard] = useState({
  //   status: "",
  //   data: {}
  // });
  useEffect(() => {
    fetch(`/api/drive/${contact.data.driveId}`)
      .then(handleResponse)
      .then(res => {
        if (res.data.thumbnailLink !== contact.data.thumbnailLink) {
          updateCard({
            status: contact.status,
            data: {
              ...contact.data,
              ...(res.data.videoMediaMetadata && {
                duration: parseInt(res.data.videoMediaMetadata.durationMillis, 10)
              }),
              thumbnailLink: res.data.thumbnailLink
            }
          });
        }
      })
      .catch(err => console.log(err));
  }, []);
  const handleAdd = () => {
    const data = ['model_id', [contact.data.id], contact.data.driveId];
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
        updateCard({
          status: r,
          data: {
            ...contact.data,
            modelId: [contact.data.id]
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
        <button onClick={handleAdd} name="model_id" value={contact.data.id}>
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

interface Data {
  driveId: string;
  driveIds: Array<string>;
  duration: number;
  id: number;
  lastViewed: string;
  modelId: Array<number>;
  modelName: string;
  name: string;
  thumbnailLink: string;
  type: string;
  webViewLink: string;
}

const Model = (props: { data: Array<Data>; driveIds: Array<string>; id: number }) => {
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
    <Layout title={`${data[0] ? data[0].modelName : 'No Model'} | TK Premier`}>
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
