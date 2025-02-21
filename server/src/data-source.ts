import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User"; // User 엔티티 추가
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User], // TypeORM 엔티티 사용
  synchronize: true, // 자동 테이블 생성 (개발 환경에서만)
  logging: true, // 쿼리 로깅
});
