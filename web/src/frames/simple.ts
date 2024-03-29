import Photo from '../domain/photo';

function calculateMargin(photo: Photo) {
	return {
		HORIZONTAL_MARGIN: photo.width * 0.025,
		VERTICAL_MARGIN: photo.width * 0.025,
		BOTTOM_MARGIN: photo.width > photo.height ? photo.height * 0.08 : photo.width * 0.08,
	};
}

export async function simpleFrame(photo: Photo) {
	return new Promise<void>((resolve) => {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement;
		const context = canvas.getContext('2d') as CanvasRenderingContext2D;

		const image = new Image();
		image.src = photo.url;
		image.onload = async () => {
			const { HORIZONTAL_MARGIN, VERTICAL_MARGIN, BOTTOM_MARGIN } = calculateMargin(photo);
			const FONT_FAMILY = 'Roboto, sans-serif';
			const FONT_SIZE = photo.width > photo.height ? photo.height * 0.0275 : photo.width * 0.02;
			const LINE_SPACING = photo.width > photo.height ? photo.height * 0.005 : photo.width * 0.0045; // 行間

			canvas.width = photo.width + HORIZONTAL_MARGIN * 2;
			canvas.height = photo.height + VERTICAL_MARGIN * 2 + BOTTOM_MARGIN;

			context.fillStyle = '#ffffff';
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.drawImage(image, HORIZONTAL_MARGIN, VERTICAL_MARGIN, photo.width, photo.height);

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
