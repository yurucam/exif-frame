/**
 * Free the canvas.
 * @param canvas The canvas to free.
 * @returns void
 */
export default function free(canvas: HTMLCanvasElement): void {
  canvas.width = 0;
  canvas.height = 0;
}
