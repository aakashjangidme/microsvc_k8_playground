import express, { Application } from 'express';
import logger from './services/logger';
import os from 'os';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';


dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });


const PORT = Number(process.env.SERVER_PORT);

const app: Application = express();

app.use(cors());


app.get('/', (_, res) => {
    res.status(200).json({ message: `Hello World from  ${os.hostname}` });
});


app.listen(PORT, () => {
    logger.info(`Server Up & Running @[OS]  ${os.hostname} `);

})