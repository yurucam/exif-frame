import { encode } from '@jsquash/webp'; // WASM-based WebP encoder/decoder - https://github.com/jamsinclair/jSquash
import { webpDownloadEvent } from '../google-analytics';

const canvasToWebp = async (canvas: HTMLCanvasElement, quality?: number): Promise<ArrayBuffer> => {
  const arrayBuffer = await encode(canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height), { quality: quality || 1 });
  // remove the original canvas
  canvas.width = 0;
  canvas.height = 0;
  canvas.remove();
  webpDownloadEvent();
  return arrayBuffer;
};

export default canvasToWebp;
