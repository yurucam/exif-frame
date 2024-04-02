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

const crop4x5 = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;

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
};

export default crop4x5;
