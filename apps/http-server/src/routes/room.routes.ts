import { Router } from "express";

const roomRouter = Router();

roomRouter.post("/create", function (req, res) {
  res.send("Room created");
});

export default roomRouter;
