import Photo from '../domain/photo';

const calculateLineWidth = (image: HTMLImageElement) => {
  return image.width > image.height ? image.width * 0.0005 : image.height * 0.0005;
};

const calculateMargin = (image: HTMLImageElement) => {
  return image.width > image.height ? { bottom: image.width * 0.04 } : { bottom: image.height * 0.04 };
};

const monitor = (photo: Photo) => {
  const { canvas, context, image } = photo.forRender;
  const { contrast, iso, aperture, shutterSpeed } = photo.toMetadata();
  const { bottom } = calculateMargin(image);

  canvas.width = image.width;
  canvas.height = image.height + bottom;

  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height + bottom);

  context.fillStyle = '#ffffff';
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

  const fontSize = image.height > image.width ? image.width * 0.04 : image.height * 0.04;
  context.fillStyle = '#ffffff';
  context.font = `normal 500 ${fontSize}px Barlow`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(shutterSpeed.replace(/s/g, ''), canvas.width / 5, canvas.height - bottom / 2);
  context.fillText(aperture.replace(/f/g, 'F'), (canvas.width / 5) * 2, canvas.height - bottom / 2);
  context.fillText(contrast, (canvas.width / 5) * 3, canvas.height - bottom / 2);
  context.fillText(iso, (canvas.width / 5) * 4, canvas.height - bottom / 2);
};

export default monitor;
