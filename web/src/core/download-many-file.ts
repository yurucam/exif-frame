import JSZip from 'jszip';
import saveAs from 'file-saver';

const downloadManyFile = async (files: { name: string; buffer: ArrayBuffer; type: 'image/jpeg' | 'image/webp' }[]): Promise<void> => {
  const zip = new JSZip();
  files.forEach((file) =>
    zip.file(file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`), file.buffer, { binary: true })
  );
  zip.generateAsync({ type: 'blob' }).then((content) => saveAs(content, 'images.zip'));
};

export default downloadManyFile;
