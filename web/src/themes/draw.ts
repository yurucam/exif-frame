import Photo from '../core/photo';
import resizeCanvas from '../core/resize-canvas';

type UserCustomOptions = {
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
