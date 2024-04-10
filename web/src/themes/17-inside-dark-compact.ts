import { Theme } from './draw';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: 0, right: 0, bottom: 0, left: 0 };
};

const insideDarkCompact: Theme = async (photo, image, options) => {
  const canvas = document.createElement('canvas');
  const { top, right, bottom, left } = calculateMargin(image);
  canvas.width = image.width + left + right;
  canvas.height = image.height + top + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, left, top, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.02 : image.height * 0.02;
  context.fillStyle = '#ffffff';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.textAlign = 'left';
  context.textBaseline = 'bottom';
  context.fillText(
    [
      options.showCameraMaker ? options.overrideCameraMaker || photo.make : null,
      options.showCameraModel ? options.overrideCameraModel || photo.model : null,
      options.showLensModel ? options.overrideLensModel || photo.lensModel : null,
      photo.focalLength,
      photo.exposureTime + ' sec',
      photo.fNumber,
      'ISO ' + photo.iso,
    ]
      .filter(Boolean)
      .join(' | '),
    left + fontSize,
    canvas.height - fontSize
  );

  return canvas;
};

export default insideDarkCompact;
