import { Theme, createCanvas } from './draw';

const gridLines: Theme = async (_photo, image) => {
  const { canvas, fontSize } = createCanvas(image, { fontSizePercent: 0.1 });

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#000000';
  context.lineWidth = fontSize;
  context.beginPath();
  for (let i = 1; i < 3; i++) {
    context.moveTo(0, (canvas.height / 3) * i);
    context.lineTo(canvas.width, (canvas.height / 3) * i);
    context.moveTo((canvas.width / 3) * i, 0);
    context.lineTo((canvas.width / 3) * i, canvas.height);
  }
  context.stroke();

  return canvas;
};

export default gridLines;
