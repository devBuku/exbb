import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const authMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "123123");
  if (
    !decoded ||
    !(decoded as JwtPayload).userId ||
    (decoded as JwtPayload).userId !== 123
  )
    return res.status(403).json({ message: "Unauthorized" });
  // @ts-ignore
  req.userId = decoded.userId;
  next();
};

export default authMiddleware;
