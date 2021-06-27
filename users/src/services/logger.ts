import winston from 'winston';
import fs from 'fs';
import path from 'path';
const logDir = 'logs';

//Create the directory if doesn't exits.
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
/*

const getLabel = (callingModule: any) => {
  const parts = callingModule.filename.split('/');
  return parts[parts.length - 2] + '/' + parts.pop();
};

*/

const timezoned = () =>
  new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

let alignColorsAndTime = winston.format.combine(
  winston.format.errors({ stack: true }),

  winston.format.timestamp({
    format: timezoned,
  }),
  winston.format.colorize({
    all: true,
  }),
  //TODO: Put stack trace in logging
  winston.format.printf(
    (info) => `  ${info.level} ${info.timestamp} : ${info.message} ${info.meta}`
  )
);

// TODO: Research more on winston logger.

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),

  defaultMeta: { service: 'User service' },

  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
    }),
  ],
});

// logger.levels({
//   debug: 0,
//   info: 1,
//   silly: 2,
//   warn: 3,
//   error: 4,
// });
// logger.addColors({
//   debug: 'green',
//   info: 'cyan',
//   silly: 'magenta',
//   warn: 'yellow',
//   error: 'red',
// });

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        alignColorsAndTime,
        winston.format.colorize()
      ),
    })
  );
}

export default logger;
