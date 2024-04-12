import { Theme, createCanvas } from './draw';

const shotOn: Theme = async (photo, image, options) => {
  const { canvas, fontSize, paddingLeft, paddingRight, paddingBottom } = createCanvas(image, {
    fontSizePercent: 2,
    paddingTopPercent: 2,
    paddingBottomPercent: 5,
    paddingRightPercent: 2,
    paddingLeftPercent: 2,
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#000000';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.textAlign = 'left';
  context.textBaseline = 'middle';
  context.fillText('Shot on ', paddingLeft, canvas.height - paddingBottom / 2);
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
    paddingLeft + context.measureText('Shot on ').width,
    canvas.height - paddingBottom / 2
  );

  context.textAlign = 'right';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.fillText(
    ['ISO ' + photo.iso, photo.focalLength, photo.fNumber, photo.exposureTime + 's'].filter(Boolean).join('   '),
    canvas.width - paddingRight,
    canvas.height - paddingBottom / 2
  );

  return canvas;
};

export default shotOn;
