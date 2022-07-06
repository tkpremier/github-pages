import format from 'date-fns/format';
import { isNull, camelCase, snakeCase } from 'lodash';
import dbQuery from '../db/dev/dbQuery';
import { isValidEmail, validatePassword, isEmpty } from '../utils/validations';
import { errorMessage, successMessage, status } from '../utils/status';

export const getExp = async () => {
  const getModelQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery.query(getModelQuery);
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
export const addExp = async (req, res) => {
  const { name, description } = req.body;
  const createExpQuery = `INSERT INTO exp(name, description) VALUES($1, $2, $3) returning *`;
  const values = [name, description];
  try {
    const { rows } = await dbQuery.query(createExpQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    console.log('added');
    return res.status(status.success).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
export const addInterview = async (req, res) => {
  const { company, date, retro } = req.body;
  const createExpQuery = `INSERT INTO interview(company, retro, date) VALUES($1, $2, $3) returning *`;
  const values = [company, retro, date];
  try {
    const { rows } = await dbQuery.query(createExpQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.success).json(successMessage);
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
    const { rows } = await dbQuery.query(getModelQuery);
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
export const createModel = async (req, res) => {
  const { driveIds, modelName, platform } = req.body;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  if (isEmpty(modelName) || isEmpty(platform)) {
    errorMessage.error = 'Name or platform cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  const ids = driveIds.length > 0 ? driveIds.split(';').map(id => id.trim()) : [];
  const hasIds = ids.length > 0;
  const createModelQuery = hasIds
    ? `INSERT INTO model(name, platform, created_on, drive_ids) VALUES($1, $2, $3, $4) returning *`
    : `INSERT INTO model(name, platform, created_on) VALUES($1, $2, $3) returning *`;
  const values = [modelName, platform, createdOn];
  if (hasIds) {
    values.push(ids);
  }
  try {
    const { rows } = await dbQuery.query(createModelQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    console.log('createModel success: ', successMessage);
    return res.status(status.success).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const createDriveFile = async values => {
  /*
    (id VARCHAR(100) NOT NULL,
    drive_id VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    web_view_link VARCHAR(100) NOT NULL,
    web_content_link VARCHAR(100) NOT NULL,
    thumbnail_link VARCHAR(100),
    created_time DATE NOT NULL,
    viewed_time DATE NOT NULL,
    created_on DATE NOT NULL)
  */
  const createDriveFileQuery = `INSERT INTO
  drive(id, drive_id, type, name, web_view_link, web_content_link, thumbnail_link, created_time, last_viewed, duration, created_on)
  VALUES($1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  returning *`;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  values.push(createdOn);
  const { rows } = await dbQuery.query(createDriveFileQuery, values);
  return rows;
};

export const createNewDriveFile = async (req, res) => {
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
  let viewedDate = req.body.viewedByMeTime || null;
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
  try {
    const rows = await createDriveFile(values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log('error?: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(error);
  }
};

export const getDriveFile = async () => {
  const getDriveFileQuery = `SELECT * FROM
  drive ORDER BY created_time DESC`;
  try {
    const { rows } = await dbQuery.query(getDriveFileQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no drive files');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse.map(f => {
        return Object.keys(f).reduce((o, k) => {
          const dateKeys = ['createdOn', 'createdTime', 'lastViewed'];
          o[camelCase(k)] =
            dateKeys.indexOf(camelCase(k)) > -1
              ? !isNull(f[k])
                ? format(new Date(f[k]), "MM/dd/yyyy' 'HH:mm:ss")
                : f[k]
              : f[k];
          return o;
        }, {});
      })
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const getDriveFileApi = async (req, res) => {
  const getDriveFileQuery = `SELECT * FROM
  drive ORDER BY created_time DESC`;
  try {
    const { rows } = await dbQuery.query(getDriveFileQuery);
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
const updateModel = async data => {
  console.log('updateModel data: ', data);
  const query = `UPDATE drive
  SET ${data.shift()} = $1
  WHERE id = $2`;
  try {
    const { rows } = await dbQuery.query(query, data);
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

export const updateModelApi = async (req, res) => {
  try {
    const { data } = await updateModel(req.body);
    const dbResponse = data;
    successMessage.data = dbResponse.map(f =>
      Object.keys(f).reduce((o, k) => {
        o[camelCase(k)] =
          f[k] instanceof Date ? (!isNull(f[k]) ? format(new Date(f[k]), "MM/dd/yyyy' 'HH:mm:ss") : f[k]) : f[k];
        return o;
      }, {})
    );
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    console.log('error: ', error);
    return res.status(status.error).send(errorMessage);
  }
};
export const getModel = async id => {
  const getModelQuery = `SELECT model.name, drive.model_id, model.id, model.drive_ids, drive.drive_id, drive.type, drive.duration, drive.last_viewed, drive.web_view_link, drive.thumbnail_link
  FROM drive
  INNER JOIN model on drive.drive_id = any(model.drive_ids)
  WHERE model.id = $1`;
  const value = [parseInt(id, 10)];
  try {
    const { rows } = await dbQuery.query(getModelQuery, value);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse.map(f => {
        return Object.keys(f).reduce((o, k) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? (!isNull(f[k]) ? format(new Date(f[k]), "MM/dd/yyyy' 'HH:mm:ss") : f[k]) : f[k];
          return o;
        }, {});
      })
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const getModelApi = async (req, res) => {
  try {
    const { data } = await getModel(req.query.id);
    const dbResponse = data;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'That model does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.map(f =>
      Object.keys(f).reduce((o, k) => {
        o[camelCase(k)] =
          f[k] instanceof Date ? (!isNull(f[k]) ? format(new Date(f[k]), "MM/dd/yyyy' 'HH:mm:ss") : f[k]) : f[k];
        return o;
      }, {})
    );
    return res.status(status.success).send(successMessage);
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
    const { rows } = await dbQuery.query(getModelQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse.map(f =>
        Object.keys(f).reduce((o, k) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? (!isNull(f[k]) ? format(new Date(f[k]), "MM/dd/yyyy' 'HH:mm:ss") : f[k]) : f[k];
          return o;
        }, {})
      )
    };
  } catch (error) {
    console.log('An error occurred');
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
