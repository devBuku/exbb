import express from "express";
import { Express, Response, Request } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import roomRouter from "./routes/room.route";

const app: Express = express();

app.get("/health", function (_req: Request, res: Response) {
  res.status(200).json({ message: "I am healthy" });
});

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);

const port = 3002;

app.listen(port, function () {
  console.log(`Server is running on port: ${port}`);
});
