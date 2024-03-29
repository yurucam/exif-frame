import { useState } from 'react';
import { Photo } from './domain/photo';

export default function App() {
	const [photoList, setPhotoList] = useState<Photo[]>([]);

	async function onFileUploaded({ target: { files } }: React.ChangeEvent<HTMLInputElement>) {
		if (!files) return;
		setPhotoList(await Promise.all(Array.from(files).map(Photo.create)));
	}

	return (
		<>
			<input type="file" accept="image/*" multiple onChange={onFileUploaded} />

			{photoList && (
				<div>
					{Array.from(photoList).map((photo, index) => (
						<>
							<br />
							<img key={index} src={photo.url} width={'100px'} />
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
							<br />
							<hr />
						</>
					))}
				</div>
			)}
		</>
	);
}
