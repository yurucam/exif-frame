import Photo from '../domain/photo';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height
    ? { top: 0, right: 0, bottom: image.width * 0.05 * 2, left: 0 }
    : { top: 0, right: 0, bottom: image.height * 0.05 * 2, left: 0 };
};

const compactFrame = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;
  const { cameraModel, lensModel, focalLength, iso, aperture, shutterSpeed } = photo.toMetadata();
  const { top, right, bottom, left } = calculateMargin(image);

  canvas.width = image.width + left + right;
  canvas.height = image.height + top + bottom;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(image, left, top, image.width, image.height);

  const fontSize = image.height > image.width ? image.width * 0.025 : image.height * 0.025;
  context.fillStyle = '#000000';
  context.font = `italic 400 ${fontSize}px Barlow`;
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  context.fillText(
    [cameraModel, lensModel, focalLength, aperture, iso, shutterSpeed].filter(Boolean).join(' | '),
    canvas.width - fontSize,
    canvas.height - bottom / 2
  );
};

export default compactFrame;
