import Photo from '../photo';

const MAX_SIZE = 4096; // Mobile Safari has a maximum canvas size of 4096x4096

interface SandboxOptions {
  backgroundColor: string;
  padding: { top: number; bottom: number; left: number; right: number };
  targetRatio: 'free' | '1:1' | '4:5' | '1.91:1' | '9:16';
}

const sandbox = (photo: Photo, options: SandboxOptions): HTMLCanvasElement => {
  const { image } = photo;
  const { backgroundColor, targetRatio } = options;
  const { top, bottom, left, right } = options.padding;

  const canvas = document.createElement('canvas');

  let imageWidth = null;
  let imageHeight = null;

  if (targetRatio === 'free') {
    if (image.width > image.height) {
      imageWidth = MAX_SIZE - left - right;
      imageHeight = (image.height / image.width) * imageWidth;
    } else {
      imageHeight = MAX_SIZE - top - bottom;
      imageWidth = (image.width / image.height) * imageHeight;
    }
  }

  if (targetRatio === '1:1') {
    imageWidth = MAX_SIZE - left - right;
    imageHeight = MAX_SIZE - top - bottom;
    if (imageWidth > imageHeight) {
      imageWidth = imageHeight;
    } else {
      imageHeight = imageWidth;
    }
  }

  if (targetRatio === '4:5') {
    imageHeight = MAX_SIZE - top - bottom;
    imageWidth = (4 / 5) * imageHeight;
  }

  if (targetRatio === '1.91:1') {
    imageWidth = MAX_SIZE - left - right;
    imageHeight = (1 / 1.91) * imageWidth;
  }

  if (targetRatio === '9:16') {
    imageHeight = MAX_SIZE - top - bottom;
    imageWidth = (9 / 16) * imageHeight;
  }

  if (imageWidth === null || imageHeight === null) {
    throw new Error('Invalid target ratio');
  }

  canvas.width = imageWidth + left + right;
  canvas.height = imageHeight + top + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const imageRatio = image.width / image.height;
  const targetRatioValue = imageWidth / imageHeight;
  let drawWidth = imageWidth;
  let drawHeight = imageHeight;
  let drawX = left;
  let drawY = top;
  if (imageRatio > targetRatioValue) {
    drawWidth = imageWidth;
    drawHeight = imageWidth / imageRatio;
    drawY = top + (imageHeight - drawHeight) / 2;
  } else {
    drawHeight = imageHeight;
    drawWidth = imageHeight * imageRatio;
    drawX = left + (imageWidth - drawWidth) / 2;
  }
  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  return canvas;
};

export default sandbox;
