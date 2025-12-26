'use client';
import serialize from 'form-serialize';
import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { DBData, DriveHandler, DriveResponse, Model } from '../types';
import { Form } from './Form';
export const ModelForm = ({
  drive,
  models,
  handleDrive,
  handleModels
}: {
  drive: DBData;
  models: Model[];
  handleModels: (url: string, options?: RequestInit & { body?: Model }) => Promise<{ data: Model[] } | Error>;
  handleDrive: DriveHandler<DriveResponse>;
}) => {
  const [message, setMessage] = useState<string>('');
  const [modelId, setModelId] = useState<number>(0);
  const [modelName, setModelName] = useState<string>('');
  const [modelPlatform, setModelPlatform] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = serialize(e.target as HTMLFormElement, { hash: true });
    const modelId = parseInt(data.id as string);
    const modelData = models.find(model => model.id === modelId);
    if (modelData) {
      const { name, platform } = modelData;
      data.modelName = name;
      data.platform = platform;
    } else {
      data.modelName = data.name;
    }
    const body = omit(
      {
        ...data,
        id: modelId,
        driveIds: modelData ? uniq([...modelData.driveIds, data.driveId]) : [data.driveId]
      },
      'driveId'
    );
    const options = {
      credentials: 'include' as RequestCredentials,
      method: modelId === 0 ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    };
    // console.log('driveId: ', drive.id);
    // console.log('data.driveId: ', data.driveId);
    // updateDrive(modelId, data.driveId as string);

    handleModels(
      `${process.env.NEXT_PUBLIC_CLIENTURL}/api/model${options.method === 'POST' ? '' : `/${modelId}`}`,
      options as unknown as RequestInit & { body?: Model | undefined }
    )
      .then(res => {
        if (!(res instanceof Error)) {
          const model = typeof res.data[0] === 'string' ? JSON.parse(res.data[0]) : res.data[0];
          updateDrive(model.id, data.driveId as string);
          setModelId(model.id);
          setModelName(model.name);
          setModelPlatform(model.platform);
        }
      })
      .catch(err => console.log('err: ', err));
  };
  const modelDrive = models.find(model => model.driveIds.includes(drive.id));

  const updateDrive = useCallback(
    (modelId: number, driveId: string = drive.id) => {
      const options = {
        credentials: 'include' as RequestCredentials,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          ...drive,
          modelId: uniq([...drive.modelId, modelId])
        })
      };

      handleDrive(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list/${driveId}`, options)
        .then(res => {
          console.log('data.driveId: ', driveId);
          console.log('drive.id: ', drive.id);
          console.log('res: ', res);
          setMessage(`Drive updated successfully`);
        })
        .catch(err => console.log('err: ', err));
    },
    [modelDrive, drive, handleDrive]
  );
  const hasModel = drive.modelId.includes(modelDrive?.id ?? 0) || Boolean(modelDrive);
  return (
    <>
      {hasModel ? (
        <p>
          Model: <Link href={`/model/${modelDrive?.id}`}>{modelDrive?.name}</Link>
        </p>
      ) : modelDrive?.id && !hasModel ? (
        <button onClick={() => updateDrive(modelDrive?.id ?? 0)}>Update Drive with Model</button>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h4>Add model for {drive.name}</h4>
          {message && <p>{message}</p>}
          <select
            name="id"
            defaultValue={drive.modelId[0] ?? '0'}
            onChange={e => {
              const id = parseInt(e.target.value);
              const model = models.find(model => model.id === id);
              if (model) {
                setModelName(model.name);
                setModelPlatform(model.platform);
              }
              setModelId(id);
            }}
          >
            <option value="0">New Model</option>
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <input type="text" name="driveId" value={drive.id} readOnly />
          <input
            type="text"
            name="name"
            placeholder="Model Name"
            value={models.find(model => model.id === modelId)?.name ?? modelName}
            onChange={e => setModelName(e.target.value)}
          />
          <input
            type="text"
            name="platform"
            placeholder="Platform"
            value={models.find(model => model.id === modelId)?.platform ?? modelPlatform}
            onChange={e => setModelPlatform(e.target.value)}
          />
          <input type="submit" value="Add Model" />
        </Form>
      )}
    </>
  );
};
