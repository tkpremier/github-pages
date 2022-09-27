import { NextApiRequest } from 'next';

export type NextApiRequestWithQuery = NextApiRequest & {
  query?: {
    [key: string]: string;
  };
};

export interface ContactDB {
  createdOn: Date;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}

export interface Contact {
  createdOn: string;
  driveIds: Array<string>;
  id: number;
  name: string;
  platform: string;
}
