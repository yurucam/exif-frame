import Photo from '../domain/photo';

const calculateMargin = (image: HTMLImageElement) => {
	return image.width > image.height
		? { top: 0, right: 0, bottom: image.width * 0.04 * 2, left: 0 }
		: { top: 0, right: 0, bottom: image.height * 0.04 * 2, left: 0 };
};

const strapFrame = (photo: Photo) => {
	const { canvas, context, image } = photo.forRender;
	const { cameraModel, lensModel, focalLength, iso, aperture, shutterSpeed, capturedAt } = photo.toMetadata();
	const { top, right, bottom, left } = calculateMargin(image);

	canvas.width = image.width + left + right;
	canvas.height = image.height + top + bottom;

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.drawImage(image, left, top, image.width, image.height);

	const fontSize = image.height > image.width ? image.width * 0.025 : image.height * 0.025;
	context.fillStyle = '#000000';
	context.font = `normal 500 ${fontSize}px Barlow`;
	context.textAlign = 'left';
	context.textBaseline = 'middle';
	context.fillText([iso, aperture, shutterSpeed].filter(Boolean).join(' '), fontSize, canvas.height - bottom / 2 - fontSize / 1.8);

	context.fillStyle = '#808080';
	context.font = `normal 300 ${fontSize}px Barlow`;
	context.textAlign = 'left';
	context.textBaseline = 'middle';
	context.fillText([capturedAt === '?' ? '' : capturedAt].filter(Boolean).join(' '), fontSize, canvas.height - bottom / 2 + fontSize / 1.8);

	context.fillStyle = '#000000';
	context.font = `normal 500 ${fontSize}px Barlow`;
	context.textAlign = 'right';
	context.textBaseline = 'middle';
	context.fillText([cameraModel].filter(Boolean).join(' '), canvas.width - fontSize, canvas.height - bottom / 2 - fontSize / 1.8);

	context.fillStyle = '#808080';
	context.font = `normal 300 ${fontSize}px Barlow`;
	context.textAlign = 'right';
	context.textBaseline = 'middle';
	context.fillText(
		[lensModel, focalLength].filter(Boolean).join(' '),
		canvas.width - fontSize,
		canvas.height - bottom / 2 + fontSize / 1.8
	);
};

export default strapFrame;
