import { Theme, createCanvas } from './draw';

const justFrame: Theme = async (photo) => {
  const { canvas } = createCanvas(photo.image, {
    paddingTopPercent: 5,
    paddingBottomPercent: 5,
    paddingLeftPercent: 5,
    paddingRightPercent: 5,
  });

  return canvas;
};

export default justFrame;
