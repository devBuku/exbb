import { Router } from "express";
import { signinHandler, signupHandler } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", signupHandler)
authRouter.post("/signin", signinHandler)

export default authRouter;
