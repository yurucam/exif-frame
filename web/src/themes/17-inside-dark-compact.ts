import { Theme, createCanvas } from './draw';

const insideDarkCompact: Theme = async (photo, image, options) => {
  const { canvas, fontSize } = createCanvas(image, { fontSizePercent: 2 });

  const context = canvas.getContext('2d')!;

  context.fillStyle = '#000000';
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
    fontSize,
    canvas.height - fontSize
  );

  return canvas;
};

export default insideDarkCompact;
