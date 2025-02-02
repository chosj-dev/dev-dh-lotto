import { Request, Response } from "express";
import * as authService from "../../../services/authService";

interface User {
  userId: string;
  userPwd: string;
}

export const login = async (req: Request, res: Response) => {
  const { userId, userPwd } = req.body;

  try {
    const tokens = await authService.loginUser(userId, userPwd);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

// 로그아웃 처리
export const logout = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    await authService.logoutUser(username);
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Access Token 재발급 처리
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: (error as Error).message });
  }
};
