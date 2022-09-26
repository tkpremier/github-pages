import { NextApiResponse } from 'next';
import { getModelApi, updateModelApi } from '../../../services/db';
import { NextApiRequestWithQuery } from '../../../types';

export default async function handler(req: NextApiRequestWithQuery, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const response = await updateModelApi(req, res);
    return response;
  }
  const response = await getModelApi(req, res);
  return res.status(200).send(response);
}
