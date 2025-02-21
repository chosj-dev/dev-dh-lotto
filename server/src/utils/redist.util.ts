import redisClient from "../config/redisConfig";

export const setRedis = async (key: string, value: string, ttl?: number) => {
  try {
    if (ttl) {
      await redisClient.set(key, value, { EX: ttl });
    } else {
      await redisClient.set(key, value);
    }
  } catch (error) {
    console.error("Redis SET 에러:", error);
    throw error;
  }
};

export const getRedis = async (key: string): Promise<string | null> => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    console.error("Redis GET 에러:", error);
    throw error;
  }
};

export const delRedis = async (key: string) => {
  try {
    return await redisClient.del(key);
  } catch (error) {
    console.error("Redis DEL 에러:", error);
    throw error;
  }
};
