import { Router } from "express";
import { fetchAllUsers, fetchUserById } from "../controllers/userController";

const router = Router();

// GET /users - 모든 사용자 조회
router.get("/", fetchAllUsers);

// GET /users/:id - 특정 사용자 조회
router.get("/:id", fetchUserById);

export default router;
