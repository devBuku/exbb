import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "@repo/validation/user";

const signUpHandler = function (req: Request, res: Response) {
  try {
    const response = signUpSchema.parse(req.body);
    const { name, email, password } = response;
    const userId = 123;
    const token = jwt.sign({ userId }, "123123");
    res.cookie("token", token);
    res.status(200).json({ token, user: { name, email, password } });
  } catch (error) {
    res.status(400).json(error);
  }
};

const signInHandler = function (req: Request, res: Response) {
  try {
    const response = signInSchema.parse(req.body);
    const { email, password } = response;
    const userId = 123;
    const token = jwt.sign({ userId }, "123123");
    res.cookie("token", token);
    res.status(200).json({ token, user: { email, password } });
  } catch (error) {
    res.status(400).json(error);
  }
};

export { signInHandler, signUpHandler };
