import * as dotenv from 'dotenv';
import * as assert from 'assert';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

const { DB_NAME, DATABASE_URL } = process.env;
const hasDbSettings = !!DB_NAME || !!DATABASE_URL;
// assert.ok(hasDbSettings);
console.log('db name&url', DB_NAME, DATABASE_URL);
