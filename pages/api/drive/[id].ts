import { getDriveFile } from '../../../services/drive';
import { createNewDriveFile } from '../../../services/db';
import { NextApiResponse } from 'next';
import { NextApiRequestWithQuery } from '../../../types';

export default async function handler(req: NextApiRequestWithQuery, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await createNewDriveFile(req, res);
    return response;
  }
  const response = await getDriveFile(req.query.id);
  return res.status(200).send(response);
}
