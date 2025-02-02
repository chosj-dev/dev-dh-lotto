import { UserPayload } from "../../src/middlewares/authMiddleware"; // 실제 UserPayload 경로에 맞게 수정

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
