import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "@repo/validation/user";
import { JWT_SECRET } from "@repo/backend-common/env";

const signUpHandler = function (req: Request, res: Response): void {
  try {
    const response = signUpSchema.parse(req.body);
    const { username, email, password } = response;
    const userId = 123;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({ token, user: { username, email, password } });
  } catch (error) {
    res.status(400).json(error);
  }
};

const signInHandler = function (req: Request, res: Response): void {
  try {
    const response = signInSchema.parse(req.body);
    const { email, password } = response;
    const userId = 123;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({ token, user: { email, password } });
  } catch (error) {
    res.status(400).json(error);
  }
};

export { signInHandler, signUpHandler };
