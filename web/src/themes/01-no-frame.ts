import { Theme, createCanvas } from './draw';

const noFrame: Theme = async (photo) => {
  const { canvas } = createCanvas(photo.image);

  return canvas;
};

export default noFrame;
