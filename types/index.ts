import { NextApiRequest } from 'next';

export type NextApiRequestWithQuery = NextApiRequest & {
  query?: {
    [key: string]: string;
  };
};
