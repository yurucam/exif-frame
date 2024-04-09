import JSZip from 'jszip';
import saveAs from 'file-saver';

const downloadManyFile = async (files: { name: string; buffer: ArrayBuffer }[]): Promise<void> => {
  const zip = new JSZip();
  files.forEach((file) => zip.file(file.name.replace(/\.[^/.]+$/, '.webp'), file.buffer, { binary: true }));
  zip.generateAsync({ type: 'blob' }).then((content) => saveAs(content, 'images.zip'));
};

export default downloadManyFile;
