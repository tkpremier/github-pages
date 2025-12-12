'use client';
import camelCase from 'lodash/camelCase';
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { DBData, DBDataResponse, DriveHandler, DriveResponse } from '../types';
import handleResponse from '../utils/handleResponse';

export const DriveContext = createContext<[DriveResponse, DriveHandler<DriveResponse>]>([
  { data: [] } as DriveResponse,
  () => Promise.resolve({ data: [] } as { data: DBData[] } | Error)
]);

export const DriveProvider = ({ children, source }: PropsWithChildren<{ source: string }>) => {
  const [drive, setDrive] = useState<DriveResponse>({ data: [] } as DriveResponse);
  const getDrive = useCallback(
    (url: string, options: RequestInit = { method: 'GET', credentials: 'include' }) => {
      return new Promise<DBDataResponse | Error>(async (resolve, reject) => {
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
            setDrive((prev: DBDataResponse) => {
              return { data: prev.data.map(d => (d.id === response.data[0].id ? response.data[0] : d)) };
            });
            resolve({ data: [updatedDrive] } as { data: DBData[] } | Error);
            return;
          }
          setDrive({ data: response.data });
          resolve({ data: response.data });
        } catch (error) {
          reject(error);
        }
      });
    },
    [setDrive]
  );
  useEffect(() => {
    getDrive(
      source === 'drive-db'
        ? `${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-list`
        : `${process.env.NEXT_PUBLIC_CLIENTURL}/api/drive-google`
    );
  }, []);
  return <DriveContext.Provider value={[drive, getDrive]}>{children}</DriveContext.Provider>;
};
