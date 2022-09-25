import { NextApiRequest, NextApiResponse } from 'next';
import { getModelApi, updateModelApi } from '../../../services/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const response = await updateModelApi(req, res);
    return response;
  }
  const response = await getModelApi(req, res);
  return res.status(200).send(response);
}
