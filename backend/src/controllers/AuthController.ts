import { Request, Response } from "express";
import { signToken } from "../utils/token";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = signToken({ username: "admin" });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
};