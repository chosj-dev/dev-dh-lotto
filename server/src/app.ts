import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import v1Routes from "./api/v1/routes/index";

const app = express();

// 미들웨어 설정
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", v1Routes);

export default app;
