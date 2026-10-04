import express from "express";
import { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import roomRouter from "./routes/room.routes";

const app: Express = express();

app.get("/health", function (_req: Request, res: Response): void {
  res.status(200).json({ message: "I am healthy" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);

const port = 3000;
app.listen(port, function (): void {
  console.log("Http Server is running on port:", port);
});
