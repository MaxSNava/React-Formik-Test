import Database from 'better-sqlite3';

const db = new Database('./data.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  );
`);

export default db;
