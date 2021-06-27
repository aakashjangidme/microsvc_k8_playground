import dotenv from 'dotenv';
import os from 'os';
dotenv.config();

const PORT = Number(process.env.PORT) || 3001;
const HOSTNAME = process.env.HOSTNAME || `${os.hostname}`;

const SERVER = {
  hostname: HOSTNAME,
  port: PORT,
};

const config = {
  server: SERVER,
};

export default config;
