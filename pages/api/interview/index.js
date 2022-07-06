import handleResponse from '../../../utils/handleResponse';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    fetch('http://localhost:9000/api/interview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(req.body)
    })
      .then(handleResponse)
      .then(res => {
        console.log('res: ', res);
        return res.status(200).send(res);
      })
      .catch(err => err);
  }
  if (req.method === 'GET') {
    const response = await getDrive(req.query.nextPage);
    return res.status(200).send(response);
  }
}
