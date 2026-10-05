import { JWT_SECRET } from "@repo/backend-common/env";
import { prisma } from "@repo/database/prisma";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const authMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded || !(decoded as JwtPayload).userId)
    return res.status(403).json({ message: "Unauthorized" });
  const user = await prisma.user.findFirst({
    where: { id: (decoded as JwtPayload).userId },
  });
  if (!user) return res.status(403).json({ message: "Unauthorized" });
  // @ts-ignore
  req.userId = decoded.userId;
  next();
};

export default authMiddleware;
