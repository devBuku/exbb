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

export const initDraw = function (canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shapes[] = [];

  if (!ctx) return;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
