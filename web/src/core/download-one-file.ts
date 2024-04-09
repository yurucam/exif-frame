import saveAs from 'file-saver';

const downloadOneFile = async (file: { name: string; buffer: ArrayBuffer }): Promise<void> => {
  saveAs(new Blob([file.buffer], { type: 'image/webp' }), file.name.replace(/\.[^/.]+$/, '.webp'));
};

export default downloadOneFile;
