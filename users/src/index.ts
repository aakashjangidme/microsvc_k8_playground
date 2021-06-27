import express, { Application } from 'express';
import logger from './services/logger';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { userRouter } from './routes/user-router';
import config from './config/config';
import { errorHandler } from './middlewares/error-handler';
import { createConnection } from 'typeorm';
import { healthCheckRouter } from './routes/health-check';
import { Errors, RestError } from './errors/errors';
import { randomUUID } from 'crypto';

dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

logger.info(`NODE_ENV : ${process.env.NODE_ENV}`);

const app: Application = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, _, next) => {
  // const time = new Date().toLocaleString([], { timeZone: 'Asia/Kolkata' });
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  logger.info(
    `[METHOD] - ${req.method}  [URL]-${req.originalUrl}  [IP]-${ip} `
  );
  next();
});

/** Routes */
app.use('/api/users/', userRouter);
app.use('/api/users/', healthCheckRouter);

app.all('*', () => {
  throw new RestError(Errors.NotFound);
});

/** Error Handling */
app.use(errorHandler);

createConnection()
  .then(async () => {
    logger.info('Connecting to database...');
    /** Server Connection */
    app.listen(config.server.port, () => {
      logger.info(
        `Server Up & Running On ${config.server.hostname}:${config.server.port}`
      );
    });
  })
  .catch((err) => {
    logger.error(`${err.message}`, err);
    logger.info(`${err.message}`, err);
  });
