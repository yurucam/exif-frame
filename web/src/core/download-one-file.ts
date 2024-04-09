import saveAs from 'file-saver';

const downloadOneFile = async (file: { name: string; buffer: ArrayBuffer; type: 'image/jpeg' | 'image/webp' }): Promise<void> => {
  saveAs(new Blob([file.buffer], { type: file.type }), file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`));
};

export default downloadOneFile;
