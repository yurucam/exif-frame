import Photo from '../core/photo';
import resizeCanvas from '../core/resize-canvas';

type UserCustomOptions = {
  watermark?: string;
  imageWidth?: number;
  showCameraMaker?: boolean;
  showCameraModel?: boolean;
  showLensModel?: boolean;
  overrideCameraMaker?: string;
  overrideCameraModel?: string;
  overrideLensModel?: string;
};

type Theme = (photo: Photo, options: UserCustomOptions) => Promise<HTMLCanvasElement>;

const createCanvas = (
  image: HTMLImageElement,
  options?: {
    paddingBasedOn?: 'auto' | 'auto-inverse' | 'width' | 'height';
    fontSizePercent?: number;
    backgroundColor?: string;
    paddingTopPercent?: number;
    paddingBottomPercent?: number;
    paddingLeftPercent?: number;
    paddingRightPercent?: number;
  }
): {
  canvas: HTMLCanvasElement;
  fontSize: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
} => {
  const { paddingBasedOn, backgroundColor = '#ffffff' } = options || {};

  let {
    fontSizePercent: fontSize = 0,
    paddingTopPercent: paddingTop = 0,
    paddingBottomPercent: paddingBottom = 0,
    paddingLeftPercent: paddingLeft = 0,
    paddingRightPercent: paddingRight = 0,
  } = options || {};

  const maxSize =
    paddingBasedOn === 'auto'
      ? image.width > image.height
        ? image.width
        : image.height
      : paddingBasedOn === 'auto-inverse'
      ? image.width < image.height
        ? image.width
        : image.height
      : paddingBasedOn === 'width'
      ? image.width
      : image.height;

  let imageWidth = image.width;
  let imageHeight = image.height;

  paddingTop = (maxSize / 100) * paddingTop;
  paddingBottom = (maxSize / 100) * paddingBottom;
  paddingLeft = (maxSize / 100) * paddingLeft;
  paddingRight = (maxSize / 100) * paddingRight;

  const width = image.width + paddingLeft + paddingRight;
  const height = image.height + paddingTop + paddingBottom;

  if (width > height && width > 4096) {
    const targetWidth = 4096 - paddingLeft - paddingRight;
    imageHeight = (image.height * targetWidth) / image.width;
    imageWidth = targetWidth;
  }

  if (height > width && height > 4096) {
    const targetHeight = 4096 - paddingTop - paddingBottom;
    imageWidth = (image.width * targetHeight) / image.height;
    imageHeight = targetHeight;
  }

  const canvas = document.createElement('canvas');
  canvas.width = imageWidth + paddingLeft + paddingRight;
  canvas.height = imageHeight + paddingTop + paddingBottom;
  fontSize = ((canvas.width > canvas.height ? canvas.height : canvas.width) / 100) * fontSize;

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, image.width, image.height, paddingLeft, paddingTop, imageWidth, imageHeight);

  return {
    canvas,
    fontSize,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  };
};

const draw = async (theme: Theme, photo: Photo, options: UserCustomOptions): Promise<HTMLCanvasElement> => {
  let canvas = await theme(photo, options);

  if (options.watermark) {
    const context = canvas.getContext('2d')!;

    const fontSize = canvas.height > canvas.width ? canvas.width * 0.03 : canvas.height * 0.03;

    context.globalAlpha = 0.5;
    context.fillStyle = '#ffffff';
    context.shadowColor = '#000000';
    context.shadowBlur = 10;
    context.lineWidth = 5;
    context.font = `normal 500 ${fontSize}px Barlow`;
    context.textAlign = 'right';
    context.textBaseline = 'bottom';
    context.fillText(options.watermark, canvas.width - fontSize / 2, canvas.height - fontSize / 2);
    context.shadowBlur = 0;
    context.globalAlpha = 1;
  }

  if (options.imageWidth) {
    canvas = resizeCanvas(
      canvas,
      options.imageWidth || canvas.width,
      options.imageWidth ? (canvas.height * options.imageWidth) / canvas.width : canvas.height
    );
  }

  return canvas;
};

export default draw;

export type { Theme };
export { createCanvas };
