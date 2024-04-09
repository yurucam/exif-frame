import { Theme } from './draw';

const noFrame: Theme = async (_photo, image) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(image, 0, 0);

  return canvas;
};

export default noFrame;
