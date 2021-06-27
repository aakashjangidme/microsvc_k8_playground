import express, { Application } from 'express';
import logger from './services/logger';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { userRouter } from './routes/user-router';
import config from './config/config';
import { errorHandler } from './middlewares/error-handler';
import { nextTick } from 'process';

dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

logger.info(`NODE_ENV : ${process.env.NODE_ENV}`);

const app: Application = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, _, next) => {
  const time = new Date().toLocaleString([], { timeZone: 'Asia/Kolkata' });
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  logger.info(
    `[TIME]-${time} [IP]-${ip} [URL]-${req.originalUrl} [PATH]-${req.path} `
  );
  next();
});

/** Routes */
app.use(userRouter);

app.all('*', () => {
  throw new Error('Not Found');
});

/** Error Handling */
app.use(errorHandler);

app.listen(config.server.port, () => {
  logger.info(
    `Server Up & Running On ${config.server.hostname}:${config.server.port}`
  );
});
