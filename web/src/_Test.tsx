import { useState } from 'react';
import { Photo } from './domain/photo';

export default function Test() {
	const [photoList, setPhotoList] = useState<Photo[]>([]);

	async function onFileUploaded({ target: { files } }: React.ChangeEvent<HTMLInputElement>) {
		if (!files) return;
		setPhotoList(await Promise.all(Array.from(files).map(Photo.create)));
	}

	async function generateAll() {
		for (const photo of photoList) {
			await generate(photo);
			console.log('Generated:', photo.name);
		}
	}

	async function generate(photo: Photo) {
		return new Promise<void>((resolve) => {
			const canvas = document.getElementById('canvas') as HTMLCanvasElement;
			const context = canvas.getContext('2d') as CanvasRenderingContext2D;

			const image = new Image();
			image.src = photo.url;
			image.onload = async () => {
				canvas.width = image.width;
				canvas.height = image.height;
				context.drawImage(image, 0, 0);

				context.font = '100px Arial';
				context.fillStyle = 'white';
				context.textAlign = 'left';
				context.fillText(`${photo.cameraMaker} ${photo.cameraModel} ${photo.lensModel}`, 60, image.height - 240);

				context.font = '100px Arial';
				context.fillStyle = 'gray';
				context.textAlign = 'left';
				context.fillText(`${photo.focalLength} ${photo.f} ${photo.shutterSpeed} ${photo.iso}`, 60, image.height - 120);

				const data = canvas.toDataURL('image/jpeg');
				const a = document.createElement('a');
				a.href = data;
				a.download = photo.name;
				a.click();

				await new Promise((resolve) => setTimeout(resolve, 100));

				resolve();
			};
		});
	}

	return (
		<>
			<input type="file" accept="image/*" multiple onChange={onFileUploaded} />

			<br />

			<button onClick={generateAll}>Generate All</button>

			<canvas id="canvas" width="0" height="0" style={{ display: 'none' }} />

			{photoList && (
				<div>
					<br />
					{Array.from(photoList).map((photo, index) => (
						<>
							<img key={index} src={photo.url} width={'100px'} />
							<br />
							{photo.name}
							<br />
							{photo.width} x {photo.height}
							<br />
							{photo.cameraMaker}
							<br />
							{photo.cameraModel}
							<br />
							{photo.lensModel}
							<br />
							{photo.focalLength}
							<br />
							{photo.iso}
							<br />
							{photo.f}
							<br />
							{photo.shutterSpeed}
							<br />
							<button onClick={() => generate(photo)}>Generate</button>
							<br />
							{index !== photoList.length - 1 && (
								<>
									{' '}
									<hr />
									<br />
								</>
							)}
						</>
					))}
				</div>
			)}
		</>
	);
}
