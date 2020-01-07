import mysql from 'mysql';
import { promisify } from 'util';
import settings from './settings';

const { NODE_ENV, DATABASE_URL } = process.env;
const isProd = NODE_ENV === 'production';
const connSettings = isProd ? DATABASE_URL : settings.mysql;

const connection = mysql.createConnection(connSettings);
const query = promisify(connection.query.bind(connection));

export default query;
