import Photo from '../domain/photo';

const noFrame = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;

  canvas.width = image.width;
  canvas.height = image.height;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(image, 0, 0, image.width, image.height);
};

export default noFrame;
