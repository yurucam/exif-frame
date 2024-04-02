import exifReader, { ExifTags, PngTags } from 'exifreader';

class Photo {
  private readonly file: File;
  private readonly image: HTMLImageElement;
  private readonly metadata: ExifTags & PngTags;

  private readonly _canvas: HTMLCanvasElement;

  private constructor(file: File, image: HTMLImageElement, metadata: ExifTags & PngTags) {
    this.file = file;
    this.image = image;
    this.metadata = metadata;

    this._canvas = document.createElement('canvas');
    this._canvas.style.display = 'none';
    document.body.appendChild(this._canvas);

    console.log(this.metadata);
  }

  public static async create(file: File): Promise<Photo> {
    return new Promise<Photo>((resolve) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = async () => {
        resolve(new Photo(file, image, (await exifReader.load(file)) as ExifTags & PngTags)); // ! Do not remove `await` here
      };
    });
  }

  public toBlob(): Promise<Blob> {
    const isWebp = localStorage.getItem('exportToWebp') === 'yes';
    const fixMajorAxisLength = Number(localStorage.getItem('fixMajorAxisLength'));
    const tempCanvas = document.createElement('canvas');
    const originalWidth = this._canvas.width;
    const originalHeight = this._canvas.height;
    tempCanvas.width = fixMajorAxisLength || originalWidth;
    tempCanvas.height = fixMajorAxisLength ? (originalHeight * fixMajorAxisLength) / originalWidth : originalHeight;
    const tempContext = tempCanvas.getContext('2d')!;
    tempContext.drawImage(this._canvas, 0, 0, tempCanvas.width, tempCanvas.height);
    return new Promise<Blob>((resolve) => {
      tempCanvas.toBlob(
        (blob) => {
          resolve(blob!);
        },
        isWebp ? 'image/webp' : 'image/jpeg',
        Number(localStorage.getItem('quality')) / 100
      );
    });
  }

  public toDataURL(): string {
    const isWebp = localStorage.getItem('exportToWebp') === 'yes';
    const fixMajorAxisLength = Number(localStorage.getItem('fixMajorAxisLength'));
    const tempCanvas = document.createElement('canvas');
    const originalWidth = this._canvas.width;
    const originalHeight = this._canvas.height;
    tempCanvas.width = fixMajorAxisLength || originalWidth;
    tempCanvas.height = fixMajorAxisLength ? (originalHeight * fixMajorAxisLength) / originalWidth : originalHeight;
    const tempContext = tempCanvas.getContext('2d')!;
    tempContext.drawImage(this._canvas, 0, 0, tempCanvas.width, tempCanvas.height);
    return tempCanvas.toDataURL(isWebp ? 'image/webp' : 'image/jpeg', Number(localStorage.getItem('quality')) / 100);
  }

  public toMetadata() {
    return {
      cameraMaker: localStorage.getItem('showCameraMaker') === 'no' ? '' : localStorage.getItem('cameraMaker') || this.cameraMaker,
      cameraModel: localStorage.getItem('showCameraModel') === 'no' ? '' : localStorage.getItem('cameraModel') || this.cameraModel,
      lensModel: localStorage.getItem('showLensModel') === 'no' ? '' : localStorage.getItem('lensModel') || this.lensModel,
      focalLength: this.focalLength,
      iso: this.iso,
      aperture: this.aperture,
      shutterSpeed: this.shutterSpeed,
      capturedAt: this.capturedAt,
      // EV = log2(N^2 / t) where N is the relative aperture and t is the shutter speed in seconds, assuming ISO = 100.
      ev: Math.log2(
        (Math.pow(Number(this.metadata.FNumber?.description?.split('/')[1]), 2) /
          (Number(this.metadata.ExposureTime?.description?.split('/')[0]) /
            Number(this.metadata.ExposureTime?.description?.split('/')[1]))) *
          (Number(this.metadata.ISOSpeedRatings?.value) / 100)
      ),
    };
  }

  public destroy(): void {
    document.body.removeChild(this._canvas);
    URL.revokeObjectURL(this.image.src);
  }

  public get forRender() {
    const canvas = this._canvas;
    const context = canvas.getContext('2d')!;
    const image = this.image;

    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;

    return { canvas, context, image };
  }

  public get previewImage(): HTMLImageElement {
    return this.image;
  }

  public get name(): string {
    return this.file.name;
  }

  public get width(): number {
    return this.image.width;
  }

  public get height(): number {
    return this.image.height;
  }

  public get cameraMaker(): string {
    return this.metadata.Make?.description ?? '?';
  }

  public get cameraModel(): string {
    return this.metadata.Model?.description ?? '?';
  }

  public get lensModel(): string {
    return this.metadata.LensModel?.description ?? '?';
  }

  public get focalLength(): string {
    const focalLength = Number(this.metadata.FocalLength?.description?.split('mm')?.shift());
    if (isNaN(focalLength)) return '?mm';
    return `${focalLength.toFixed(0)}mm`;
  }

  public get iso(): string {
    const iso = this.metadata.ISOSpeedRatings?.value;
    if (iso === undefined || isNaN(iso)) return `ISO?`;
    return `ISO${iso}`;
  }

  public get aperture(): string {
    return `${this.metadata.FNumber?.description ?? 'f/?'}`;
  }

  public get shutterSpeed(): string {
    return `${this.metadata.ExposureTime?.description || '?'}s`;
  }

  public get contrast(): string {
    const contrast = this.metadata.Contrast?.value;
    if (contrast === undefined || isNaN(contrast)) return '?';
    if (contrast >= 0) return `+${contrast.toFixed(1)}`;
    return contrast.toFixed(1);
  }

  public get capturedAt(): string {
    if (!this.metadata.CreateDate?.description) return '?';
    const date = new Date(this.metadata.CreateDate?.description);
    // like Jun 9, 2023 at 07:25:57PM
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.toLocaleString('en-US', { day: 'numeric' });
    const year = date.toLocaleString('en-US', { year: 'numeric' });
    const hour = (date.getHours() % 12).toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const isPM = date.getHours() >= 12;
    return `${month} ${day}, ${year} at ${hour}:${minute}:${second}${isPM ? 'PM' : 'AM'}`;
  }
}

export default Photo;
