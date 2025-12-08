import camelCase from 'lodash/camelCase';
import { createContext, PropsWithChildren, useCallback, useState } from 'react';
import { DBData } from '../types';
import handleResponse from '../utils/handleResponse';

export const DriveContext = createContext<
  [DBData[], (url: string, options?: RequestInit) => Promise<{ data: DBData[] } | Error>]
>([[], () => Promise.resolve({ data: [] } as { data: DBData[] } | Error)]);

export const DriveProvider = ({ children }: PropsWithChildren<{}>) => {
  const [drive, setDrive] = useState<DBData[]>([]);
  const getDrive = useCallback(
    (url: string, options: RequestInit = { method: 'GET', credentials: 'include' }) => {
      return new Promise<{ data: DBData[] } | Error>(async (resolve, reject) => {
        try {
          const response = await handleResponse(await fetch(url, options));
          if (response instanceof Error) {
            reject(response);
            return;
          }
          if (options.method === 'PUT') {
            const updatedDrive = Object.keys(response.data[0]).reduce(
              (
                obj:
                  | (DBData & { [key: string]: string | number | null | Array<number> })
                  | { [key: string]: string | number | null | Array<number> | undefined | Date },
                keys: string
              ) => {
                obj[camelCase(keys)] = response.data[0][keys];
                return obj;
              },
              {} as DBData & { [key: string]: string | number | null | Array<number> | undefined | Date }
            ) as DBData;
            setDrive((prev: DBData[]) => {
              return prev.map(d => (d.id === response.data[0].id ? response.data[0] : d));
            });
            resolve({ data: [updatedDrive] } as { data: DBData[] } | Error);
            return;
          }
          setDrive(response.data);
          resolve({ data: response.data } as { data: DBData[] } | Error);
        } catch (error) {
          reject(error);
        }
      });
    },
    [setDrive]
  );
  return <DriveContext.Provider value={[drive, getDrive]}>{children}</DriveContext.Provider>;
};
