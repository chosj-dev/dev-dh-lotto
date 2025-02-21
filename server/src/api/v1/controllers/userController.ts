import { Request, Response } from "express";
import { registerUser } from "../../../services/userService";

/**
 * 회원가입 컨트롤러
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { userId, password, lotteryUserId, lotteryPassword } = req.body;

  if (!userId || !password || !lotteryUserId || !lotteryPassword) {
    res.status(400).json({ message: "모든 필드를 입력해야 합니다." });
    return;
  }

  const result = await registerUser(
    userId,
    password,
    lotteryUserId,
    lotteryPassword
  );

  if (result.success) {
    res.status(201).json({ message: result.message });
  } else {
    res.status(400).json({ message: result.message });
  }
};
