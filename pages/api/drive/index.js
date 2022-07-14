import { createNewDriveFile } from '../../../services/db';
import { getDrive } from '../../../services/drive';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await createNewDriveFile(req, res);
    return response;
  }
  const response = await getDrive(req.query.nextPage);
  return res.status(200).send(response);
}
