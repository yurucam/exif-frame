import { load } from 'exifreader';
import ExifMetadata from './exif-metadata/exif-metadata';
import thumbnail from './drawing/thumbnail';

/**
 * Represents a photo.
 */
class Photo {
  private constructor() {}

  public file!: File;
  public metadata!: ExifMetadata;
  public image!: HTMLImageElement;
  public thumbnail!: string;

  /**
   * Creates a photo.
   * @param file - The file to create a photo from.
   * @returns The created photo.
   * @example
   * ```typescript
   * const photo = await Photo.create(file);
   * ```
   */
  public static async create(file: File): Promise<Photo> {
    const photo = new Photo();
    photo.file = file;
    photo.metadata = new ExifMetadata(await load(file));
    photo.image = new Image();
    photo.image.src = URL.createObjectURL(file);
    await new Promise((resolve) => (photo.image.onload = resolve));
    photo.thumbnail = thumbnail(photo, 300, 250);
    return photo;
  }

  /**
   * Returns the make of the camera that took the photo.
   * @example 'SONY'
   */
  public get make(): string {
    if (localStorage.getItem('showCameraMaker') === 'false') return '';
    return localStorage.getItem('overrideCameraMaker') || this.metadata.make || '';
  }

  /**
   * Returns the model of the camera that took the photo.
   * @example 'ILCE-7M3'
   */
  public get model(): string {
    if (localStorage.getItem('showCameraModel') === 'false') return '';
    return localStorage.getItem('overrideCameraModel') || this.metadata.model || '';
  }

  /**
   * Returns the lens model of the camera that took the photo.
   * @example 'FE 24-105mm F4 G OSS'
   */
  public get lensModel(): string {
    if (localStorage.getItem('showLensModel') === 'false') return '';
    return localStorage.getItem('overrideLensModel') || this.metadata.lensModel || '';
  }

  /**
   * Returns the focal length of the camera that took the photo.
   * @example '24mm'
   */
  public get focalLength(): string {
    if (localStorage.getItem('focalLengthRatioMode') === 'true') {
      const focalLength = parseFloat(this.metadata?.focalLength?.replace(' mm', '') || '0');
      return (focalLength * parseFloat(localStorage.getItem('focalLengthRatio') || '1')).toFixed(0) + 'mm';
    }
    return localStorage.getItem('focalLength35mmMode') === 'false' ? this.metadata.focalLength || '' : this.metadata.focalLengthIn35mm || '';
  }

  /**
   * Returns the F number of the camera that took the photo.
   * @example 'F4'
   */
  public get fNumber(): string {
    return this.metadata.fNumber || '';
  }

  /**
   * Returns the ISO of the camera that took the photo.
   * @example 'ISO100'
   */
  public get iso(): string {
    return this.metadata.iso || '';
  }

  /**
   * Returns the exposure time of the camera that took the photo.
   * @example '1/100s'
   */
  public get exposureTime(): string {
    return this.metadata.exposureTime || '';
  }

  /**
   * Returns the date the photo was taken.
   * @example '2021-01-01T00:00:00.000+09:00'
   */
  public get takenAt(): string {
    return this.metadata.takenAt || '';
  }
}

export default Photo;
