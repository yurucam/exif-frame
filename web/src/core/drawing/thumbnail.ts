import Photo from '../photo';
import free from './free';

/**
 * Generates a thumbnail of a photo.
 * @param photo The photo to generate a thumbnail for.
 * @param targetWidth The target width of the thumbnail.
 * @param targetHeight The target height of the thumbnail.
 * @returns The generated thumbnail. Base64 encoded.
 */
export default function thumbnail(photo: Photo, targetWidth: number, targetHeight: number): string {
  const originalAspectRatio = photo.image.width / photo.image.height;
  const targetAspectRatio = targetWidth / targetHeight;

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext('2d')!;

  if (originalAspectRatio > targetAspectRatio) {
    const drawWidth = photo.image.height * targetAspectRatio;
    const drawX = (photo.image.width - drawWidth) / 2;
    context.drawImage(photo.image, drawX, 0, drawWidth, photo.image.height, 0, 0, targetWidth, targetHeight);
  } else {
    const drawHeight = photo.image.width / targetAspectRatio;
    const drawY = (photo.image.height - drawHeight) / 2;
    context.drawImage(photo.image, 0, drawY, photo.image.width, drawHeight, 0, 0, targetWidth, targetHeight);
  }

  const data = canvas.toDataURL('image/jpeg');

  free(canvas);

  return data;
}
