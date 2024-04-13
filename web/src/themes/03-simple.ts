import { Theme, createCanvas } from './draw';

const simple: Theme = async (photo, options) => {
  const { canvas, fontSize, paddingBottom } = createCanvas(photo.image, {
    fontSizePercent: 3,
    paddingBasedOn: 'auto-inverse',
    paddingTopPercent: 5,
    paddingBottomPercent: 10,
    paddingLeftPercent: 5,
    paddingRightPercent: 5,
  });

  const context = canvas.getContext('2d')!;

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
    canvas.height - paddingBottom / 2 - fontSize / 2 - fontSize / 7
  );
  context.fillText(
    [photo.focalLength, photo.fNumber, 'ISO ' + photo.iso, photo.exposureTime + 's'].filter(Boolean).join(' | '),
    canvas.width / 2,
    canvas.height - paddingBottom / 2 + fontSize / 2 + fontSize / 7
  );

  return canvas;
};

export default simple;
