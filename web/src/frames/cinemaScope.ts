import Photo from '../domain/photo';

export async function cinemaScope(photo: Photo) {
	const { canvas, context, image } = photo.forRender;

	const trimmedImageWidth = photo.width;
	const trimmedImageHeight = photo.width / 2.35;

	canvas.width = trimmedImageWidth;
	canvas.height = trimmedImageHeight * 1.311875;

	context.fillStyle = '#000000';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.drawImage(
		image,
		0,
		(image.height - trimmedImageHeight) / 2,
		trimmedImageWidth,
		trimmedImageHeight,
		0,
		(canvas.height - trimmedImageHeight) / 2,
		canvas.width,
		trimmedImageHeight
	);
}
