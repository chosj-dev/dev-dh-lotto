import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || "localhost"}:${
    process.env.REDIS_PORT || 6379
  }`,
});

redisClient.on("error", (err) => console.error("Redis 클라이언트 에러:", err));
redisClient.on("connect", () => console.log("Redis 서버 연결됨"));

// Redis 클라이언트 연결
(async () => {
  await redisClient.connect().catch(console.error);
})();

export default redisClient;
