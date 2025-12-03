'use client';
import { useCallback, useState } from 'react';
import { DBData, Model } from '../types';
import { Form } from './Form';
import serialize from 'form-serialize';
import handleResponse from '../utils/handleResponse';

export const ModelForm = ({ drive, models }: { drive: DBData; models: Model[] }) => {
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
    }
    const options = {
      credentials: 'include' as RequestCredentials,
      method: modelId === 0 ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ...data,
        driveIds: modelData ? [...modelData.driveIds, drive.id] : [drive.id]
      })
    };
    fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/model${options.method === 'POST' ? '' : `/${modelId}`}`, options)
      .then(handleResponse)
      .then(res => {
        setMessage(
          `${res.data[0].name} has been added successfully. ${drive.name} has been added successfully to the model.`
        );
      })
      .catch(err => console.log('err: ', err));
  };
  const modelDrive = models.find(model => model.driveIds.includes(drive.id));
  console.log('modelDrive: ', modelDrive?.id);
  const hasModel = drive.modelId.includes(modelDrive?.id ?? 0);
  if (hasModel) {
    console.log;
    console.log('hasModel: ', hasModel);
  }
  const updateDrive = useCallback(() => {
    const options = {
      credentials: 'include' as RequestCredentials,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ...drive,
        modelId: [...drive.modelId, modelDrive?.id]
      })
    };
    fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list/${drive.id}`, options)
      .then(handleResponse)
      .then(res => {
        console.log('res: ', res);
        setMessage(`Drive updated successfully`);
      })
      .catch(err => {
        console.error('error: ', err);
        setMessage(`Error updating drive`);
      });
  }, [modelDrive?.id, drive]);

  return (
    <>
      {hasModel ? (
        <p>Model: {modelDrive?.name}</p>
      ) : modelDrive?.id && !hasModel ? (
        <button onClick={updateDrive}>Update Drive with Model</button>
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
            name="modelName"
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
