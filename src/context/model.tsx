import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { Model } from '../types';
import handleResponse from '../utils/handleResponse';

export const ModelContext = createContext<
  [Model[], (url: string, options?: RequestInit & { body?: Model }) => Promise<{ data: Model[] } | Error>]
>([[], () => Promise.resolve({ data: [] } as { data: Model[] } | Error)]);

export const ModelProvider = ({ children }: PropsWithChildren<{}>) => {
  const [models, setModels] = useState<Model[]>([]);
  const handleModels = useCallback(
    (url: string, options: RequestInit & { body?: Model } = { method: 'GET', credentials: 'include' }) => {
      return new Promise<{ data: Model[] } | Error>(async (resolve, reject) => {
        try {
          const response = await handleResponse(await fetch(url, options));
          if (response instanceof Error) {
            reject(response);
          }
          if (options.method === 'PUT') {
            setModels((prev: Model[]) => {
              const updatedModel = response.data[0];
              return prev.map(m => (m.id === updatedModel.id ? { ...(updatedModel as Model) } : m));
            });
            resolve({ data: response.data[0] ? response.data : [] });
            return;
          }
          if (options.method === 'POST') {
            setModels((prev: Model[]) => [...prev, ...response.data]);
            resolve({ data: response.data });
            return;
          }
          setModels(response.data);
          resolve({ data: response.data } as { data: Model[] } | Error);
        } catch (error) {
          reject(error);
        }
      });
    },
    [setModels]
  );
  return <ModelContext.Provider value={[models, handleModels]}>{children}</ModelContext.Provider>;
};
