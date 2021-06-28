import * as dotenv from 'dotenv';

import app from '../../package.json';
import errors from '../resources/lang/errors.json';
import messages from '../resources/lang/messages.json';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'staging';

export default {
  errors,
  messages,
  name: app.name,
  version: app.version,
  environment: process.env.NODE_ENV || 'development',
  server: {
    host: process.env.APP_HOST || '127.0.0.1',
    appUrl: process.env.APP_URL || 'http://localhost:3001',
    port: process.env.APP_PORT || '4001',
  },

  logging: {
    dir: process.env.LOGGING_DIR || 'logs',
    level: process.env.LOGGING_LEVEL || 'debug',
    maxSize: process.env.LOGGING_MAX_SIZE || '20m',
    maxFiles: process.env.LOGGING_MAX_FILES || '7d',
    datePattern: process.env.LOGGING_DATE_PATTERN || 'YYYY-MM-DD',
  },
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      charset: 'utf8',
      timezone: 'IST',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || '3300'),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};
