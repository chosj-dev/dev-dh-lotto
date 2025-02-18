import express, { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
