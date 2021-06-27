import winston from 'winston';
import fs from 'fs';
import path from 'path';
const logDir = 'logs';

//Create the directory if doesn't exits.
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

let alignColorsAndTime = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
  // winston.format.metadata(),

  winston.format.align(),
  winston.format.colorize({
    all: true,
  }),
  //TODO: Put stack trace in logging
  winston.format.printf((info) => {
    const { level, timestamp, message } = info;
    
    return `[${level}] [${timestamp}] : ${message}`;
  })
);

// TODO: Research more on winston logger.

const logger = winston.createLogger({
  exitOnError: false,
  level: 'info',
  format: winston.format.json(),

  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxFiles: 2,
      maxsize: 5242880, // 5MB
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxFiles: 2,
      maxsize: 5242880, // 5MB
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      // level: 'info',
      format: winston.format.combine(
        alignColorsAndTime,
        winston.format.splat(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
