import { Media } from '@capacitor-community/media';
import { Capacitor } from '@capacitor/core';
import saveAs from 'file-saver';

/**
 * Download base64 data as a file.
 */
export default async function download(filename: string, data: string): Promise<void> {
  // Helper: convert object/blob URL to base64 data URL
  const toBase64DataUrl = async (url: string): Promise<string> => {
    // If it's already a data URL, return as-is
    if (url.startsWith('data:')) return url;
    // Only attempt conversion for blob/object URLs
    if (!url.startsWith('blob:')) return url;

    const res = await fetch(url);
    const blob = await res.blob();
    const mime = blob.type || guessMimeFromFilename(filename);
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    // Ensure mime prefix matches intended mime if possible
    if (mime && base64.startsWith('data:') && !base64.startsWith(`data:${mime}`)) {
      return base64.replace(/^data:[^;]+/, `data:${mime}`);
    }
    return base64;
  };

  // Helper: best-effort mime guess from filename
  function guessMimeFromFilename(name: string): string | '' {
    const lower = name.toLowerCase();
    if (lower.endsWith('.webp')) return 'image/webp';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
    if (lower.endsWith('.png')) return 'image/png';
    return '';
  }
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
      // Convert object URL to base64 for native save
      {
        const base64 = await toBase64DataUrl(data);
        await Media.savePhoto({
        fileName: filename,
        path: base64,
        albumIdentifier: (await Media.getAlbums()).albums.find((album) => album.name === 'EXIF Frame')?.identifier,
        });
      }
      break;

    case 'android':
      // Convert object URL to base64 for native save
      {
        const base64 = await toBase64DataUrl(data);
        await Media.savePhoto({
          fileName: Math.random().toString(36).substring(7) + '_' + filename,
          path: base64,
          albumIdentifier: (await Media.getAlbums()).albums.find((album) => album.name === 'EXIF Frame')?.identifier,
        });
      }
      break;

    case 'web':
      saveAs(data, filename);
      break;
  }
}
