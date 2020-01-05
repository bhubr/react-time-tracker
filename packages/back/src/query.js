import mysql from 'mysql';
import { promisify } from 'util';
import settings from './settings';

const connection = mysql.createConnection(settings.mysql);
const query = promisify(connection.query.bind(connection));

export default query;
