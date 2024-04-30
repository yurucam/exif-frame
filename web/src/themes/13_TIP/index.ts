import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../../core/drawing/theme';

const TIP_OPTIONS: ThemeOption[] = [
  { key: 'DARK_MODE', type: Boolean, default: false, description: 'enable to use dark mode' },
  { key: 'HIDE_TEXT', type: Boolean, default: false, description: 'hide text' },
  { key: 'TAG', type: String, default: 'TIP' },
  { key: 'TITLE', type: String, default: '01. Lorem ipsum' },
  { key: 'DESCRIPTION1', type: String, default: 'Pellentesque a pharetra justo' },
  { key: 'DESCRIPTION2', type: String, default: 'Nam maximus risus et rhoncus eleifend' },
  { key: 'PADDING_TOP', type: Number, default: 250, description: 'px' },
  { key: 'PADDING_BOTTOM', type: Number, default: 125, description: 'px' },
  { key: 'TAG_SIZE', type: Number, default: 140, description: 'px' },
  { key: 'TAG_WIGHT', type: Number, default: 700, description: '100 ~ 900' },
  { key: 'TITLE_SIZE', type: Number, default: 120, description: 'px' },
  { key: 'TITLE_WEIGHT', type: Number, default: 500, description: '100 ~ 900' },
  { key: 'DESCRIPTION_SIZE', type: Number, default: 95, description: 'px' },
  { key: 'DESCRIPTION_WEIGHT', type: Number, default: 200, description: '100 ~ 900' },
  { key: 'EXIF_SIZE', type: Number, default: 60, description: 'px' },
  { key: 'EXIF_WEIGHT', type: Number, default: 500, description: '100 ~ 900' },
  { key: 'FONT_FAMILY', type: String, default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
  { key: 'SHADOW_SIZE', type: Number, default: 10, description: '0 ~ 100' },
];

const TIP_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const DARK_MODE = input.get('DARK_MODE') as boolean;
  const HIDE_TEXT = input.get('HIDE_TEXT') as boolean;
  const TAG = (input.get('TAG') as string).trim();
  const TITLE = (input.get('TITLE') as string).trim();
  const DESCRIPTION1 = (input.get('DESCRIPTION1') as string).trim();
  const DESCRIPTION2 = (input.get('DESCRIPTION2') as string).trim();
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const TAG_SIZE = input.get('TAG_SIZE') as number;
  const TAG_WIGHT = input.get('TAG_WIGHT') as number;
  const TITLE_SIZE = input.get('TITLE_SIZE') as number;
  const TITLE_WEIGHT = input.get('TITLE_WEIGHT') as number;
  const DESCRIPTION_SIZE = input.get('DESCRIPTION_SIZE') as number;
  const DESCRIPTION_WEIGHT = input.get('DESCRIPTION_WEIGHT') as number;
  const EXIF_SIZE = input.get('EXIF_SIZE') as number;
  const EXIF_WEIGHT = input.get('EXIF_WEIGHT') as number;
  const FONT_FAMILY = (input.get('FONT_FAMILY') as string).trim();
  const SHADOW_SIZE = input.get('SHADOW_SIZE') as number;

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: DARK_MODE ? '#ffffff' : '#000000',
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = DARK_MODE ? '#000000' : '#ffffff';
  context.shadowColor = DARK_MODE ? '#ffffff' : '#000000';
  context.shadowBlur = SHADOW_SIZE;
  context.textBaseline = 'middle';
  context.textAlign = 'center';

  if (!HIDE_TEXT) {
    context.font = `normal ${TAG_WIGHT} ${TAG_SIZE}px ${FONT_FAMILY}`;
    context.fillText(TAG, canvas.width / 2, PADDING_TOP);

    context.font = `normal ${TITLE_WEIGHT} ${TITLE_SIZE}px ${FONT_FAMILY}`;
    context.fillText(TITLE, canvas.width / 2, PADDING_TOP + TAG_SIZE + TITLE_SIZE / 2);

    context.font = `normal ${DESCRIPTION_WEIGHT} ${DESCRIPTION_SIZE}px ${FONT_FAMILY}`;
    context.fillText(DESCRIPTION1, canvas.width / 2, canvas.height - PADDING_BOTTOM - EXIF_SIZE - DESCRIPTION_SIZE * 2.2);
    context.fillText(DESCRIPTION2, canvas.width / 2, canvas.height - PADDING_BOTTOM - EXIF_SIZE - DESCRIPTION_SIZE);
  }

  if (!store.disableExposureMeter) {
    const exifWidth = canvas.width / 2;
    context.font = `normal ${EXIF_WEIGHT} ${EXIF_SIZE}px ${FONT_FAMILY}`;
    context.fillText(`${photo.fNumber?.replace('f/', 'F')}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 1, canvas.height - PADDING_BOTTOM);
    context.fillText(`${photo.exposureTime}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 2, canvas.height - PADDING_BOTTOM);
    context.fillText(`ISO ${photo.iso}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 3, canvas.height - PADDING_BOTTOM);
    context.fillText(`${store.focalLength35mmMode ? photo.focalLengthIn35mm : photo.focalLength}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 4, canvas.height - PADDING_BOTTOM);
  }

  return canvas;
};

export { TIP_FUNC, TIP_OPTIONS };
