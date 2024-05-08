import format from 'date-fns/format';
import { isNull, camelCase, snakeCase } from 'lodash';
import dbQuery from '../db/dev/dbQuery';
import { isValidEmail, validatePassword, isEmpty } from '../utils/validations';
import { errorMessage, successMessage, status } from '../utils/status';
import { NextApiRequest, NextApiResponse } from 'next';
import { ContactDB, NextApiRequestWithQuery, DriveFile } from '../types';
type DbResponse = {
  rows: Array<any>;
};

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  data: Array<any>;
};

export const getExp = async () => {
  const getModelQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const { rows } = (await dbQuery.query(getModelQuery, [])) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data: dbResponse };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
export const addExp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;
  const createExpQuery = `INSERT INTO exp(name, description) VALUES($1, $2, $3) returning *`;
  const values = [name, description];
  try {
    const { rows } = (await dbQuery.query(createExpQuery, values)) as DbResponse;
    const data = rows[0];
    return res.status(status.success).json({ data, status: 'success' });
  } catch (error) {
    console.log('db error: ', error);
    let errorMessage: ErrorResponse;
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
export const addInterview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { company, date, retro } = req.body;
  const createExpQuery = `INSERT INTO interview(company, retro, date) VALUES($1, $2, $3) returning *`;
  const values = [company, retro, date];
  let errorMessage: ErrorResponse;
  try {
    const { rows } = (await dbQuery.query(createExpQuery, values)) as DbResponse;
    const data = rows[0];
    return res.status(status.success).json({ data, status: 'success' });
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
export const getInterview = async () => {
  const getModelQuery = `SELECT * FROM
  interview ORDER BY id DESC`;
  try {
    const { rows } = (await dbQuery.query(getModelQuery, [])) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no interviews');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse.map(r => ({
        ...r,
        date: format(r.date, 'MM/dd/yyyy')
      }))
    };
  } catch (error) {
    console.log('An error occurred fetching interviews', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
export const createModel = async (req: NextApiRequest, res: NextApiResponse) => {
  let errorMessage: ErrorResponse;
  const { driveIds, modelName, platform } = req.body;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  if (isEmpty(modelName) || isEmpty(platform)) {
    errorMessage.error = 'Name or platform cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  const ids = driveIds.length > 0 ? driveIds.split(';').map((id: string) => id.trim()) : [];
  const hasIds = ids.length > 0;
  const createModelQuery = hasIds
    ? `INSERT INTO model(name, platform, created_on, drive_ids) VALUES($1, $2, $3, $4) returning *`
    : `INSERT INTO model(name, platform, created_on) VALUES($1, $2, $3) returning *`;
  const values = [modelName, platform, createdOn];
  if (hasIds) {
    values.push(ids);
  }
  try {
    const { rows } = (await dbQuery.query(createModelQuery, values)) as DbResponse;
    const data = rows[0];
    console.log('createModel success: ', data);
    return res.status(status.success).json({ data, status: 'success' });
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

export const createNewDriveFile = async (req: NextApiRequest, res: NextApiResponse) => {
  let errorMessage: ErrorResponse;
  const {
    id,
    createdTime,
    viewedByMeTime,
    name,
    webViewLink,
    webContentLink,
    thumbnailLink,
    mimeType = '',
    videoMediaMetadata
  } = req.body;
  console.log('newDrive data: ', req.body);
  const viewedDate = req.body.viewedByMeTime || null;
  const duration = videoMediaMetadata ? parseInt(videoMediaMetadata.durationMillis, 10) : null;
  let type = 'folder';
  if (mimeType.indexOf('image') > -1) {
    type = 'image';
  }
  if (mimeType.indexOf('video') > -1) {
    type = 'video';
  }
  const values = [
    id,
    type,
    name,
    webViewLink,
    webContentLink,
    thumbnailLink,
    format(new Date(createdTime), "MM/dd/yyyy' 'HH:mm:ss"),
    isNull(viewedDate) ? viewedDate : format(new Date(viewedByMeTime), "MM/dd/yyyy' 'HH:mm:ss"),
    duration
  ];
  console.log('new drive files values: ', values);
  // try {
  //   const rows = await createDriveFile(values);
  //   const dbResponse = rows[0];
  //   let successMessage: SuccessResponse;
  //   successMessage.data = dbResponse;
  //   return res.status(status.created).send(successMessage);
  // } catch (error) {
  //   console.log('error?: ', error);
  //   errorMessage.error = 'Operation was not successful';
  //   return res.status(status.error).send(error);
  // }
};

export const getDriveFile = async () => {
  const getDriveFileQuery = `SELECT * FROM
  drive ORDER BY created_time DESC`;
  try {
    const { rows } = (await dbQuery.query(getDriveFileQuery, [])) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no drive files');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse.map((f: DriveFile) =>
        Object.keys(f).reduce(
          (o: { [key: string]: string | number | null | Array<number> }, k: keyof DriveFile): ODriveFile => {
            const dateKeys = ['createdOn', 'createdTime', 'lastViewed'];
            const key = camelCase(k);
            o[key] =
              dateKeys.indexOf(key) > -1
                ? key === 'createdOn' || key === 'createdTime'
                  ? format(new Date(f[k] as DriveFile['createdOn'] | DriveFile['createdTime']), "MM/dd/yyyy' 'HH:mm:ss")
                  : !isNull(f[k])
                  ? format(new Date(f[k] as DriveFile['lastViewed']), "MM/dd/yyyy' 'HH:mm:ss")
                  : f[k]
                : f[k];
            return o;
          },
          {}
        )
      ) as Array<DriveFile>
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const getDriveFileApi = async (_req: NextApiRequest, res: NextApiResponse) => {
  const getDriveFileQuery = `SELECT * FROM
  drive ORDER BY created_time DESC`;
  let errorMessage: ErrorResponse;
  try {
    const { rows } = (await dbQuery.query(getDriveFileQuery, [])) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no drive files';
      return res.status(status.notfound).send(errorMessage);
    }
    return res.status(status.success).send({ data: dbResponse });
  } catch (error) {
    console.log('An error occurred', error);
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};

export const getModel = async (id: number) => {
  const getModelQuery = `SELECT model.name as model_name, drive.name, drive.model_id, model.id, model.drive_ids, drive.drive_id, drive.type, drive.duration, drive.last_viewed, drive.web_view_link, drive.thumbnail_link
  FROM model
  INNER JOIN drive on drive.drive_id = any(model.drive_ids)
  WHERE model.id = $1`;
  const value = [id];
  try {
    const { rows } = (await dbQuery.query(getModelQuery, value)) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [], driveIds: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      driveIds: dbResponse[0].drive_ids || [],
      data: dbResponse.map((f: ContactDB) =>
        Object.keys(f).reduce((o: { [key: string]: Date | Array<string> | number | string }, k: keyof ContactDB) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? format(new Date(f[k] as ContactDB['createdOn']), "MM/dd/yyyy' 'HH:mm:ss") : f[k];
          return o;
        }, {})
      )
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [], driveIds: [] };
  }
};

export const getModelApi = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {
  let errorMessage: ErrorResponse;
  try {
    console.log(req);
    const { data } = await getModel(1);
    const dbResponse = data;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'That model does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    return res.status(status.success).send({ data });
  } catch (error) {
    errorMessage.error = 'An error Occured';
    console.log('error: ', error);
    return res.status(status.error).send(errorMessage);
  }
};

export const getModelList = async () => {
  const getModelQuery = `SELECT * FROM
  model ORDER BY id DESC`;
  try {
    const { rows } = (await dbQuery.query(getModelQuery, [])) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse.map((f: ContactDB) =>
        Object.keys(f).reduce((o: { [key: string]: Date | Array<string> | number | string }, k: keyof ContactDB) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? format(new Date(f[k] as ContactDB['createdOn']), "MM/dd/yyyy' 'HH:mm:ss") : f[k];
          return o;
        }, {})
      )
    };
  } catch (error) {
    console.log('An error occurred: ', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

const updateModel = async (data: Array<string | number | Array<string>>) => {
  const query = `UPDATE model
  SET ${data.shift()} = $1
  WHERE id = $2`;
  console.log('data: [model_id, id] ', data);
  try {
    const { rows } = (await dbQuery.query(query, data)) as DbResponse;
    const dbResponse = rows;
    // if (dbResponse[0] === undefined) {
    //   console.log("No updates");
    //   return { data: [] };
    //   // errorMessage.error = 'There are no models';
    //   // return res.status(status.notfound).send(errorMessage);
    // }
    return {
      data: dbResponse
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const updateModelApi = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {
  try {
    const { data } = await updateModel(req.body);
    const response = data.map((f: ContactDB) =>
      Object.keys(f).reduce(
        (o: { [key: string]: string | number | null | Array<string> | Date }, k: keyof ContactDB) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? format(new Date(f[k] as ContactDB['createdOn']), "MM/dd/yyyy' 'HH:mm:ss") : f[k];
          return o;
        },
        {}
      )
    );
    return res.status(status.success).send(response);
  } catch (error) {
    console.log('error: ', error);
    return res.status(status.error).send(error);
  }
};
