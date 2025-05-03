import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_URL;

if (!redisUrl) {
  throw new Error('UPSTASH_REDIS_URL environment variable is not defined');
}

const redisClient = new Redis(redisUrl, {
  tls: { rejectUnauthorized: false }, // Required for Upstash Redis
});

redisClient.on('connect', () => {
  console.log('✅ Upstash Redis connected successfully.');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export { redisClient };
