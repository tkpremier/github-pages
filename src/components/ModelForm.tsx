'use client';
import serialize from 'form-serialize';
import uniq from 'lodash/uniq';
import { useCallback, useState } from 'react';
import { DBData, Model } from '../types';
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
  handleDrive: (url: string, options: RequestInit) => Promise<{ data: DBData[] } | Error>;
}) => {
  const [message, setMessage] = useState<string>('');
  const [modelId, setModelId] = useState<number>(0);
  const [modelName, setModelName] = useState<string>('');
  const [modelPlatform, setModelPlatform] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = serialize(e.currentTarget, { hash: true });
    const modelId = parseInt(data.id as string);
    const modelData = models.find(model => model.id === modelId);
    if (modelData) {
      const { name, platform } = modelData;
      data.modelName = name;
      data.platform = platform;
    } else {
      data.modelName = data.name;
    }
    const options = {
      credentials: 'include' as RequestCredentials,
      method: modelId === 0 ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ...data,
        id: modelId,
        driveIds: modelData ? uniq([...modelData.driveIds, drive.id]) : [drive.id]
      })
    };
    handleModels(
      `${process.env.NEXT_PUBLIC_CLIENTURL}/api/model${options.method === 'POST' ? '' : `/${modelId}`}`,
      options as unknown as RequestInit & { body?: Model | undefined }
    )
      .then(res => {
        if (!(res instanceof Error)) {
          const model = typeof res.data[0] === 'string' ? JSON.parse(res.data[0]) : res.data[0];
          setMessage(
            `${data.modelName} has been added successfully. ${drive.name} has been added successfully to the model.`
          );
          updateDrive(model.id);
          setModelId(model.id);
          setModelName(model.name);
          setModelPlatform(model.platform);
        }
      })
      .catch(err => console.log('err: ', err));
  };
  const modelDrive = models.find(model => model.driveIds.includes(drive.id));
  const hasModel = drive.modelId.includes(modelDrive?.id ?? 0) || Boolean(modelDrive);
  const updateDrive = useCallback(
    (modelId: number) => {
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
      handleDrive(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list/${drive.id}`, options)
        .then(res => {
          console.log('res: ', res);
          setMessage(`Drive updated successfully`);
        })
        .catch(err => console.log('err: ', err));
      // fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list/${drive.id}`, options)
      //   .then(handleResponse)
      //   .then(res => {
      //     console.log('res: ', res);
      //     setMessage(`Drive updated successfully`);
      //   })
      //   .catch(err => {
      //     console.error('error: ', err);
      //     setMessage(`Error updating drive`);
      //   });
    },
    [modelDrive, drive, handleDrive]
  );

  return (
    <>
      {hasModel ? (
        <p>Model: {modelDrive?.name}</p>
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
