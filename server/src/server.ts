import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";

dotenv.config();

const PORT = process.env.PORT || 5050;

// 🚀 TypeORM 데이터베이스 연결 후 서버 실행
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected.");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
