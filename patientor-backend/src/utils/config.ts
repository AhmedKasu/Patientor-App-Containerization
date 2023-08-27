import { load } from 'ts-dotenv';

type Env = {
  MONGO_URL: string;
  REDIS_URL?: string;
  PORT?: number;
  JWT_SECRET?: string;
};

const env: Env = load({
  MONGO_URL: String,
  REDIS_URL: { type: String, optional: true },
  PORT: { type: Number, optional: true, default: 3001 },
  JWT_SECRET: String,
});

const MONGO_URL = env.MONGO_URL;
const REDIS_URL = env.REDIS_URL || undefined;
const PORT = env.PORT;
const JWT_SECRET = env.JWT_SECRET;

export { MONGO_URL, REDIS_URL, PORT, JWT_SECRET };
