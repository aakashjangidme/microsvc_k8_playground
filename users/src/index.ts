import express, { Application } from 'express';
import logger from './services/logger';
import cors from 'cors';
import { userRouter } from './routes/user-router';
import { errorHandler } from './middlewares/error-handler';
import { createConnection } from 'typeorm';
import { healthCheckRouter } from './routes/health-check';
import { Errors, RestError } from './errors/errors';
import config from './config/config';
import { requestLogger } from './middlewares/request-logger';

const app: Application = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(requestLogger);

/** Routes */
app.get('/api/users', (_req, res) => {
  res.status(200).json({ message: config.name });
});
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
        `Server Up & Running On http://${config.server.host}:${config.server.port}`
      );
    });
  })
  .catch((err) => {
    logger.error(`${err.message}`, err);
  });
