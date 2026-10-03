import { Router } from "express";
import { signInHandler, signUpHandler } from "../controllers/auth.controllers";

const authRouter = Router();

authRouter.post("/signup", signUpHandler);
authRouter.post("/signin", signInHandler);
export default authRouter;
