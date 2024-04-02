import Photo from '../domain/photo';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height
    ? { top: image.width * 0.05, right: image.width * 0.05, bottom: image.width * 0.05 * 2, left: image.width * 0.05 }
    : { top: image.height * 0.05, right: image.height * 0.05, bottom: image.height * 0.05 * 2, left: image.height * 0.05 };
};

const insideFrame = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;
  const { cameraModel, lensModel, focalLength, iso, aperture, shutterSpeed } = photo.toMetadata();
  const { bottom } = calculateMargin(image);

  canvas.width = image.width;
  canvas.height = image.height;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(image, 0, 0, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.035 : image.height * 0.035;
  context.fillStyle = '#ffffff';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(
    [cameraModel, lensModel].filter(Boolean).join(' | '),
    canvas.width / 2,
    canvas.height - bottom / 2 - fontSize / 2 - fontSize / 7
  );
  context.fillText(
    [focalLength, aperture, iso, shutterSpeed].filter(Boolean).join(' | '),
    canvas.width / 2,
    canvas.height - bottom / 2 + fontSize / 2 + fontSize / 7
  );
};

export default insideFrame;
