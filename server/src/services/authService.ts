import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import redisClient from "../config/redisConfig";
import { StringValue } from "ms";

dotenv.config();

interface UserPayload {
  userId: string;
}

// 로그인 함수
export const loginUser = async (userId: string, userPwd: string) => {
  try {
    const isVaildUser = true; // 실제로는 DB에서 사용자 인증 필요

    const tokenConfig = {
      accessSecret: process.env.ACCESS_TOKEN_SECRET as string,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET as string,
      accessExpiry: process.env.ACCESS_TOKEN_EXPIRE as StringValue,
      refreshExpiry: process.env.REFRESH_TOKEN_EXPIRE as StringValue,
    };

    if (!tokenConfig.accessSecret || !tokenConfig.refreshSecret) {
      throw new Error("JWT secret is not defined in .env file");
    }

    const accessToken = jwt.sign({ userId }, tokenConfig.accessSecret, {
      expiresIn: tokenConfig.accessExpiry,
    });

    const refreshToken = jwt.sign({ userId }, tokenConfig.refreshSecret, {
      expiresIn: tokenConfig.refreshExpiry,
    });

    // Redis 연결 상태 확인
    if (!redisClient.isReady) {
      throw new Error("Redis client is not connected");
    }

    await redisClient.set(userId, refreshToken, {
      EX: 7 * 24 * 60 * 60, // 7일
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 로그아웃 함수
export const logoutUser = async (userId: string) => {
  const result = await redisClient.del(userId);

  if (result === 0) {
    throw new Error("User token is already logged out");
  }

  return true;
};

// 액세스 토큰 재발급 함수
export const refreshAccessToken = async (refreshToken: string) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET as string;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET as string;

  if (!refreshSecret || !accessSecret) {
    throw new Error("JWT secrets are not defined");
  }

  const decodedToken = jwt.verify(
    refreshToken,
    refreshSecret
  ) as jwt.JwtPayload & UserPayload;

  if (!decodedToken || !decodedToken.userId) {
    throw new Error("Invalid token payload");
  }

  const storedToken = await redisClient.get(decodedToken.userId);

  if (storedToken !== refreshToken) {
    throw new Error("Refresh token mismatch");
  }

  const newAccessToken = jwt.sign(
    { userId: decodedToken.userId },
    accessSecret,
    { expiresIn: "1h" }
  );

  return { accessToken: newAccessToken };
};
