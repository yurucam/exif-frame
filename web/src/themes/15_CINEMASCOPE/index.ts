import Photo from '../../core/photo';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption } from '../../pages/theme/types/theme-option';
import { MAX_SIZE } from '../../core/drawing/sandbox';

const CINEMASCOPE_OPTIONS: ThemeOption[] = [];

const CINEMASCOPE_FUNC: ThemeFunc = (photo: Photo) => {
  const canvas = document.createElement('canvas');

  canvas.width = MAX_SIZE;
  canvas.height = MAX_SIZE * (1 / 2.35) * 1.311875;

  const letterbox = (canvas.height - MAX_SIZE * (1 / 2.35)) / 2;
  const ratio = photo.image.height / photo.image.width;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(photo.image, 0, 0, photo.image.width, photo.image.height, 0, -(canvas.width * ratio - canvas.height) / 2, canvas.width, canvas.width * ratio);
  ctx.fillRect(0, 0, canvas.width, letterbox);
  ctx.fillRect(0, canvas.height - letterbox, canvas.width, letterbox);

  return canvas;
};

export { CINEMASCOPE_FUNC, CINEMASCOPE_OPTIONS };
