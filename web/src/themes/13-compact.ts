import { Theme, createCanvas } from './draw';

const compact: Theme = async (photo, image, options) => {
  const { canvas, fontSize, paddingBottom } = createCanvas(image, {
    fontSizePercent: 2,
    paddingBasedOn: 'auto-inverse',
    paddingBottomPercent: 4,
  });

  const context = canvas.getContext('2d')!;

  context.fillStyle = '#000000';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.textAlign = 'left';
  context.textBaseline = 'middle';
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
    fontSize,
    canvas.height - paddingBottom / 2
  );

  return canvas;
};

export default compact;
