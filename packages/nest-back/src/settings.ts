import { ConnectionOptions } from 'typeorm';

const {
  NODE_ENV,
  DATABASE_URL,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS
} = process.env;
const isProd = NODE_ENV === 'production';

const connSettings: ConnectionOptions = isProd
  ? {
    type: 'mysql',
    url: DATABASE_URL
  }
  : {
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  };

export default {
  database: connSettings
};
