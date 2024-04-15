import { Tags } from 'exifreader';

class ExifMetadata {
  public make: string | undefined;
  public model: string | undefined;
  public lensModel: string | undefined;
  public focalLength: string | undefined;
  public focalLengthIn35mm: string | undefined;
  public fNumber: string | undefined;
  public iso: string | undefined;
  public exposureTime: string | undefined;
  public thumbnail: string | undefined;

  constructor(metadata: Tags) {
    console.log(metadata);
    this.make = metadata?.Make?.description;
    this.model = metadata?.Model?.description;
    this.lensModel = this.model ? metadata?.LensModel?.description?.replace(this.model, '')?.trim() : metadata?.LensModel?.description;
    this.focalLength = metadata?.FocalLength?.description?.replace(' mm', 'mm');
    this.focalLengthIn35mm = `${metadata?.FocalLengthIn35mmFilm?.value}mm`;
    this.fNumber = metadata?.FNumber?.description?.substring(0, 5); // substring f/x.xxxx to f/x.x
    this.iso = metadata?.ISOSpeedRatings?.value?.toString();
    this.exposureTime = metadata?.ExposureTime?.description;
    this.thumbnail = metadata?.Thumbnail?.base64 ? 'data:image/jpg;base64,' + metadata?.Thumbnail?.base64 : undefined;
  }
}

export default ExifMetadata;
