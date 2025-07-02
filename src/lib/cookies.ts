import { Response } from "express";

export const setAuthCookie = (
  res: Response,
  accessToken: string,
  message: string,
  refreshToken?: string,
  user?: any
) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction, 
    sameSite: "none", 
    maxAge: 15 * 60 * 1000,
  });


  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
  }

  res.status(201).json({
    success: true,
    message,
    user,
  });
};
