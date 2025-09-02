export class Picture {
  id: string;
  file: File;
  thumbUrl?: string;

  constructor(file: File) {
    this.id = crypto.randomUUID();
    this.file = file;
  }

  async generateThumbnail(maxSize = 512, bgColor?: string) {
    const image = new Image();
    image.src = await this.loadDataUrl();
    await new Promise((resolve) => (image.onload = resolve));

    const size = Math.max(1, Math.min(maxSize, Math.max(image.width, image.height)));
    const scale = Math.min(1, size / Math.max(image.width, image.height));
    const drawW = Math.max(1, Math.round(image.width * scale));
    const drawH = Math.max(1, Math.round(image.height * scale));
    const offsetX = Math.floor((size - drawW) / 2);
    const offsetY = Math.floor((size - drawH) / 2);

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
    }
    ctx.drawImage(image, offsetX, offsetY, drawW, drawH);

    const blob: Blob | null = await new Promise((resolve) => {
      canvas.toBlob((b) => {
        if (b) return resolve(b);
        canvas.toBlob((b2) => resolve(b2), 'image/jpeg');
      }, 'image/webp');
    });
    if (!blob) return;

    if (this.thumbUrl) URL.revokeObjectURL(this.thumbUrl);
    this.thumbUrl = URL.createObjectURL(blob);
  }

  async loadDataUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target!.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(this.file);
    });
  }
}
