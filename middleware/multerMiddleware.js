import fs from 'fs'
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url))
const uploadDirectory = path.resolve(dir, '../assets');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage })
