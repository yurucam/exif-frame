import { Theme } from './draw';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height ? { bottom: image.width * 0.05 * 2 } : { bottom: image.height * 0.05 * 2 };
};

const darkInside: Theme = async (photo, image, options) => {
  const canvas = document.createElement('canvas');
  const { bottom } = calculateMargin(image);
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.035 : image.height * 0.035;
  context.fillStyle = '#000000';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(
    [
      options.showCameraMaker ? options.overrideCameraMaker || photo.make : null,
      options.showCameraModel ? options.overrideCameraModel || photo.model : null,
      options.showLensModel ? options.overrideLensModel || photo.lensModel : null,
    ]
      .filter(Boolean)
      .join(' | '),
    canvas.width / 2,
    canvas.height - bottom / 2 - fontSize / 2 - fontSize / 7
  );
  context.fillText(
    [photo.focalLength, photo.fNumber, 'ISO ' + photo.iso, photo.exposureTime + 's'].filter(Boolean).join(' | '),
    canvas.width / 2,
    canvas.height - bottom / 2 + fontSize / 2 + fontSize / 7
  );

  return canvas;
};

export default darkInside;
