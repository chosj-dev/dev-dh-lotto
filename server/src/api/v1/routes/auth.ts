import { Router } from "express";
import { login, logout, refreshToken } from "../controllers/authController";
import { authenticateToken } from "../../../middlewares/authMiddleware";

const router = Router();

router.post("/login", login); // 로그인
router.post("/logout", authenticateToken, logout); // 로그아웃 (인증 필요)
router.post("/token", refreshToken); // Access Token 재발급

export default router;
