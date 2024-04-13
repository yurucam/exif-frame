import Photo from '../../core/photo';

const MAX_SIZE = 4096; // Mobile Safari has a maximum canvas size of 4096x4096

const sandbox = (
  photo: Photo,
  backgroundColor: string,
  padding: { top: number; bottom: number; left: number; right: number }
): HTMLCanvasElement => {
  const { image } = photo;
  const { top, bottom, left, right } = padding;

  const canvas = document.createElement('canvas');

  let imageWidth = null;
  let imageHeight = null;

  if (image.width > image.height) {
    imageWidth = MAX_SIZE - left - right;
    imageHeight = (image.height / image.width) * imageWidth;
  } else {
    imageHeight = MAX_SIZE - top - bottom;
    imageWidth = (image.width / image.height) * imageHeight;
  }

  canvas.width = imageWidth + left + right;
  canvas.height = imageHeight + top + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, left, top, imageWidth, imageHeight);

  return canvas;
};

export default sandbox;
