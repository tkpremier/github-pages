'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Interview } from '../types';
import handleResponse from '../utils/handleResponse';

export const InterviewContext = createContext<
  [Interview[], (url: string, options?: RequestInit & { body?: Interview }) => Promise<{ data: Interview[] } | Error>]
>([[], () => Promise.resolve({ data: [] } as { data: Interview[] } | Error)]);

export const InterviewProvider = ({ children }) => {
  const [response, setInterviews] = useState<{ data: Interview[] }>({ data: [] });
  const handleInterviews = useCallback(
    (url: string, options?: RequestInit & { body?: Interview }) => {
      return new Promise<{ data: Interview[] } | Error>(async (resolve, reject) => {
        try {
          const apiResponse = await handleResponse(await fetch(url, options));
          if (apiResponse instanceof Error) {
            console.error('handleInterviews error: ', apiResponse);
            reject(apiResponse);
            return;
          }
          if (options?.method === 'PUT' || options?.method === 'POST') {
            const updatedInterview = apiResponse.data as Interview;
            setInterviews(({ data }) => ({
              data: data.map(i => (i.id === updatedInterview.id ? updatedInterview : i))
            }));
            resolve({ data: [updatedInterview] });
            return;
          }
          setInterviews({ data: apiResponse.data });
          resolve({ data: apiResponse.data });
          return;
        } catch (error) {
          console.error('handleInterviews error: ', error);
          reject(error);
        }
      });
    },
    [setInterviews]
  );
  useEffect(() => {
    handleInterviews(`${process.env.NEXT_PUBLIC_CLIENTURL}/api/interview`);
  }, []);
  const data = useMemo(
    () =>
      response.data.map((d: Interview) => ({ ...d, date: new Date(d.date).toLocaleDateString() as unknown as Date })),
    [response.data]
  );
  return <InterviewContext.Provider value={[data, handleInterviews]}>{children}</InterviewContext.Provider>;
};
