import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const authMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: `Unauthorized` });
  const decoded = jwt.verify(token, "123124");
  if (!decoded) return res.status(403).json({ message: `Unauthorized` });
  // @ts-ignore
  req.userId = decoded.userId;
  next();
};

export default authMiddleware;
