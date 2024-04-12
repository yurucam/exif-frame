import { Theme, createCanvas } from './draw';

const justFrame: Theme = async (_photo, image) => {
  const { canvas } = createCanvas(image, {
    paddingTopPercent: 5,
    paddingBottomPercent: 5,
    paddingLeftPercent: 5,
    paddingRightPercent: 5,
  });

  return canvas;
};

export default justFrame;
