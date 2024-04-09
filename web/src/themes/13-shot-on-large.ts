import { Theme } from './draw';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height
    ? { top: image.width * 0.1, right: image.width * 0.05, bottom: image.width * 0.2, left: image.width * 0.05 }
    : { top: image.height * 0.1, right: image.height * 0.05, bottom: image.height * 0.2, left: image.height * 0.05 };
};

const shotOnLarge: Theme = async (photo, image, options) => {
  const canvas = document.createElement('canvas');
  const { top, right, bottom, left } = calculateMargin(image);
  canvas.width = image.width + left + right;
  canvas.height = image.height + top + bottom;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, left, top, image.width, image.height);

  const fontSizeSmall = image.height > image.width ? image.width * 0.03 : image.height * 0.03;
  const fontSizeMedium = image.height > image.width ? image.width * 0.05 : image.height * 0.05;
  const fontSizeBig = image.height > image.width ? image.width * 0.06 : image.height * 0.06;

  context.fillStyle = '#000000';
  context.textAlign = 'left';
  context.textBaseline = 'bottom';
  context.font = `normal 500 ${fontSizeMedium}px Barlow`;
  const paddingLeft1 = context.measureText('shot on ').width;

  context.font = `normal 600 ${fontSizeBig}px Barlow`;
  const environment = [
    [
      options.showCameraMaker ? options.overrideCameraMaker || photo.make : null,
      options.showCameraModel ? options.overrideCameraModel || photo.model : null,
    ]
      .filter(Boolean)
      .join(' '),
    options.showLensModel ? options.overrideLensModel || photo.lensModel : null,
  ]
    .filter(Boolean)
    .join(' + ');
  const paddingLeft2 = context.measureText(environment).width;

  context.font = `normal 500 ${fontSizeMedium}px Barlow`;
  context.fillText('shot on ', canvas.width / 2 - (paddingLeft1 + paddingLeft2) / 2, canvas.height - bottom / 1.5);

  context.font = `normal 700 ${fontSizeBig}px Barlow`;
  context.fillText(environment, canvas.width / 2 - (paddingLeft1 + paddingLeft2) / 2 + paddingLeft1, canvas.height - bottom / 1.5);

  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.font = `normal 200 ${fontSizeSmall}px Barlow`;
  context.fillText(
    ['ISO ' + photo.iso, photo.focalLength, photo.fNumber, photo.exposureTime + 's'].filter(Boolean).join('   '),
    canvas.width / 2,
    canvas.height - bottom / 1.6
  );

  return canvas;
};

export default shotOnLarge;
