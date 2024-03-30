import Photo from '../domain/photo';

function calculateMargin(image: HTMLImageElement) {
	if (image.width < image.height) {
		return {
			HORIZONTAL_MARGIN: (image.height + image.height * 0.025 * 2 - image.width) / 2,
			VERTICAL_MARGIN: image.width * 0.025,
			BOTTOM_MARGIN: image.height * 0.05,
		};
	} else {
		return {
			HORIZONTAL_MARGIN: image.width * 0.025,
			VERTICAL_MARGIN: (image.width + image.width * 0.025 * 2 - image.height) / 2,
			BOTTOM_MARGIN: image.width * 0.06,
		};
	}
}

export async function squareFrame(photo: Photo) {
	const { canvas, context, image } = photo.forRender;

	const { HORIZONTAL_MARGIN, VERTICAL_MARGIN, BOTTOM_MARGIN } = calculateMargin(image);
	const FONT_FAMILY = 'Roboto, sans-serif';
	const FONT_SIZE = image.width > image.height ? image.height * 0.0275 : image.width * 0.02;
	const LINE_SPACING = image.width > image.height ? image.height * 0.005 : image.width * 0.0045;

	canvas.width = image.width + HORIZONTAL_MARGIN * 2;
	canvas.height = image.height + VERTICAL_MARGIN * 2 + BOTTOM_MARGIN;

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, HORIZONTAL_MARGIN, VERTICAL_MARGIN, image.width, image.height);

	const textVerticalCenter = canvas.height - (BOTTOM_MARGIN + VERTICAL_MARGIN * 2) / 2;
	const upperTextHeight = textVerticalCenter - LINE_SPACING;

	context.fillStyle = '#000000';
	context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(`${photo.cameraMaker} ${photo.cameraModel} ${photo.lensModel}`, canvas.width / 2, upperTextHeight);

	context.fillStyle = '#747474';
	context.font = `${FONT_SIZE * 0.8}px ${FONT_FAMILY}`;
	context.fillText(
		`${photo.focalLength} ${photo.aperture} ${photo.shutterSpeed} ${photo.iso}`,
		canvas.width / 2,
		textVerticalCenter + LINE_SPACING + FONT_SIZE
	);
}
