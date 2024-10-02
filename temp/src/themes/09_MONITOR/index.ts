import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const MONITOR_OPTIONS: ThemeOption[] = [
  { id: 'BACKGROUND_COLOR', type: 'color', default: '#000000', description: '#ffffff is white, #000000 is black' },
  { id: 'PADDING_INSIDE', type: 'boolean', default: false, description: 'enable to use inside padding' },
  { id: 'COMPACT', type: 'boolean', default: false, description: 'enable to reduce exif text width' },
  { id: 'PADDING_TOP', type: 'number', default: 0, description: 'px' },
  { id: 'PADDING_BOTTOM', type: 'number', default: 100, description: 'px' },
  { id: 'PADDING_LEFT', type: 'number', default: 0, description: 'px' },
  { id: 'PADDING_RIGHT', type: 'number', default: 0, description: 'px' },
  { id: 'TEXT_COLOR', type: 'color', default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { id: 'FONT_STYLE', type: 'select', options: ['normal', 'italic'], default: 'normal', description: 'normal or italic' },
  { id: 'FONT_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 - 900' },
  { id: 'FONT_SIZE', type: 'number', default: 70, description: 'px' },
  { id: 'FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
];

const MONITOR_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const PADDING_INSIDE = input.get('PADDING_INSIDE') as boolean;
  const COMPACT = input.get('COMPACT') as boolean;
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;
  const TEXT_COLOR = input.get('TEXT_COLOR') as string;
  const FONT_STYLE = (input.get('FONT_STYLE') as string).trim();
  const FONT_WEIGHT = input.get('FONT_WEIGHT') as number;
  const FONT_SIZE = input.get('FONT_SIZE') as number;
  const FONT_FAMILY = (input.get('FONT_FAMILY') as string).trim();

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: PADDING_INSIDE ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'middle';
  context.font = `${FONT_STYLE} ${FONT_WEIGHT} ${FONT_SIZE}px ${FONT_FAMILY}`;
  context.textAlign = 'center';

  if (COMPACT) {
    const targetWidth = canvas.width / 2;
    if (!store.disableExposureMeter) {
      context.fillText(`${photo.fNumber?.replace('f/', 'F')}`, (canvas.width - targetWidth) / 2 + (targetWidth / 5) * 1, canvas.height - PADDING_BOTTOM / 2);
      context.fillText(`${photo.exposureTime}`, (canvas.width - targetWidth) / 2 + (targetWidth / 5) * 2, canvas.height - PADDING_BOTTOM / 2);
      context.fillText(`${photo.iso}`, (canvas.width - targetWidth) / 2 + (targetWidth / 5) * 3, canvas.height - PADDING_BOTTOM / 2);
      context.fillText(`${photo.focalLength}`, (canvas.width - targetWidth) / 2 + (targetWidth / 5) * 4, canvas.height - PADDING_BOTTOM / 2);
    }
  } else {
    if (!store.disableExposureMeter) {
      context.fillText(`${photo.fNumber?.replace('f/', 'F')}`, (canvas.width / 5) * 1, canvas.height - PADDING_BOTTOM / 2);
      context.fillText(`${photo.exposureTime}`, (canvas.width / 5) * 2, canvas.height - PADDING_BOTTOM / 2);
      context.fillText(`${photo.iso}`, (canvas.width / 5) * 3, canvas.height - PADDING_BOTTOM / 2);
      context.fillText(`${photo.focalLength}`, (canvas.width / 5) * 4, canvas.height - PADDING_BOTTOM / 2);
    }
  }

  return canvas;
};

export { MONITOR_FUNC, MONITOR_OPTIONS };
