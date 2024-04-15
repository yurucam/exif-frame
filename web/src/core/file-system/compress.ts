import JSZip from 'jszip';

/**
 * Compress files into a zip file.
 * @returns Base64 encoded zip file.
 */
export default async function compress(files: { filename: string; data: string }[]): Promise<string> {
  const zip = new JSZip();
  files.forEach((file) => zip.file(file.filename, file.data.split(',')[1], { base64: true }));
  const blob = await zip.generateAsync({ type: 'blob' });
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => (reader.onloadend = () => resolve(reader.result as string)));
}
