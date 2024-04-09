import { Theme } from './draw';

const cinemaScope: Theme = async (_photo, image) => {
  const canvas = document.createElement('canvas');
  const trimmedImageWidth = image.width;
  const trimmedImageHeight = image.width / 2.35;
  canvas.width = trimmedImageWidth;
  canvas.height = trimmedImageHeight * 1.311875;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    image,
    0,
    (image.height - trimmedImageHeight) / 2,
    trimmedImageWidth,
    trimmedImageHeight,
    0,
    (canvas.height - trimmedImageHeight) / 2,
    canvas.width,
    trimmedImageHeight
  );

  return canvas;
};

export default cinemaScope;
