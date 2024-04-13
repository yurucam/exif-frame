import Photo from './photo';

const createThumbnail = async (photo: Photo) => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 250;

  const ctx = canvas.getContext('2d')!;

  const { width, height } = photo.image;
  const aspectRatio = width / height;
  const targetWidth = canvas.width;
  const targetHeight = canvas.height;
  const targetAspectRatio = targetWidth / targetHeight;
  let drawWidth = width;
  let drawHeight = height;
  let drawX = 0;
  let drawY = 0;
  if (aspectRatio > targetAspectRatio) {
    drawWidth = height * targetAspectRatio;
    drawX = (width - drawWidth) / 2;
  } else {
    drawHeight = width / targetAspectRatio;
    drawY = (height - drawHeight) / 2;
  }
  ctx.drawImage(photo.image, drawX, drawY, drawWidth, drawHeight, 0, 0, canvas.width, canvas.height);

  const thumbnail = canvas.toDataURL('image/jpeg');
  canvas.width = 0;
  canvas.height = 0;
  canvas.remove();
  return thumbnail;
};

export default createThumbnail;
