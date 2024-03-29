import exifReader, { ExifTags, PngTags } from 'exifreader';

export class Photo {
	private readonly file: File;
	private readonly metadata: ExifTags & PngTags;

	private constructor(file: File, metadata: ExifTags & PngTags) {
		this.file = file;
		this.metadata = metadata;
	}

	public static async create(file: File): Promise<Photo> {
		return new Photo(file, (await exifReader.load(file)) as ExifTags & PngTags); // ! Do not remove `await` here
	}

	public get url(): string {
		return URL.createObjectURL(this.file);
	}

	public get name(): string {
		return this.file.name;
	}

	public get width(): number {
		return this.metadata['Image Width']?.value ?? 0;
	}

	public get height(): number {
		return this.metadata['Image Height']?.value ?? 0;
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
		return `${this.metadata.FocalLength?.description.split(' ')[0] ?? '?'}mm`;
	}

	public get iso(): string {
		return `ISO${this.metadata.ISOSpeedRatings?.value ?? '?'}`;
	}

	public get f(): string {
		return `${this.metadata.FNumber?.description ?? 'f/?'}`;
	}

	public get shutterSpeed(): string {
		return `${this.metadata.ShutterSpeedValue?.description ?? '?'}s`;
	}
}
