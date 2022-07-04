import { getModel, updateModelApi } from "../../../services/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    console.log("PUT PUT PUT PUT");
    const response = await updateModelApi(req, res);
    return response;
  }
  const response = await getModel(req, res);
  return res.status(200).send(response);
}
