import express, { Request, Response } from "express";

const app = express();

// 미들웨어 설정
app.use(express.json());

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

export default app;
