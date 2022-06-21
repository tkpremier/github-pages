import dbQuery from '../db/dev/dbQuery';

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
