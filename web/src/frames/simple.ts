import Photo from '../domain/photo';

function calculateMargin(image: HTMLImageElement) {
	return {
		HORIZONTAL_MARGIN: image.width * 0.025,
		VERTICAL_MARGIN: image.width * 0.025,
		BOTTOM_MARGIN: image.width > image.height ? image.height * 0.08 : image.width * 0.08,
	};
}

const simpleFrame = (photo: Photo) => {
	const { canvas, context, image } = photo.forRender;

	const { HORIZONTAL_MARGIN, VERTICAL_MARGIN, BOTTOM_MARGIN } = calculateMargin(image);
	const FONT_FAMILY = 'Roboto, sans-serif';
	const FONT_SIZE = image.width > image.height ? image.height * 0.0275 : image.width * 0.02;
	const LINE_SPACING = image.width > image.height ? image.height * 0.005 : image.width * 0.0045; // 行間

	canvas.width = image.width + HORIZONTAL_MARGIN * 2;
	canvas.height = image.height + VERTICAL_MARGIN * 2 + BOTTOM_MARGIN;

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(image, HORIZONTAL_MARGIN, VERTICAL_MARGIN, image.width, image.height);

	const textVerticalCenter = canvas.height - (BOTTOM_MARGIN + VERTICAL_MARGIN * 2) / 2;
	const upperTextHeight = textVerticalCenter - LINE_SPACING;

	const { cameraMaker, cameraModel, lensModel, focalLength, iso, aperture, shutterSpeed } = photo.toMetadata();

	context.fillStyle = '#000000';
	context.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(`${cameraMaker} ${cameraModel} ${lensModel}`, canvas.width / 2, upperTextHeight);

	context.fillStyle = '#747474';
	context.font = `${FONT_SIZE * 0.8}px ${FONT_FAMILY}`;
	context.fillText(`${focalLength} ${aperture} ${shutterSpeed} ${iso}`, canvas.width / 2, textVerticalCenter + LINE_SPACING + FONT_SIZE);
};

export default simpleFrame;
