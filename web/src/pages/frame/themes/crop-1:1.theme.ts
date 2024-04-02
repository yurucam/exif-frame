import Photo from '../domain/photo';

const calculateImageSize = (photo: Photo) => {
  if (photo.width > photo.height) {
    return {
      width: photo.height,
      height: photo.height,
    };
  }
  return {
    width: photo.width,
    height: photo.width,
  };
};

const crop1x1 = (photo: Photo) => {
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

export default crop1x1;
