import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import app from '../config/config';

const { environment, logging } = app;
const { combine, colorize, splat, printf, timestamp } = format;

const keysToFilter = ['password', 'token'];

const formatter = printf((info: any) => {
  const { level, message, label, timestamp: ts, ...restMeta } = info;

  const meta =
    restMeta && Object.keys(restMeta).length
      ? '-- ' +
        JSON.stringify(
          restMeta,
          (key: any, value: any) =>
            keysToFilter.includes(key) ? '******' : value,
          2
        )
      : restMeta instanceof Object
      ? ''
      : restMeta;

  return `[${level}] - [${ts}] - [${label}] : ${message} ` + meta;
});

if (!fs.existsSync(logging.dir)) {
  fs.mkdirSync(logging.dir);
}

let trans: any = [];

if (environment === 'development') {
  trans = [new transports.Console()];
}

const logger = createLogger({
  level: logging.level,
  format: combine(
    format.label({ label: path.basename(require.main.filename) }),
    splat(),
    colorize({ message: true }),
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    formatter
  ),

  transports: [
    ...trans,

    new DailyRotateFile({
      maxSize: logging.maxSize,
      maxFiles: logging.maxFiles,
      datePattern: logging.datePattern,
      zippedArchive: true,
      filename: `${logging.dir}/${logging.level}-%DATE%.log`,
      // format: format.json(),
    }),
  ],
});

export default logger;
