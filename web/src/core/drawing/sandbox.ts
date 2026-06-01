import Photo from '../photo';

export const MAX_SIZE = 4096; // Mobile Safari has a maximum canvas size of 4096x4096

interface SandboxOptions {
  backgroundColor: string;
  padding: { top: number; bottom: number; left: number; right: number };
  targetRatio: string;
  notCroppedMode: boolean;
  /** Soft drop shadow cast by the photo onto the mat (padding). 0 = off, 10 = strongest. Optional. */
  shadow?: number;
}

const sandbox = (photo: Photo, options: SandboxOptions): HTMLCanvasElement => {
  const { image } = photo;
  const { backgroundColor, padding, targetRatio, notCroppedMode, shadow = 0 } = options;
  const { top, bottom, left, right } = padding;

  // Draw the photo with a soft drop shadow onto the surrounding mat (the padding).
  // Blur and offset scale with the image and are clamped to the smallest mat, so the
  // shadow always fades out within the frame and never clips at the canvas edge.
  // No mat (padding 0, e.g. PADDING_INSIDE) => no shadow.
  const applyPhotoShadow = (ctx: CanvasRenderingContext2D, imageWidth: number): void => {
    const mat = Math.min(top, bottom, left, right);
    if (shadow <= 0 || mat <= 0) return;
    const s = Math.min(Math.max(shadow, 0), 10) / 10;
    const blur = Math.min(imageWidth * (0.03 + s * 0.12), mat * 0.45);
    ctx.shadowColor = `rgba(0, 0, 0, ${0.12 + s * 0.5})`;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetY = Math.min(blur * 0.6, Math.max(0, bottom - blur * 2));
  };

  const canvas = document.createElement('canvas');

  if (targetRatio === 'free') {
    let imageWidth = null;
    let imageHeight = null;

    if (image.width > image.height) {
      imageWidth = MAX_SIZE - left - right;
      imageHeight = (image.height / image.width) * imageWidth;
    } else {
      imageHeight = MAX_SIZE - top - bottom;
      imageWidth = (image.width / image.height) * imageHeight;
    }

    canvas.width = imageWidth + left + right;
    canvas.height = imageHeight + top + bottom;

    const context = canvas.getContext('2d')!;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.save();
    applyPhotoShadow(context, imageWidth);
    context.drawImage(image, left, top, imageWidth, imageHeight);
    context.restore();
  } else {
    const ratio = targetRatio.split(':').map((value) => Number(value));

    if (ratio.length !== 2) {
      throw new Error('Invalid target ratio');
    }

    if (ratio[0] <= 0 || ratio[1] <= 0) {
      throw new Error('Invalid target ratio');
    }

    if (ratio[0] > ratio[1]) {
      canvas.width = MAX_SIZE;
      canvas.height = (ratio[1] / ratio[0]) * MAX_SIZE;
    } else {
      canvas.width = (ratio[0] / ratio[1]) * MAX_SIZE;
      canvas.height = MAX_SIZE;
    }

    const context = canvas.getContext('2d')!;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!notCroppedMode) {
      if (image.width > image.height) {
        const imageHeight = canvas.height - top - bottom;
        const imageWidth = (image.width / image.height) * imageHeight;
        context.drawImage(image, 0, 0, image.width, image.height, (MAX_SIZE - imageWidth) / 2, top, imageWidth, imageHeight);
        context.fillRect(0, 0, left, canvas.height);
        context.fillRect(canvas.width - right, 0, right, canvas.height);
      }

      if (image.width < image.height) {
        const imageWidth = canvas.width - left - right;
        const imageHeight = (image.height / image.width) * imageWidth;
        context.drawImage(image, 0, 0, image.width, image.height, left, (MAX_SIZE - imageHeight) / 2, imageWidth, imageHeight);
        context.fillRect(0, 0, canvas.width, top);
        context.fillRect(0, canvas.height - bottom, canvas.width, bottom);
      }
    } else {
      if (ratio[0] > ratio[1]) {
        let imageHeight = canvas.height - top - bottom;
        let imageWidth = canvas.width - left - right;
        if (image.width / image.height > ratio[0] / ratio[1]) {
          imageHeight = (image.height / image.width) * imageWidth;
        } else {
          imageWidth = (image.width / image.height) * imageHeight;
        }
        context.save();
        applyPhotoShadow(context, imageWidth);
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          left + (canvas.width - left - right - imageWidth) / 2,
          top + (canvas.height - top - bottom - imageHeight) / 2,
          imageWidth,
          imageHeight
        );
        context.restore();
      } else {
        let imageWidth = canvas.width - left - right;
        let imageHeight = canvas.height - top - bottom;
        if (image.width / image.height > ratio[0] / ratio[1]) {
          imageHeight = (image.height / image.width) * imageWidth;
        } else {
          imageWidth = (image.width / image.height) * imageHeight;
        }
        context.save();
        applyPhotoShadow(context, imageWidth);
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          left + (canvas.width - left - right - imageWidth) / 2,
          top + (canvas.height - top - bottom - imageHeight) / 2,
          imageWidth,
          imageHeight
        );
        context.restore();
      }
    }
  }

  return canvas;
};

export default sandbox;
