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
const isTest = NODE_ENV === 'test';

let connSettings: ConnectionOptions;

if (isProd) {
  connSettings = {
    type: 'mysql',
    url: DATABASE_URL,
    synchronize: false,
  };
} else if (isTest) {
  connSettings = {
    type: 'mysql',
    port: 3306,
    host: 'localhost',
    username: 'trakttest',
    password: 'trakttest',
    database: 'trakt_test',
    synchronize: false,
  };
} else {
  connSettings = {
    type: 'mysql',
    port: 3306,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true,
  };
}

export default {
  database: connSettings
};
