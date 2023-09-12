import { createClient } from 'redis';
import { REDIS_PASSWORD, REDIS_URL } from '../utils/config';
import { cacheSession } from '../utils/constants';

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
    await client.setEx(key, cacheSession, value);
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

const deleteCache = async (key: string) => {
  try {
    await client.del(key);
    return true;
  } catch (err) {
    console.error(`Error deliting ${key} from Redis:`, err);
    return null;
  }
};

export { setCache, getCache, deleteCache };
