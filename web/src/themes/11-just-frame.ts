import { Theme } from './draw';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height
    ? { top: image.width * 0.05, right: image.width * 0.05, bottom: image.width * 0.05, left: image.width * 0.05 }
    : { top: image.height * 0.05, right: image.height * 0.05, bottom: image.height * 0.05, left: image.height * 0.05 };
};

const justFrame: Theme = async (_photo, image) => {
  const canvas = document.createElement('canvas');
  const { top, right, bottom, left } = calculateMargin(image);
  canvas.width = image.width + left + right;
  canvas.height = image.height + top + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, left, top, image.width, image.height);

  return canvas;
};

export default justFrame;
