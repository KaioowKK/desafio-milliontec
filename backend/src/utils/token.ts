import jwt from "jsonwebtoken";

const getSecret = () => {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("Missing JWT_SECRET in environment. Set backend/.env and restart.");
  return s;
};

export const signToken = (payload: object) => {
  return jwt.sign(payload, getSecret(), { expiresIn: "8h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, getSecret());
};