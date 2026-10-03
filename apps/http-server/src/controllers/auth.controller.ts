import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signUpSchema } from "../lib/zod/user";

const signupHandler = function (req: Request, res: Response) {
  try {
    const response = signUpSchema.parse(req.body);
    const { email, password } = response;
    const userId = 123;
    const token = jwt.sign({ userId: userId }, "123124");
    res.cookie("token", token);
    res.send({ token, email, password });
  } catch (error) {
    res.status(400).json(error);
  }
};

const signinHandler = function (req: Request, res: Response) {
  res.send("Signin Handler");
};

export { signinHandler, signupHandler };
