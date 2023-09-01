import { createClient } from 'redis';
import { REDIS_PASSWORD, REDIS_URL } from '../utils/config';

const client = createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
});

void (async () => {
  await client.connect();
})();
client.on('connect', () => console.log('connected to redis'));
client.on('error', (err) => console.log('redis Client Error', err));

const setCache = async (key: string, value: string) => {
  try {
    await client.setEx(key, 1200, value);
    return true;
  } catch (err) {
    console.error(`Error setting ${key} in Redis:`, err);
    return false;
  }
};

const getCache = async (key: string) => {
  try {
    const value = await client.get(key);
    return value;
  } catch (err) {
    console.error(`Error getting ${key} from Redis:`, err);
    return null;
  }
};

export { setCache, getCache };
