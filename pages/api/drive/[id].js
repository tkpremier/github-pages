import { getDriveFile } from '../../../services/drive';
import { updateDriveApi } from '../../../services/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const response = await updateDriveApi(req, res);
    return response;
  }
  const response = await getDriveFile(req.query.id);
  return res.status(200).send(response);
}
