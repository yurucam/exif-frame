/**
 * Resize a canvas to a new width and height.
 * @param canvas The canvas to resize.
 * @param width The new width of the canvas.
 * @param height The new height of the canvas.
 * @returns The resized canvas.
 */
export default function resize(canvas: HTMLCanvasElement, width: number, height: number): HTMLCanvasElement {
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = width;
  resizedCanvas.height = height;

  const context = resizedCanvas.getContext('2d')!;
  context.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);

  return resizedCanvas;
}
