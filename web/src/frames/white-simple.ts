import Photo from '../domain/photo';

export async function whiteSimpleFrame(photo: Photo) {
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
			context.fillText(`${photo.focalLength} ${photo.aperture} ${photo.shutterSpeed} ${photo.iso}`, 60, image.height - 120);

			const data = canvas.toDataURL('image/jpeg');
			const a = document.createElement('a');
			a.href = data;
			a.download = photo.name;
			a.click();

			await new Promise((resolve) => setTimeout(resolve, 1000));

			resolve();
		};
	});
}
