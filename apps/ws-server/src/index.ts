import { WebSocketServer } from "ws";
import * as cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/env";
import { prisma } from "@repo/database/prisma";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function connection(ws, request): void {
  const cookies = cookie.parseCookie(request.headers.cookie || "");
  const token = cookies.token;
  if (!token) {
    ws.send("Unauthorized: connection closed!");
    ws.close();
    return;
  } else {
    console.log(token);
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded) {
        ws.send("Unauthorized: connection closed!");
        ws.close();
        return;
      }
      const userId = (decoded as JwtPayload).userId;
      const user = prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) {
        ws.close();
        return;
      }
      ws.on("message", function message(data) {
        console.log("received: %s", data);
        ws.send(userId + " :sent by server!");
      });
    } catch (error) {
      console.log(error);
      ws.close();
      return;
    }
  }
});
