import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../../core/drawing/theme';

const MONITOR_OPTIONS: ThemeOption[] = [
  { key: 'BACKGROUND_COLOR', type: String, default: '#000000', description: '#ffffff is white, #000000 is black' },
  { key: 'PADDING_TOP', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_BOTTOM', type: Number, default: 100, description: 'px' },
  { key: 'PADDING_LEFT', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_RIGHT', type: Number, default: 0, description: 'px' },
  { key: 'TEXT_COLOR', type: String, default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { key: 'FONT_STYLE', type: String, default: 'normal', description: 'normal or italic' },
  { key: 'FONT_WEIGHT', type: Number, default: 500, description: '100 - 900' },
  { key: 'FONT_SIZE', type: Number, default: 70, description: 'px' },
  { key: 'FONT_FAMILY', type: String, default: 'Barlow', description: 'ex. digital-7, Barlow, Arial, sans-serif' },
];

const MONITOR_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
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
    padding: { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'middle';
  context.font = `${FONT_STYLE} ${FONT_WEIGHT} ${FONT_SIZE}px ${FONT_FAMILY}`;
  context.textAlign = 'center';

  if (!store.disableExposureMeter) {
    context.fillText(`${photo.exposureTime}s`, (canvas.width / 5) * 1, canvas.height - PADDING_BOTTOM / 2);
    context.fillText(`${photo.fNumber?.replace('f', 'F')}`, (canvas.width / 5) * 2, canvas.height - PADDING_BOTTOM / 2);
    context.fillText(`ISO${photo.iso}`, (canvas.width / 5) * 3, canvas.height - PADDING_BOTTOM / 2);
    context.fillText(`${store.focalLength35mmMode ? photo.focalLengthIn35mm : photo.focalLength}`, (canvas.width / 5) * 4, canvas.height - PADDING_BOTTOM / 2);
  }

  return canvas;
};

export { MONITOR_FUNC, MONITOR_OPTIONS };
