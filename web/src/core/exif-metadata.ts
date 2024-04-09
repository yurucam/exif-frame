import { Tags } from 'exifreader';

class ExifMetadata {
  public make: string | undefined;
  public model: string | undefined;
  public lensModel: string | undefined;
  public focalLength: string | undefined;
  public fNumber: string | undefined;
  public iso: string | undefined;
  public exposureTime: string | undefined;

  constructor(metadata: Tags) {
    console.log(metadata);
    this.make = metadata?.Make?.description;
    this.model = metadata?.Model?.description;
    this.lensModel = metadata?.LensModel?.description;
    this.focalLength = metadata?.FocalLength?.description?.replace(' mm', 'mm');
    this.fNumber = metadata?.FNumber?.description;
    this.iso = metadata?.ISOSpeedRatings?.value?.toString();
    this.exposureTime = metadata?.ExposureTime?.description;
  }
}

export default ExifMetadata;
