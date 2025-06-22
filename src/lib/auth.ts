import jwt, { SignOptions } from "jsonwebtoken";
import { setAuthCookie } from "./cookies";
import { env } from "@/config/env.config";
import { Response } from "express";

const accessTokenSecret = env.jwtSecret as string;
const refreshTokenSecret = env.refreshTokenSecret as string;
const accessTokenExpiry: SignOptions["expiresIn"] = env.jwtTimeOut as SignOptions["expiresIn"] || "15m";
const refreshTokenExpiry: SignOptions["expiresIn"] = env.refreshTimeOut as SignOptions["expiresIn"] || "7d";

export interface TokenPayload extends jwt.JwtPayload {
  userId: string;
  email: string;
}

export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: accessTokenExpiry,
  });

  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry,
  });

  return { accessToken, refreshToken };
};

export const verifyJWT = (token: string, res?: Response): TokenPayload | null => {
  try {
    return jwt.verify(token, accessTokenSecret) as TokenPayload;
  } catch (error: any) {
    console.error("Access Token Error:", error.message);
    if (error.name === "JsonWebTokenError" && res) {
      setAuthCookie(res, "", "User Logged Out");
    }
    return null;
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, refreshTokenSecret) as TokenPayload;
  } catch (error: any) {
    console.error("Refresh Token Error:", error.message);
    return null;
  }
};
