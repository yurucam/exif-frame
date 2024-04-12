import { Theme, createCanvas } from './draw';

const inside: Theme = async (photo, image, options) => {
  const { canvas, fontSize } = createCanvas(image, { fontSizePercent: 3 });

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#ffffff';
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
    canvas.height - fontSize * 2
  );
  context.fillText(
    [photo.focalLength, photo.fNumber, 'ISO ' + photo.iso, photo.exposureTime + 's'].filter(Boolean).join(' | '),
    canvas.width / 2,
    canvas.height - fontSize * 3.5
  );

  return canvas;
};

export default inside;
