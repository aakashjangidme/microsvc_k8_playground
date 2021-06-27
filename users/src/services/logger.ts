import fs from 'fs';
import winston, { createLogger, format, transports } from 'winston';

import app from '../config/config.extra';

const { environment, logging } = app;
const { combine, colorize, splat, printf, timestamp } = format;

const keysToFilter = ['password', 'token'];

const formatter = printf((info: any) => {
  const { level, message, timestamp: ts, ...restMeta } = info;

  const meta =
    restMeta && Object.keys(restMeta).length
      ? JSON.stringify(
          restMeta,
          (key: any, value: any) =>
            keysToFilter.includes(key) ? '******' : value,
          2
        )
      : restMeta instanceof Object
      ? ''
      : restMeta;

  return `[${level}] - [${ts}] ${message} ${meta}`;
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
    splat(),
    colorize({ message: true }),
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    formatter
  ),

  transports: [
    ...trans,

    new transports.File({
      filename: `${logging.dir}/${
        logging.level
      }-${new Date().toDateString()}.log`,
      maxFiles: 2,
      maxsize: 5242880, // 5MB
    }),

    // new DailyRotateFile({
    //   maxSize: logging.maxSize,
    //   maxFiles: logging.maxFiles,
    //   datePattern: logging.datePattern,
    //   zippedArchive: true,
    //   filename: `${logging.dir}/${logging.level}-%DATE%.log`
    // })
  ],
});

export default logger;
