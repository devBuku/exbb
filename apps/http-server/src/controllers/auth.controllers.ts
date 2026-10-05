import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "@repo/validation/user";
import { JWT_SECRET } from "@repo/backend-common/env";
import { prisma } from "@repo/database/prisma";

const signUpHandler = async function (req: Request, res: Response) {
  try {
    const response = signUpSchema.parse(req.body);
    const { username, email, password } = response;

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      res.status(409).json({ message: "User already exists!" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    res.cookie("token", token);

    res
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(400).json(error);
  }
};

const signInHandler = async function (req: Request, res: Response) {
  try {
    const response = signInSchema.parse(req.body);
    const { email, password } = response;
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(411).json({ message: "Invalid email or password" });
      return;
    }
    const isPasswordCorrect = user.password === password;
    if (isPasswordCorrect === false) {
      res.status(411).json({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.cookie("token", token);
    res
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(400).json(error);
  }
};

export { signInHandler, signUpHandler };
