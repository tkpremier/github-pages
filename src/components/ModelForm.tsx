'use client';
import { useState } from 'react';
import { DBData, Model } from '../types';
import { Form } from './Form';
import serialize from 'form-serialize';
import handleResponse from '../utils/handleResponse';

export const ModelForm = ({ drive, models }: { drive: DBData; models: Model[] }) => {
  const [message, setMessage] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = serialize(e.currentTarget, { hash: true });
    const modelId = data.id === '0' ? models.length + 1 : parseInt(data.id as string);
    const modelData = models.find(model => model.id === modelId);
    if (modelData) {
      const { name, platform } = modelData;
      data.modelName = name;
      data.platform = platform;
    }
    const options = {
      credentials: 'include' as RequestCredentials,
      method: modelId === models.length + 1 ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ...data,
        id: modelId,
        driveIds: modelData ? [...modelData.driveIds, drive.id] : [drive.id]
      })
    };
    console.log('formData: ', data);
    fetch(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/model`, options)
      .then(handleResponse)
      .then(res => {
        console.log('res: ', res);
        // setMessage(`Model ${res.data.name} added successfully`);
      })
      .catch(err => console.log('err: ', err));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h4>Add model for {drive.name}</h4>
      {message && <p>{message}</p>}
      <select name="id" defaultValue={''}>
        <option value="0">New Model</option>
        {models.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      <input type="text" name="modelName" placeholder="Model Name" />
      <input type="text" name="platform" placeholder="Platform" />
      <input type="submit" value="Add Model" />
    </Form>
  );
};
