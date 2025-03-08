import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

export const uuid = uuidv4();
export const counter = (data, key) => {
  return data[key].sort((a, b) => b.id - a.id)[0];
}
export const logger = pino();

