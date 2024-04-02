import Photo from '../domain/photo';

const calculateLineWidth = (image: HTMLImageElement) => {
  return image.width > image.height ? image.width * 0.0005 : image.height * 0.0005;
};

const gridLines = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;

  canvas.width = image.width;
  canvas.height = image.height;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(image, 0, 0, image.width, image.height);

  context.fillStyle = '#000000';
  context.lineWidth = calculateLineWidth(image);
  context.beginPath();
  for (let i = 1; i < 3; i++) {
    context.moveTo(0, (image.height / 3) * i);
    context.lineTo(image.width, (image.height / 3) * i);
    context.moveTo((image.width / 3) * i, 0);
    context.lineTo((image.width / 3) * i, image.height);
  }
  context.stroke();
};

export default gridLines;
