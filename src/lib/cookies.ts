import { Response } from "express";

export const setAuthCookie = (
  res: Response,
  accessToken: string,
  message: string,
  refreshToken?: string,
  user?: any
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
  });

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }

  res.status(201).json({
    success: true,
    message,
    user,
  });
};
