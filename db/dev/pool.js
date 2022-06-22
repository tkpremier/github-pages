import { Pool } from "pg";

// postgres://transportUser:develop@localhost:5235/transport
const databaseConfig = { connectionString: `postgres://tommykim:postgres@localhost:5432/postgres` };
const pool = new Pool(databaseConfig);

export default pool;
