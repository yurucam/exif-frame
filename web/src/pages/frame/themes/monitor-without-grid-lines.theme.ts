import Photo from '../domain/photo';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height ? { bottom: image.width * 0.04 } : { bottom: image.height * 0.04 };
};

const monitorWithoutGridLines = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;
  const { focalLength, iso, aperture, shutterSpeed } = photo.toMetadata();
  const { bottom } = calculateMargin(image);

  canvas.width = image.width;
  canvas.height = image.height + bottom;

  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height + bottom);

  context.fillStyle = '#ffffff';
  context.drawImage(image, 0, 0, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.04 : image.height * 0.04;
  context.fillStyle = '#ffffff';
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(shutterSpeed.replace(/s/g, '') + (shutterSpeed.includes('/') ? '' : '"'), canvas.width / 5, canvas.height - bottom / 2);
  context.fillText(aperture.replace(/f/g, 'F'), (canvas.width / 5) * 2, canvas.height - bottom / 2);
  context.fillText(iso, (canvas.width / 5) * 3, canvas.height - bottom / 2);
  context.fillText(focalLength, (canvas.width / 5) * 4, canvas.height - bottom / 2);
};

export default monitorWithoutGridLines;
