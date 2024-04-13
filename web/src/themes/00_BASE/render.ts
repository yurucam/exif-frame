import Photo from '../../core/photo';
import resizeCanvas from '../../core/resize-canvas';
import { Store } from '../../store';
import { ThemeFunc, ThemeOptionInput } from './type';

const render = async (func: ThemeFunc, photo: Photo, option: ThemeOptionInput, store: Store): Promise<HTMLCanvasElement> => {
  let canvas = func(photo, option, store);

  if (store.fixWatermark && store.watermark) {
    const context = canvas.getContext('2d')!;
    const fontSize = 100;
    context.fillStyle = '#ffffff';
    context.shadowColor = '#000000';
    context.shadowBlur = 10;
    context.lineWidth = 5;
    context.font = `normal 500 ${fontSize}px Barlow`;
    context.textAlign = 'right';
    context.textBaseline = 'bottom';
    context.fillText(store.watermark, canvas.width - fontSize / 2, canvas.height - fontSize / 2);
    context.shadowBlur = 0;
  }

  if (canvas.width > canvas.height) {
    if (store.fixImageWidth && store.imageWidth) {
      const targetWidth = store.imageWidth > 4096 ? 4096 : store.imageWidth;
      const targetHeight = (targetWidth * canvas.height) / canvas.width;
      canvas = resizeCanvas(canvas, targetWidth, targetHeight);
    } else {
      const targetWidth = photo.image.width > 4096 ? 4096 : photo.image.width;
      const targetHeight = (targetWidth * canvas.height) / canvas.width;
      canvas = resizeCanvas(canvas, targetWidth, targetHeight);
    }
  } else {
    if (store.fixImageWidth && store.imageWidth) {
      const targetHeight = store.imageWidth > 4096 ? 4096 : store.imageWidth; // This is a naming bug
      const targetWidth = (targetHeight * canvas.width) / canvas.height;
      canvas = resizeCanvas(canvas, targetWidth, targetHeight);
    } else {
      const targetHeight = photo.image.height > 4096 ? 4096 : photo.image.height;
      const targetWidth = (targetHeight * canvas.width) / canvas.height;
      canvas = resizeCanvas(canvas, targetWidth, targetHeight);
    }
  }

  return canvas;
};

export default render;
