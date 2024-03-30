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
		return new Promise<Blob>((resolve) => {
			this._canvas.toBlob(
				(blob) => {
					resolve(blob!);
				},
				isWebp ? 'image/webp' : 'image/jpeg',
				0.92
			);
		});
	}

	public toDataURL(): string {
		const isWebp = localStorage.getItem('exportToWebp') === 'yes';
		return this._canvas.toDataURL(isWebp ? 'image/webp' : 'image/jpeg', 0.92);
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
		return `${this.metadata.FocalLength?.description.split(' ')[0] ?? '?'}mm`;
	}

	public get iso(): string {
		return `ISO${this.metadata.ISOSpeedRatings?.value ?? '?'}`;
	}

	public get aperture(): string {
		return `${this.metadata.FNumber?.description ?? 'f/?'}`;
	}

	public get shutterSpeed(): string {
		return `${this.metadata.ShutterSpeedValue?.description ?? '?'}s`;
	}
}

export default Photo;
