import handleResponse from '../utils/handleResponse';

async function getDriveFile(driveId: string): Promise<any> {
  const data = await fetch(`http://api:9000/api/drive-file?driveId=${driveId}`)
    .then(handleResponse)
    .then(res => res)
    .catch(err => {
      console.log('server-side error: ', err);
      return [];
    });
  return data;
}
async function getDrive(nextPage = '') {
  const response: Response = await fetch(`http://api:9000/api/drive-list?nextPage=${nextPage}`);
  return response;
}

export { getDrive, getDriveFile };
