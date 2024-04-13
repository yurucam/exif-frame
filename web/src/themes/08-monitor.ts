import { Theme, createCanvas } from './draw';

const monitor: Theme = async (photo) => {
  const { canvas, fontSize, paddingBottom } = createCanvas(photo.image, {
    backgroundColor: '#000000',
    fontSizePercent: 3,
    paddingBasedOn: 'auto-inverse',
    paddingBottomPercent: 4,
  });

  const context = canvas.getContext('2d')!;

  context.fillStyle = '#ffffff';
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(
    photo.exposureTime + (photo.exposureTime?.includes('/') ? '' : '"'),
    canvas.width / 5,
    canvas.height - paddingBottom / 2
  );
  context.fillText(photo.fNumber?.replace(/f/g, 'F') ?? '?', (canvas.width / 5) * 2, canvas.height - paddingBottom / 2);
  context.fillText('ISO' + photo.iso, (canvas.width / 5) * 3, canvas.height - paddingBottom / 2);
  context.fillText(photo.focalLength ?? '?', (canvas.width / 5) * 4, canvas.height - paddingBottom / 2);

  return canvas;
};

export default monitor;
