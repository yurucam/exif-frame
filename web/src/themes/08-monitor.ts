import { Theme } from './draw';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height ? { bottom: image.width * 0.04 } : { bottom: image.height * 0.04 };
};

const monitor: Theme = async (photo, image) => {
  const canvas = document.createElement('canvas');
  const { bottom } = calculateMargin(image);

  canvas.width = image.width;
  canvas.height = image.height + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height + bottom);

  context.fillStyle = '#ffffff';
  context.drawImage(image, 0, 0, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.04 : image.height * 0.04;
  context.fillStyle = '#ffffff';
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(photo.exposureTime + (photo.exposureTime?.includes('/') ? '' : '"'), canvas.width / 5, canvas.height - bottom / 2);
  context.fillText(photo.fNumber?.replace(/f/g, 'F') ?? '?', (canvas.width / 5) * 2, canvas.height - bottom / 2);
  context.fillText('ISO' + photo.iso, (canvas.width / 5) * 3, canvas.height - bottom / 2);
  context.fillText(photo.focalLength ?? '?', (canvas.width / 5) * 4, canvas.height - bottom / 2);

  return canvas;
};

export default monitor;
