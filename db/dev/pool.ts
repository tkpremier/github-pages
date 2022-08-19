/* eslint-disable @typescript-eslint/no-var-requires */
import { Pool } from 'pg';
const dotenv = require('dotenv');

dotenv.config();
console.log('connection string: ', `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`);
// postgres://transportUser:develop@localhost:5235/transport
const databaseConfig = {
  connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
};
const pool = new Pool(databaseConfig);

export default pool;
