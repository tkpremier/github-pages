import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import handleResponse from '../utils/handleResponse';

// // Load client secrets from a local file.
const gdToken = {
  access_token:
    'ya29.a0ARrdaM8_pb6kjgE3Xxa8Gr4lNW3zD5_AKJcmEN54TVtVKpX1Kr3d-DIqnMREpz1h7dSq6aSH9Np6WQNsla0L6k6Q1sSJAJn8w5t5VRC-j_s-c8ntkm94WqcWDHifGCdAQHu49iXh6pO7k2ZmO5lFN6bJ2-1_',
  refresh_token:
    '1//0dIO8loxeqUk0CgYIARAAGA0SNwF-L9IrRUsTsyDl50wKbSJDDC3B3K6PrXo9KCXtQWMEs8mjUUSPt6x87WcEfhOXfE8n8jSa4rI',
  scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly',
  token_type: 'Bearer',
  expiry_date: 1656193577622
};
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(): OAuth2Client {
  const credentials = {
    installed: {
      client_id: '160250970666-eofi1rkudvcbhf3n3fheaf7acc3mak8c.apps.googleusercontent.com',
      project_id: 'quickstart-1557442132353',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_secret: '_SifxYsgMaLTGfTJdvHlNrhv',
      redirect_uris: ['http://localhost', 'http://localhost:3000']
    }
  };
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(gdToken);
  return oAuth2Client;
}

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function listFiles(auth, pageToken = "") {
//   const drive = google.drive({ version: "v3", auth });
//   const opt = {
//     pageToken,
//     pageSize: 800,
//     fields: "files, nextPageToken"
//   };
//   const fetch = await drive.files.list(opt);
//   return fetch;
// }
async function getDriveFile(driveId: string): Promise<any> {
  const data = await fetch(`http://localhost:9000/api/drive-file?driveId=${driveId}`)
    .then(handleResponse)
    .then(res => res)
    .catch(err => {
      console.log('server-side error: ', err);
      return [];
    });
  return data;
}
async function getDrive(nextPage = ''): Promise<any> {
  const response = await fetch(`http://localhost:9000/api/drive-list?nextPage=${nextPage}`);
  return response;
}

export { getDrive, getDriveFile, authorize };
