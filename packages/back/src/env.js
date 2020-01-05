import dotenv from 'dotenv';
import assert from 'assert';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

assert.ok(!!process.env.DB_NAME);