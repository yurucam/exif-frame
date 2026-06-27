import { Tags } from 'exifreader';

// Fujifilm Film Simulation 태그 ID → 이름 매핑
const FUJI_FILM_SIMULATION: Record<number, string> = {
  0: 'Provia/Standard',
  256: 'Velvia/Vivid',
  512: 'Astia/Soft',
  768: 'Classic Chrome',
  1024: 'Pro Neg. Hi',
  1280: 'Pro Neg. Std',
  1536: 'Classic Neg.',
  1792: 'Eterna/Cinema',
  2048: 'Eterna Bleach Bypass',
  2304: 'Acros',
  2560: 'Acros+Ye Filter',
  2816: 'Acros+R Filter',
  3072: 'Acros+G Filter',
  32768: 'Sepia',
  // Monochrome 계열
  // ...
};

/* function parseFujifilmFilmMode(makerNote: unknown): string | undefined {
  try {
    // ExifReader가 MakerNote를 ArrayBuffer로 반환
    const buffer = (makerNote as any)?.value;
    if (!buffer) return undefined;

    const view = new DataView(
      buffer instanceof ArrayBuffer ? buffer : buffer.buffer
    );

    // Fujifilm MakerNote는 "FUJIFILM\x0C\x00\x00\x00" 헤더로 시작
    // 헤더 12바이트 이후부터 IFD 구조 시작
    const FUJI_HEADER = 'FUJIFILM';
    let headerOk = true;
    for (let i = 0; i < 8; i++) {
      if (view.getUint8(i) !== FUJI_HEADER.charCodeAt(i)) {
        headerOk = false;
        break;
      }
    }
    if (!headerOk) return undefined;

    // IFD offset: little-endian, bytes 8-11
    const ifdOffset = view.getUint32(8, true);
    const entryCount = view.getUint16(ifdOffset, true);

    for (let i = 0; i < entryCount; i++) {
      const entryOffset = ifdOffset + 2 + i * 12;
      const tagId = view.getUint16(entryOffset, true);
      if (tagId === 0x1401) {
        // FilmMode tag
        const val = view.getUint16(entryOffset + 8, true);
        return FUJI_FILM_SIMULATION[val] ?? `Unknown (${val})`;
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
} */

function parseFujifilmFilmMode(makerNote: unknown): string | undefined {
  try {
    const buffer = (makerNote as any)?.value;
    
    if (!buffer) return undefined;

    /* 
    const view  = new DataView(
      buffer instanceof ArrayBuffer ? buffer : buffer.buffer
    ); */
    const view = new DataView(new Uint8Array(buffer).buffer);

    // 헤더 확인
    const header = Array.from({length: 8}, (_, i) => String.fromCharCode(view.getUint8(i))).join('');
    
    if (header !== 'FUJIFILM') {
      console.log('[Fuji] 헤더 불일치 - 파싱 중단');
      return undefined;
    }

    const ifdOffset = view.getUint32(8, true);
    const entryCount = view.getUint16(ifdOffset, true);

    for (let i = 0; i < entryCount; i++) {
      const entryOffset = ifdOffset + 2 + i * 12;
      const tagId = view.getUint16(entryOffset, true);
      if (tagId === 0x1401) {
        const val = view.getUint16(entryOffset + 8, true);
        return FUJI_FILM_SIMULATION[val] ?? `Unknown (${val})`;
      }
    }

    console.log('[Fuji] 0x1401 태그를 찾지 못함');
    return undefined;
  } catch (e) {
    console.error('[Fuji] 파싱 오류:', e);
    return undefined;
  }
}

class ExifMetadata {
  public make: string | undefined;
  public model: string | undefined;
  public lensModel: string | undefined;
  public focalLength: string | undefined;
  public focalLengthIn35mm: string | undefined;
  public fNumber: string | undefined;
  public iso: string | undefined;
  public exposureTime: string | undefined;
  public thumbnail: string | undefined;
  public takenAt: string | undefined;
  public filmSimulation: string | undefined;

  constructor(metadata: Tags) {
    console.log(metadata);

    this.make = metadata?.Make?.description;
    this.model = metadata?.Model?.description;
    this.lensModel = this.model ? metadata?.LensModel?.description?.replace(this.model, '')?.trim() : metadata?.LensModel?.description;
    this.focalLength = metadata?.FocalLength?.description?.replace(' mm', 'mm');
    this.focalLengthIn35mm = metadata?.FocalLengthIn35mmFilm?.value
      ? `${metadata?.FocalLengthIn35mmFilm?.value}mm`
      : metadata?.UprightFocalLength35mm?.value
      ? metadata.UprightFocalLength35mm.value.includes('.')
        ? `${metadata.UprightFocalLength35mm.value.split('.').shift()}mm`
        : `${metadata.UprightFocalLength35mm.value}mm`
      : undefined;
    this.fNumber = metadata?.FNumber?.description?.substring(0, 5)?.replace('f/', 'F');
    this.iso = metadata?.ISOSpeedRatings?.value ? 'ISO' + metadata?.ISOSpeedRatings?.value?.toString() : undefined;
    this.exposureTime = metadata?.ExposureTime?.description ? metadata?.ExposureTime?.description + 's' : undefined;
    this.thumbnail = metadata?.Thumbnail?.base64 ? 'data:image/jpg;base64,' + metadata?.Thumbnail?.base64 : undefined;

    if (metadata?.DateTimeOriginal?.description) {
      const yyyymmdd = metadata.DateTimeOriginal.description.split(' ')[0].split(':').join('-');
      const hhmmss = metadata.DateTimeOriginal.description.split(' ')[1];
      this.takenAt = `${yyyymmdd} ${hhmmss}`;
    }

    // Fujifilm Film Simulation 추가
    if (metadata?.Make?.description?.toUpperCase().includes('FUJIFILM')) {
      this.filmSimulation = parseFujifilmFilmMode(metadata?.MakerNote);
    }
  }
}

export default ExifMetadata;
