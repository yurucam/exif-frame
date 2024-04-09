import { ExifTags, load } from 'exifreader';

/**
 * Represents a photo.
 * @example
 * ```typescript
 * const photo = await Photo.create(file);
 * console.log(photo.fileName); // 'IMG_20210101_123456.jpg'
 * console.log(photo.fileUrl); // 'blob:http://localhost:3000/12345678-1234-1234-1234-123456789012'
 * console.log(photo.make); // 'SONY'
 * console.log(photo.model); // 'ILCE-7M3'
 * console.log(photo.lensModel); // 'FE 24-105mm F4 G OSS'
 * console.log(photo.focalLength); // '24mm'
 * console.log(photo.fNumber); // 'f/4'
 * console.log(photo.iso); // '100'
 * console.log(photo.exposureTime); // '1/100'
 * ```
 */
class Photo {
  private constructor() {}

  public file!: File;
  private metadata!: ExifTags;

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
    photo.metadata = (await load(file)) as ExifTags;
    console.log(photo.metadata);
    return photo;
  }

  /**
   * Returns the make of the camera that took the photo.
   * @example 'SONY'
   */
  public get make(): string | undefined {
    return this.metadata?.Make?.description;
  }

  /**
   * Returns the model of the camera that took the photo.
   * @example 'ILCE-7M3'
   */
  public get model(): string | undefined {
    return this.metadata?.Model?.description;
  }

  /**
   * Returns the lens model of the camera that took the photo.
   * @example 'FE 24-105mm F4 G OSS'
   */
  public get lensModel(): string | undefined {
    return this.metadata?.LensModel?.description;
  }

  /**
   * Returns the focal length of the camera that took the photo.
   * @example '24mm'
   */
  public get focalLength(): string | undefined {
    return this.metadata?.FocalLength?.description?.replace(' mm', 'mm');
  }

  /**
   * Returns the F number of the camera that took the photo.
   * @example 'f/4'
   */
  public get fNumber(): string | undefined {
    return this.metadata?.FNumber?.description;
  }

  /**
   * Returns the ISO of the camera that took the photo.
   * @example '100'
   */
  public get iso(): string | undefined {
    return this.metadata?.ISOSpeedRatings?.value?.toString();
  }

  /**
   * Returns the exposure time of the camera that took the photo.
   * @example '1/100'
   */
  public get exposureTime(): string | undefined {
    return this.metadata?.ExposureTime?.description;
  }

  /**
   * Returns the date and time the photo was created.
   * @example '2021-01-01 12:34:56+09:00'
   */
  public get createdAt(): string | undefined {
    const yyyy_mm_dd = this.metadata['Digital Creation Date']?.description;
    const hh_mm_ss_z = this.metadata['Digital Creation Time']?.description;
    if (!yyyy_mm_dd || !hh_mm_ss_z) return undefined;
    return `${yyyy_mm_dd} ${hh_mm_ss_z}`;
  }
}

export default Photo;
