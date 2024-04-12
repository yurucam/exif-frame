import { Capacitor } from '@capacitor/core';
import { Media } from '@capacitor-community/media';
import { Buffer } from 'buffer';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import { t } from 'i18next';

const downloadManyFile = async (files: { name: string; buffer: ArrayBuffer; type: 'image/jpeg' | 'image/webp' }[]): Promise<void> => {
  if (Capacitor.isNativePlatform()) {
    if (!(await Media.getAlbums()).albums.map((album) => album.name).includes('EXIF Frame')) {
      await Media.createAlbum({ name: 'EXIF Frame' });
    }

    for (const file of files) {
      await Media.savePhoto({
        fileName: file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`),
        path: `data:${file.type};base64,${Buffer.from(file.buffer).toString('base64')}`,
        albumIdentifier:
          Capacitor.getPlatform() === 'android'
            ? (await Media.getAlbums()).albums.find((album) => album.name === 'EXIF Frame')?.identifier
            : undefined,
      });
    }
  } else {
    const zip = new JSZip();
    files.forEach((file) =>
      zip.file(file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`), file.buffer, { binary: true })
    );
    const file = await zip.generateAsync({ type: 'blob' });
    saveAs(file, 'images.zip');
  }

  alert(t('root.successfully-downloaded-in-gallery'));
};

export default downloadManyFile;
