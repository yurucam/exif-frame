import Photo from '../domain/photo';

export async function noFrame(photo: Photo) {
	return new Promise<void>((resolve) => {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const context = canvas.getContext('2d') as CanvasRenderingContext2D;

		const image = new Image();
		image.src = photo.url;
		image.onload = async () => {
			canvas.width = image.width;
			canvas.height = image.height;

			context.fillStyle = '#ffffff';
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.drawImage(image, 0, 0, image.width, image.height);

			const data = canvas.toDataURL(localStorage.getItem('exportToWebp') === 'yes' ? 'image/webp' : 'image/jpeg');
			const a = document.createElement('a');
			a.href = data;
			a.download = localStorage.getItem('exportToWebp') === 'yes' ? photo.name.replace(/\.[^/.]+$/, '.webp') : photo.name;
			a.click();

			await new Promise((resolve) => setTimeout(resolve, 1000));

			resolve();
		};
	});
}
