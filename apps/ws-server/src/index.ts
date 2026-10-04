import { WebSocketServer } from "ws";
import * as cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

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
      const decoded = jwt.verify(token, "123123");
      if (!decoded || (decoded as JwtPayload).userId !== 123) {
        ws.send("Unauthorized: connection closed!");
        ws.close();
        return;
      }
      const userId = (decoded as JwtPayload).userId;
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
