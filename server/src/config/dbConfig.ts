import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

console.log("DB 연결 시도:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
});

const pool = mysql.createPool(dbConfig);

// 연결 테스트
pool
  .getConnection()
  .then((connection) => {
    console.log("데이터베이스 연결 성공");
    connection.release();
  })
  .catch((err) => {
    console.error("데이터베이스 연결 실패:", err);
  });

export default pool;
