import Photo from '../domain/photo';

export async function cinemaScope(photo: Photo) {
	return new Promise<void>((resolve) => {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const context = canvas.getContext('2d') as CanvasRenderingContext2D;

		const image = new Image();
		image.src = photo.url;
		image.onload = async () => {
			const trimmedImageWidth = photo.width;
			const trimmedImageHeight = photo.width / 2.35;

			canvas.width = trimmedImageWidth;
			canvas.height = trimmedImageHeight * 1.311875;

			context.fillStyle = '#000000';
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.drawImage(
				image,
				0,
				(photo.height - trimmedImageHeight) / 2,
				trimmedImageWidth,
				trimmedImageHeight,
				0,
				(canvas.height - trimmedImageHeight) / 2,
				canvas.width,
				trimmedImageHeight
			);

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
