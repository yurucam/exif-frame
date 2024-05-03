import Photo from '../../../../core/photo';

const SIMPLE_FUNC = (
  photos: Photo[],
  options: {
    backgroundColor: string;
    ratio: string;
    numberOfRow: number;
    numberOfColumn: number;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    marginEach: number;
  }
): HTMLCanvasElement => {
  const { backgroundColor, ratio, numberOfRow, numberOfColumn, paddingTop, paddingBottom, paddingLeft, paddingRight, marginEach } = options;

  const canvas = document.createElement('canvas');

  if (!ratio.includes(':')) return canvas;

  const MAX_SIZE = 4096;
  const ratioArray = ratio.split(':').map((value) => Number(value));
  if (ratioArray[0] > ratioArray[1]) {
    canvas.width = MAX_SIZE;
    canvas.height = Math.floor(MAX_SIZE * (ratioArray[1] / ratioArray[0]));
  } else {
    canvas.width = Math.floor(MAX_SIZE * (ratioArray[0] / ratioArray[1]));
    canvas.height = MAX_SIZE;
  }

  const context = canvas.getContext('2d')!;
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const width = (canvas.width - paddingLeft - paddingRight - marginEach * (numberOfColumn - 1)) / numberOfColumn;
  const height = (canvas.height - paddingTop - paddingBottom - marginEach * (numberOfRow - 1)) / numberOfRow;

  const size = numberOfRow * numberOfColumn;
  const length = Math.min(photos.length, size);

  for (let i = 0; i < length; i++) {
    // draw image with center crop
    const photo = photos[i];
    if (!photo) break;
    const image = photo.image;
    const x = paddingLeft + (i % numberOfColumn) * (width + marginEach);
    const y = paddingTop + Math.floor(i / numberOfColumn) * (height + marginEach);
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
  }

  return canvas;
};

export default SIMPLE_FUNC;
