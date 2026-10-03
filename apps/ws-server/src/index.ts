import { WebSocketServer } from "ws";
import * as cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function connection(ws, request) {
  const cookies = cookie.parseCookie(request.headers.cookie || "");
  const token = cookies.token;
  if (!token) ws.close();
  else {
    console.log(token);
    const decoded = jwt.verify(token, "123123");
    const userId = (decoded as JwtPayload).userId;
    ws.on("message", function message(data) {
      ws.send(userId + " :sent by server!");
      console.log("received: %s", data);
    });
  }
});
