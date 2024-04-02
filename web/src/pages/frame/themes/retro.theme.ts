import Photo from '../domain/photo';

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height
    ? { top: image.width * 0.2, right: image.width * 0.2, bottom: image.width * 0.2, left: image.width * 0.2 }
    : { top: image.height * 0.2, right: image.height * 0.2, bottom: image.height * 0.2, left: image.height * 0.2 };
};

const retroFrame = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;
  const { top, right, bottom, left } = calculateMargin(image);

  canvas.width = image.width + left + right;
  canvas.height = image.height + top + bottom;

  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#ffffff';
  context.fillRect(top / 7, bottom / 7, canvas.width - (top / 7) * 2, canvas.height - (bottom / 7) * 2);

  context.drawImage(image, left, top, image.width, image.height);
};

export default retroFrame;
