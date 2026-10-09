import { BACKEND_URL } from "@repo/backend-common/env";
import axios from "axios";

type Shapes =
  | {
      type: "rectangle";
      x: number;
      y: number;
      height: number;
      width: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export const initDraw = async function (
  canvas: HTMLCanvasElement,
  roomId: string,
) {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shapes[] = await getExistingShapes(roomId);

  if (!ctx) return;

  clearCanvas(existingShapes, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", function (e) {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", function (e) {
    clicked = false;
    let width = e.clientX - startX;
    let height = e.clientY - startY;

    existingShapes.push({
      type: "rectangle",
      x: startX,
      y: startY,
      width,
      height,
    });
  });

  canvas.addEventListener("mousemove", function (e) {
    if (clicked) {
      let width = e.clientX - startX;
      let height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};

function clearCanvas(
  existingShapes: Shapes[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.map((shape) => {
    if (shape.type === "rectangle") {
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios(`${BACKEND_URL}/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData;
  });

  return shapes;
}
