import { clamp } from '../../utils/clamp';
import { encode } from '@jsquash/webp'; // WASM-based WebP encoder/decoder - https://github.com/jamsinclair/jSquash
import { Buffer } from 'buffer';

interface ConvertOption {
  /**
   * Type of the image
   * @default 'image/webp'
   */
  type: 'image/jpeg' | 'image/webp';

  /**
   * Quality of the image
   * @default 92
   * @range 1 ~ 100
   */
  quality: number;
}

/**
 * Convert canvas to base64 string
 * @param canvas
 * @returns Base64 string
 */
export default async function convert(canvas: HTMLCanvasElement, options: ConvertOption): Promise<string> {
  const quality = clamp(options.quality, 1, 100);

  if (options.type === 'image/jpeg') {
    return canvas.toDataURL('image/jpeg', quality / 100);
  }

  if (options.type === 'image/webp') {
    const arrayBuffer = await encode(canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height), { quality });
    return `data:image/webp;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
  }

  throw new Error('Unsupported image type');
}
