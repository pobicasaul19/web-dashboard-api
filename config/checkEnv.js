import 'dotenv/config';
import { logger } from '../utils/index.js';

export const checkEnvVariables = () => {
  if (!process.env.APP_TOKEN_KEY) {
    logger.error('APP_TOKEN_KEY is not set');
    throw new Error('APP_TOKEN_KEY is not set');
  }
  logger.info('Environment variables are set correctly');
};
