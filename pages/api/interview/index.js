import handleResponse from '../../../utils/handleResponse';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    const response = await fetch('http://localhost:9000/api/interview', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req.body)
    });
    if (!response.ok) {
      console.log('response: ', response);
      const error = response.error();
      return res.status(response.status).send(error);
    }
    const json = response.json();
    return res.status(200).send(json);
  }
  if (req.method === 'GET') {
    const response = await getDrive(req.query.nextPage);
    return res.status(200).send(response);
  }
}
