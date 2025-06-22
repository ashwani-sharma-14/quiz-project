import { asyncWrap } from "@/utils/asyncWrap";
import bcrypt from "bcrypt";
import { adminService } from "./admin.service";
import fs from "fs";
import path from "path";
import { readExcelFile } from "@/scripts/readExcelFile";
import { Response, Request } from "express";
import { parseExcelData } from "@/scripts/parsedFile";
import { generateTokens } from "@/lib/auth";
import { setAuthCookie } from "@/lib/cookies";

const registerAdmin = asyncWrap(async (req: Request, res: Response) => {
  const data = req.body;
  const password = data.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  data.password = hashedPassword;
  const admin = await adminService.createAdmin(data);
  const { accessToken, refreshToken } = generateTokens({
    userId: String(admin.id),
    email: admin.email,
  });

  return setAuthCookie(res, accessToken, "Login Successful", refreshToken);
});

const login = asyncWrap(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await adminService.findAdminByEmail(email);
  if (!admin) {
    return res.json({ message: "admin not found" }).status(404);
  }
  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    return res.json({ message: "password not match" }).status(401);
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: String(admin.id),
    email: admin.email,
  });

  return setAuthCookie(res, accessToken, "Login Successful", refreshToken);
});

const uploadExcel = asyncWrap(async (req: Request, res: Response) => {
  const adminEmail = req.user?.email;
  if (!adminEmail) {
    return res.status(401).json({ message: "Use are not authorized" });
  }

  const file = req.file;
  if (!file) {
    return res.status(401).json({ message: "No file uploaded" });
  }

  if (
    file.mimetype !== "application/vnd.ms-excel" &&
    file.mimetype !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return res.status(400).json({ message: "Invalid file format" });
  }

  const uploadDir = path.join(__dirname, "../../../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const filePath = path.join(uploadDir, file.originalname);

  fs.writeFileSync(filePath, file.buffer);
  const data = await readExcelFile(filePath);

  if (!data) {
    return res.json({
      message: "No data found",
      filename: file.originalname,
    });
  }

  const parsedData = parseExcelData(data);
  console.log(parsedData);
  const savedData = await adminService.saveQuestionsToDB(parsedData);
  fs.unlinkSync(filePath);
  return res.json({
    message: "File uploaded successfully",
    filename: file.originalname,
    savedData,
  });
});

const getAllUsers = asyncWrap(async (req: Request, res: Response) => {
  const AdminEmail = req.user?.email;
  if (!AdminEmail) {
    return res.status(401).json({ message: "Use are not authorized" });
  }

  const users = await adminService.getAllUsers();

  return res.json({
    message: "Users fetched successfully",
    users,
  });
});

const logout = asyncWrap(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({ message: "Logout successful" }).status(200);
});

const adminController = {
  registerAdmin,
  login,
  uploadExcel,
  getAllUsers,
  logout,
};

export default adminController;
