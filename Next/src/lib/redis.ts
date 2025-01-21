import Redis from 'ioredis';

const redis = new Redis(`redis://:${process.env.REDIS_PASSWORD}@localhost:6379`);

export default redis;