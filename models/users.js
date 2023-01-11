import fs from 'fs';
import { Database } from 'sqlite-async';
import { getAbsolutePath } from '../utils/index.js';

let database;

const USERS_DB_PATH = getAbsolutePath('schemas/users.db', import.meta.url);
const USERS_SCHEMA_PATH = getAbsolutePath(
  'schemas/usersSchema.sql',
  import.meta.url
);

try {
  database = await Database.open(USERS_DB_PATH);
  const usersSchema = fs.readFileSync(USERS_SCHEMA_PATH, 'utf-8');
  database.exec(usersSchema);
} catch (err) {
  console.error(err);
}

export default database;
