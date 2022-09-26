import { NextApiRequest, NextApiResponse } from 'next';
import { createModel } from '../../../services/db';
import { getDrive } from '../../../services/drive';
import { NextApiRequestWithQuery } from '../../../types';

export default async function handler(req: NextApiRequestWithQuery, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await createModel(req, res);
    return response;
  }
  const response = await getDrive(req.query.nextPage);
  return res.status(200).send(response);
}
