const resizeCanvas = (canvas: HTMLCanvasElement, width: number, height: number): HTMLCanvasElement => {
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = width;
  resizedCanvas.height = height;
  const ctx = resizedCanvas.getContext('2d');
  ctx?.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
  // remove the original canvas
  canvas.width = 0;
  canvas.height = 0;
  canvas.remove();
  return resizedCanvas;
};

export default resizeCanvas;
