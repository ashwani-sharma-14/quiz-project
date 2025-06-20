import { createUser, findUserByEmail } from "./student.service";
import { Request, Response } from "express";
import { oauth2Client } from "@/config/google.config";
import bcrypt from "bcrypt";
import axios from "axios";
const signUpUser = async (req: Request, res: Response) => {
  const data = req.body;
  const { password,dob } = data;
   data.dob = new Date(dob).toISOString();
  const hashedPassword = await bcrypt.hash(password, 10);
  data.password = hashedPassword;
  const user = await createUser(data);
  return res.json({ message: "user created", user }).status(201);
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.json({ message: "user not found" }).status(401);
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.json({ message: "password not match" }).status(401);
  }

  return res.json({ message: "login success", user }).status(200);
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
    return res.json({ message: "user not found" }).status(401);
  }

  const data = userRes.data;

  const user = await findUserByEmail(data.email);

  if (!user) {
    return res.json({ message: "user not found", user }).status(401);
  }
  return res.json({ message: "login success", user }).status(200);
};

export const userController = {
  signUpUser,
  login,
  googleLogin,
};

