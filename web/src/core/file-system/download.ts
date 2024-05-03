import { Media } from '@capacitor-community/media';
import { Capacitor } from '@capacitor/core';
import saveAs from 'file-saver';

/**
 * Download base64 data as a file.
 */
export default async function download(filename: string, data: string): Promise<void> {
  // Create an album if it doesn't exist on native platforms. (Android, iOS)
  if (Capacitor.isNativePlatform()) {
    const { albums } = await Media.getAlbums();
    if (!albums.map((album) => album.name).includes('EXIF Frame')) {
      await Media.createAlbum({ name: 'EXIF Frame' });
    }
  }

  // Save the file based on the platform.
  switch (Capacitor.getPlatform()) {
    case 'ios':
      await Media.savePhoto({
        fileName: filename,
        path: data,
        albumIdentifier: (await Media.getAlbums()).albums.find((album) => album.name === 'EXIF Frame')?.identifier,
      });
      break;

    case 'android':
      await Media.savePhoto({
        fileName: Math.random().toString(36).substring(7) + '_' + filename,
        path: data,
        albumIdentifier: (await Media.getAlbums()).albums.find((album) => album.name === 'EXIF Frame')?.identifier,
      });
      break;

    case 'web':
      saveAs(data, filename);
      break;
  }
}
