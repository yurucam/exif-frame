import Photo from '../domain/photo';

const calculateImageSize = (photo: Photo) => {
  if (photo.width > photo.height) {
    return {
      width: photo.height * (4 / 5),
      height: photo.height,
    };
  }
  return {
    width: photo.width * (4 / 5),
    height: photo.width,
  };
};

const instagramFrame = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;
  const { cameraModel, lensModel, focalLength, iso, aperture, shutterSpeed } = photo.toMetadata();
  const { width, height } = calculateImageSize(photo);

  canvas.width = width;
  canvas.height = height;

  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(
    image,
    (image.width - width) / 2,
    (image.height - height) / 2,
    width,
    height,
    (canvas.width - width) / 2,
    (canvas.height - height) / 2,
    canvas.width,
    height
  );

  const fontSize = image.height > image.width ? image.width * 0.02 : image.height * 0.02;
  context.fillStyle = '#ffffff';
  context.font = `normal 200 ${fontSize}px Barlow`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(
    [cameraModel, lensModel, focalLength, aperture, iso, shutterSpeed].filter(Boolean).join(' | '),
    canvas.width / 2,
    canvas.height - fontSize
  );
};

export default instagramFrame;
