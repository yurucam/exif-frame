import { Theme, createCanvas } from './draw';

const polaroid: Theme = async (photo) => {
  const { canvas } = createCanvas(photo.image, {
    paddingTopPercent: 2,
    paddingBottomPercent: 15,
    paddingLeftPercent: 2,
    paddingRightPercent: 2,
  });

  return canvas;
};

export default polaroid;
