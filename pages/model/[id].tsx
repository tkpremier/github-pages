import serialize from 'form-serialize';
import { isNull, trim } from 'lodash';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Slider } from '../../components/Slider';
import { getDuration } from '../../utils';
import handleResponse from '../../utils/handleResponse';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const response = await fetch(`http://localhost:8000/api/model/${context.params.id}`);
  const { data } = await handleResponse(response);
  return {
    props: {
      data,
      driveIds: [],
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
    fetch(`http://localhost:8000/api/drive-file/${contact.data.driveId}`)
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
    fetch(`http://localhost:8000/api/drive-list/${props.driveId}`, opt)
      .then(handleResponse)
      .then(response => {
        console.log(response);
        updateCard({
          status: 'File Successfully Updated',
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
            alt="Thumbnail"
          />
        ) : (
          <img src="/mstile-150x150.png" referrerPolicy="no-referrer" loading="lazy" alt="No thumbnail" />
        )}
      </a>
      {isNull(contact.data.modelId) ? (
        <button onClick={handleAdd} name="model_id" value={contact.data.id}>
          Add Model to file
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
  console.log(props.data);
  const [data, setData] = useState(props.data);
  const handleAddDrive: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = serialize(e.target as HTMLFormElement, { hash: true });
    console.log('formData: ', formData.driveIds);
    const currIds = props.data.map(d => d.driveId);
    const newIds = formData.driveIds
      .toString()
      .split(',')
      .filter(dId => currIds.indexOf(dId.trim()) === -1)
      .map(id => trim(id));
    if (newIds.length === 0) {
      console.log('drive already included in model');
      return;
    }
    const data = ['drive_ids', newIds, props.id];
    fetch(`http://localhost:8000/api/model/${props.id}`, {
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
                Previous Model
              </Link>
            ) : null}

            <h2 style={{ margin: '0 15px' }}>{`${data[0].modelName} - ${data.length} items`}</h2>
            <Link href={`/model/${props.id + 1}`}>
              Next Model
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
            First Model
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
