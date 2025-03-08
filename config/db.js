import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Ensure the data folder exists
const dir = path.dirname(fileURLToPath(import.meta.url))
const dataFolder = path.resolve(dir, './data');
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

// Helper function to initialize a Lowdb database
const initializeDatabase = async (fileName) => {
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  const filePath = path.join(dataFolder, `${fileName}.json`);

  const adapter = new JSONFile(filePath);
  const db = new Low(adapter, []);

  try {
    await db.read();
    if (!db.data || Object.keys(db.data).length === 0) {
      db.data = { [fileName]: [] };
    }
    await db.write();
  } catch (error) {
    console.error("Database initialization failed:", error);
  }

  return db;
}

// Predefined collection loaders for common collections
export const loadUserCollection = async () => {
  const db = await initializeDatabase('users');
  return db;
};

export const loadCompanyCollection = async () => {
  const db = await initializeDatabase('companies');
  return db;
};

export const loadArticleCollection = async () => {
  const db = await initializeDatabase('articles');
  return db;
};