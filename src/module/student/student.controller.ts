import { studentService } from "./student.service";
import { Request, Response } from "express";
import { oauth2Client } from "@/config/google.config";
import bcrypt from "bcrypt";
import axios from "axios";
import { generateTokens, verifyRefreshToken } from "@/lib/auth";
import { setAuthCookie } from "@/lib/cookies";
import { asyncWrap } from "@/utils/asyncWrap";

const signUpUser = async (req: Request, res: Response) => {
  const data = req.body;
  const { password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  data.password = hashedPassword;
  const user = await studentService.createUser(data);
  if (!user) return res.json({ message: "user not created" }).status(401);
  const { accessToken, refreshToken } = generateTokens({
    userId: String(user.id),
    email: user.email,
  });

  return setAuthCookie(
    res,
    accessToken,
    "User Created and logged in successfully",
    refreshToken
  );
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await studentService.findUserByEmail(email);

  if (!user) {
    return res.json({ message: "user not found" }).status(401);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.json({ message: "password not match" }).status(401);
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: String(user.id),
    email: user.email,
  });

  return setAuthCookie(res, accessToken, "Login Successful", refreshToken);
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({sucess: true, message: "Logout successful" }).status(200);
};

const googleLogin = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  if (!code) {
    return res.json({ message: "code not found" }).status(401);
  }
  const googleRes = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );

  if (!userRes || !userRes.data) {
    return res.json({ success: false, message: "user not found" }).status(401);
  }

  const data = userRes.data;

  const user = await studentService.findUserByEmail(data.email);

  if (!user) {
    return res
      .json({
        success: false,
        message: "user not found please sign up",
        user: data,
      })
      .status(401);
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: String(user.id),
    email: user.email,
  });

  return setAuthCookie(res, accessToken, "Login Successful", refreshToken);
};

const refreshToken = asyncWrap(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const { userId, email } = decoded;
  const tokens = generateTokens({ userId, email });

  return setAuthCookie(
    res,
    tokens.accessToken,
    "Token refreshed",
    tokens.refreshToken
  );
});

export const userController = {
  signUpUser,
  login,
  googleLogin,
  logout,
  refreshToken,
};
