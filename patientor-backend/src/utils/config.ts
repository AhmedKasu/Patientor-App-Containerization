import { load } from 'ts-dotenv';

type Env = {
  MONGO_URL: string;
  REDIS_URL?: string;
  REDIS_PASSWORD: string;
  PORT?: number;
  JWT_SECRET: string;
  NODE_ENV?: 'development' | 'production' | 'test';
};

const env: Env = load({
  MONGO_URL: String,
  REDIS_URL: { type: String, optional: true },
  REDIS_PASSWORD: String,
  PORT: { type: Number, optional: true, default: 3001 },
  JWT_SECRET: String,
  NODE_ENV: {
    type: ['production', 'test'],
    optional: true,
    default: 'development',
  },
}) as Env;

const MONGO_URL = env.MONGO_URL;
const REDIS_URL = env.REDIS_URL;
const REDIS_PASSWORD = env.REDIS_PASSWORD;
const PORT = env.PORT;
const JWT_SECRET = env.JWT_SECRET;
const NODE_ENV = env.NODE_ENV;

export { JWT_SECRET, MONGO_URL, NODE_ENV, PORT, REDIS_PASSWORD, REDIS_URL };
