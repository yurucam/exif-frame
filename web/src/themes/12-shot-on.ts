import { Theme } from './draw';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height
    ? { top: image.width * 0.02, right: image.width * 0.02, bottom: image.width * 0.05, left: image.width * 0.02 }
    : { top: image.height * 0.02, right: image.height * 0.02, bottom: image.height * 0.05, left: image.height * 0.02 };
};

const shotOn: Theme = async (photo, image, options) => {
  const canvas = document.createElement('canvas');
  const { top, right, bottom, left } = calculateMargin(image);
  canvas.width = image.width + left + right;
  canvas.height = image.height + top + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, left, top, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.03 : image.height * 0.03;
  context.fillStyle = '#000000';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText('Shot on ', left, canvas.height - bottom / 2);
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.fillText(
    [
      [
        options.showCameraMaker ? options.overrideCameraMaker || photo.make : null,
        options.showCameraModel ? options.overrideCameraModel || photo.model : null,
      ]
        .filter(Boolean)
        .join(' '),
      options.showLensModel ? options.overrideLensModel || photo.lensModel : null,
    ]
      .filter(Boolean)
      .join(' + '),
    left + context.measureText('Shot on ').width,
    canvas.height - bottom / 2
  );

  context.textAlign = 'right';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.fillText(
    ['ISO ' + photo.iso, photo.focalLength, photo.fNumber, photo.exposureTime + 's'].filter(Boolean).join('   '),
    canvas.width - right,
    canvas.height - bottom / 2
  );

  return canvas;
};

export default shotOn;
