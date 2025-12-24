'use client';
import Link from 'next/link';
import { use, useEffect } from 'react';
import { ModelContext } from '../../src/context/model';
import { Model } from '../../src/types';
const ModelPage = () => {
  const [models, setModels] = use(ModelContext);
  useEffect(() => {
    setModels(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/model`);
  }, []);
  return (
    <div>
      <h1>Models</h1>
      <ul>
        {models.map((model: Model) => (
          <li key={model.id}>
            <Link href={`/model/${model.id}`}>{model.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelPage;
