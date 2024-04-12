import { Capacitor } from '@capacitor/core';
import { Media } from '@capacitor-community/media';
import { Buffer } from 'buffer';
import saveAs from 'file-saver';

const downloadOneFile = async (file: { name: string; buffer: ArrayBuffer; type: 'image/jpeg' | 'image/webp' }): Promise<void> => {
  try {
    if (Capacitor.isNativePlatform()) {
      await Media.savePhoto({
        fileName: file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`),
        path: `data:${file.type};base64,${Buffer.from(file.buffer).toString('base64')}`,
        albumIdentifier: Capacitor.getPlatform() === 'android' ? (await Media.getAlbums()).albums.pop()?.identifier : undefined,
      });
    } else {
      saveAs(
        new Blob([file.buffer], { type: file.type }),
        file.name.replace(/\.[^/.]+$/, `.${file.type === 'image/jpeg' ? 'jpg' : 'webp'}`)
      );
    }
  } catch (error) {
    alert(error);
  }
};

export default downloadOneFile;
