import { Theme } from './draw';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height
    ? { top: 0, right: 0, bottom: image.width * 0.04 * 2, left: 0 }
    : { top: 0, right: 0, bottom: image.height * 0.04 * 2, left: 0 };
};

const darkStrap: Theme = async (photo, image, options) => {
  const canvas = document.createElement('canvas');
  const { top, right, bottom, left } = calculateMargin(image);
  canvas.width = image.width + left + right;
  canvas.height = image.height + top + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(image, left, top, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.025 : image.height * 0.025;
  context.fillStyle = '#ffffff';
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(
    ['ISO' + photo.iso, photo.fNumber, photo.exposureTime + 's'].filter(Boolean).join(' '),
    fontSize,
    canvas.height - bottom / 2 - fontSize / 1.8
  );

  context.fillStyle = '#808080';
  context.font = `normal 300 ${fontSize}px Barlow`;
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText([photo.createdAt].filter(Boolean).join(' '), fontSize, canvas.height - bottom / 2 + fontSize / 1.8);

  context.fillStyle = '#ffffff';
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillText(
    [
      options.showCameraMaker ? options.overrideCameraMaker || photo.make : null,
      options.showCameraModel ? options.overrideCameraModel || photo.model : null,
    ]
      .filter(Boolean)
      .join(' | '),
    canvas.width - fontSize,
    canvas.height - bottom / 2 - fontSize / 1.8
  );

  context.fillStyle = '#808080';
  context.font = `normal 300 ${fontSize}px Barlow`;
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillText(
    [options.showLensModel ? options.overrideLensModel || photo.lensModel : null, photo.focalLength].filter(Boolean).join(' '),
    canvas.width - fontSize,
    canvas.height - bottom / 2 + fontSize / 1.8
  );

  return canvas;
};

export default darkStrap;
