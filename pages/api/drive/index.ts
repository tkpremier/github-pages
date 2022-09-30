import { NextApiResponse } from 'next';
import { getDrive } from '../../../services/drive';
import { NextApiRequestWithQuery } from '../../../types';

export default async function handler(req: NextApiRequestWithQuery, res: NextApiResponse) {
  const response = await getDrive(req.query.nextPage);
  return res.status(200).send(response);
}
