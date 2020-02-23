import { ConnectionOptions } from 'typeorm';

const {
  NODE_ENV,
  DATABASE_URL,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_SYNCHRONIZE
} = process.env;
const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

let connSettings: ConnectionOptions;

// A bug in TypeORM prevents getting the db name from the url
// https://github.com/typeorm/typeorm/issues/2096
// Waiting for it to be fixed
// if (isProd) {
//   connSettings = {
//     type: 'mysql',
//     url: DATABASE_URL,
//     synchronize: DB_SYNCHRONIZE === 'true',
//   };
// } else if (isTest) {
if (isTest) {
  connSettings = {
    type: 'mysql',
    port: 3306,
    host: 'localhost',
    username: 'trakttest',
    password: 'trakttest',
    database: 'trakt_test',
    synchronize: true,
  };
} else {
  connSettings = {
    type: 'mysql',
    port: 3306,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: !isProd || DB_SYNCHRONIZE === 'true',
  };
}

export default {
  database: connSettings
};
