import { Theme, createCanvas } from './draw';

const strap: Theme = async (photo, image, options) => {
  const { canvas, fontSize, paddingBottom } = createCanvas(image, {
    fontSizePercent: 2.5,
    paddingBasedOn: 'auto-inverse',
    paddingBottomPercent: 7,
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#000000';
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText(
    ['ISO' + photo.iso, photo.fNumber, photo.exposureTime + 's'].filter(Boolean).join(' '),
    fontSize,
    canvas.height - paddingBottom / 2 - fontSize / 1.8
  );

  context.fillStyle = '#000000';
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
    canvas.height - paddingBottom / 2 - fontSize / 1.8
  );

  context.fillStyle = '#808080';
  context.font = `normal 300 ${fontSize}px Barlow`;
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillText(
    [options.showLensModel ? options.overrideLensModel || photo.lensModel : null, photo.focalLength].filter(Boolean).join(' '),
    canvas.width - fontSize,
    canvas.height - paddingBottom / 2 + fontSize / 1.8
  );

  return canvas;
};

export default strap;
