import { Buffer } from 'buffer';
import JSZip from 'jszip';
import Photo from '../domain/photo';
import saveAs from 'file-saver';
import { encode } from '@jsquash/webp';

const download = async (photoOrPhotos: Photo | Photo[]) => {
  const isWebp = localStorage.getItem('exportToWebp') === 'yes';

  if (Array.isArray(photoOrPhotos)) {
    // Download multiple photos as a zip file
    const zip = new JSZip();
    for (const photo of photoOrPhotos) {
      zip.file(photo.name.split('.')[0] + (isWebp ? '.webp' : '.jpeg'), await photo.toBlob(), { binary: true });
    }
    zip.generateAsync({ type: 'blob' }).then((content) => saveAs(content, 'images.zip'));
    return;
  } else {
    // Download single photo as a image file
    const photo = photoOrPhotos;
    const file = await encode(photo._canvas.getContext('2d')!.getImageData(0, 0, photo._canvas.width, photo._canvas.height));
    saveAs(new Blob([Buffer.from(file)], { type: 'image/webp' })), photo.name.split('.')[0] + (isWebp ? '.webp' : '.jpeg');
  }
};

export default download;
