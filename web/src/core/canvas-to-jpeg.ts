const canvasToJpeg = async (canvas: HTMLCanvasElement, quality?: number): Promise<ArrayBuffer> => {
  const arrayBuffer = await new Promise<ArrayBuffer>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          throw new Error('Failed to convert canvas to blob');
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result instanceof ArrayBuffer) {
            resolve(reader.result);
          } else {
            throw new Error('Failed to convert canvas to ArrayBuffer');
          }
        };
        reader.readAsArrayBuffer(blob);
      },
      'image/jpeg',
      (quality || 1) / 100
    );
  });
  // remove the original canvas
  canvas.width = 0;
  canvas.height = 0;
  canvas.remove();
  return arrayBuffer;
};

export default canvasToJpeg;
