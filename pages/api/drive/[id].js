import { getDriveFile } from "../../../services/drive";

export default async function handler(req, res) {
  const response = await getDriveFile(req.query.id);
  return res.status(200).send(response);
}
