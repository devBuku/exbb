import { Router } from "express";
import { getAllChats } from "../controllers/chat.controllers";
const chatRouter = Router();

chatRouter.get("/:roomId", getAllChats);

export default chatRouter;
