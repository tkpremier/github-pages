import pool from './pool';

export default {
  query(queryText: string, params: Array<any>) {
    return new Promise((resolve, reject) => {
      pool
        .query(queryText, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
