import { Theme, createCanvas } from './draw';

const noFrame: Theme = async (_photo, image) => {
  const { canvas } = createCanvas(image);

  return canvas;
};

export default noFrame;
