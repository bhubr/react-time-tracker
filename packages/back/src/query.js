import mysql from 'mysql';
import { promisify } from 'util';
import credentials from './credentials';

const connection = mysql.createConnection(credentials);
const query = promisify(connection.query.bind(connection));

export default query;
