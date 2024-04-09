import { load } from 'exifreader';
import ExifMetadata from './exif-metadata';

/**
 * Represents a photo.
 */
class Photo {
  private constructor() {}

  public file!: File;
  private metadata!: ExifMetadata;

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
    return photo;
  }

  /**
   * Returns the make of the camera that took the photo.
   * @example 'SONY'
   */
  public get make(): string | undefined {
    return this.metadata.make;
  }

  /**
   * Sets the make of the camera that took the photo.
   * @example 'SONY'
   */
  public set make(value: string | undefined) {
    this.metadata.make = value;
  }

  /**
   * Returns the model of the camera that took the photo.
   * @example 'ILCE-7M3'
   */
  public get model(): string | undefined {
    return this.metadata.model;
  }

  /**
   * Sets the model of the camera that took the photo.
   * @example 'ILCE-7M3'
   */
  public set model(value: string | undefined) {
    this.metadata.model = value;
  }

  /**
   * Returns the lens model of the camera that took the photo.
   * @example 'FE 24-105mm F4 G OSS'
   */
  public get lensModel(): string | undefined {
    return this.metadata.lensModel;
  }

  /**
   * Sets the lens model of the camera that took the photo.
   * @example 'FE 24-105mm F4 G OSS'
   */
  public set lensModel(value: string | undefined) {
    this.metadata.lensModel = value;
  }

  /**
   * Returns the focal length of the camera that took the photo.
   * @example '24mm'
   */
  public get focalLength(): string | undefined {
    return this.metadata.focalLength;
  }

  /**
   * Sets the focal length of the camera that took the photo.
   * @example '24mm'
   */
  public set focalLength(value: string | undefined) {
    this.metadata.focalLength = value;
  }

  /**
   * Returns the F number of the camera that took the photo.
   * @example 'f/4'
   */
  public get fNumber(): string | undefined {
    return this.metadata.fNumber;
  }

  /**
   * Sets the F number of the camera that took the photo.
   * @example 'f/4'
   */
  public set fNumber(value: string | undefined) {
    this.metadata.fNumber = value;
  }

  /**
   * Returns the ISO of the camera that took the photo.
   * @example '100'
   */
  public get iso(): string | undefined {
    return this.metadata.iso;
  }

  /**
   * Sets the ISO of the camera that took the photo.
   * @example '100'
   */
  public set iso(value: string | undefined) {
    this.metadata.iso = value;
  }

  /**
   * Returns the exposure time of the camera that took the photo.
   * @example '1/100'
   */
  public get exposureTime(): string | undefined {
    return this.metadata.exposureTime;
  }

  /**
   * Sets the exposure time of the camera that took the photo.
   * @example '1/100'
   */
  public set exposureTime(value: string | undefined) {
    this.metadata.exposureTime = value;
  }
}

export default Photo;
