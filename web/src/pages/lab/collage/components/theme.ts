import Photo from '../../../../core/photo';

const COLLAGE_FUNC = (photos: Photo[]): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');

  canvas.width = 4096;
  canvas.height = 4096;

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const length = photos.length;
  const size = Math.ceil(Math.sqrt(length));
  const margin = 30;

  const width = (canvas.width - margin * 2 - margin * (size - 1)) / size;
  const height = (canvas.height - margin * 2 - margin * (size - 1)) / size;

  for (let i = 0; i < length; i++) {
    // draw image with center crop
    const photo = photos[i];
    const image = photo.image;
    const x = margin + (i % size) * (width + margin);
    const y = margin + Math.floor(i / size) * (height + margin);
    const imageWidth = image.width;
    const imageHeight = image.height;
    const ratio = imageWidth / imageHeight;

    if (ratio > width / height) {
      const cropWidth = imageHeight * (width / height);
      context.drawImage(image, (imageWidth - cropWidth) / 2, 0, cropWidth, imageHeight, x, y, width, height);
    } else {
      const cropHeight = imageWidth * (height / width);
      context.drawImage(image, 0, (imageHeight - cropHeight) / 2, imageWidth, cropHeight, x, y, width, height);
    }

    // draw border
    context.strokeStyle = '#000000';
    context.lineWidth = 1;
    context.strokeRect(x, y, width, height);
  }

  return canvas;
};

export default COLLAGE_FUNC;
