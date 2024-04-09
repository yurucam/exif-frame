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

type Theme = (photo: Photo, image: HTMLImageElement, options: UserCustomOptions) => Promise<HTMLCanvasElement>;

const draw = async (theme: Theme, photo: Photo, options: UserCustomOptions): Promise<HTMLCanvasElement> => {
  const url = URL.createObjectURL(photo.file);
  const image = new Image();
  image.src = url;
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  let canvas = await theme(photo, image, options);

  if (options.watermark) {
    const context = canvas.getContext('2d')!;

    const fontSize = canvas.height > canvas.width ? canvas.width * 0.03 : canvas.height * 0.03;

    context.fillStyle = '#ffffff';
    context.shadowColor = '#000000';
    context.shadowBlur = 10;
    context.lineWidth = 5;
    context.font = `normal 500 ${fontSize}px Barlow`;
    context.textAlign = 'right';
    context.textBaseline = 'bottom';
    context.fillText(options.watermark, canvas.width - fontSize / 2, canvas.height - fontSize / 2);
    context.shadowBlur = 0;
  }

  if (options.imageWidth) {
    canvas = resizeCanvas(
      canvas,
      options.imageWidth || canvas.width,
      options.imageWidth ? (canvas.height * options.imageWidth) / canvas.width : canvas.height
    );
  }

  URL.revokeObjectURL(url); // Free up memory

  return canvas;
};

export default draw;

export type { Theme };
