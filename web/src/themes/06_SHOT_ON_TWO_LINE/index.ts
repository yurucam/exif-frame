import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';

const SHOT_ON_TWO_LINE_OPTIONS: ThemeOption[] = [
  { id: 'BACKGROUND_COLOR', type: 'color', default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { id: 'PADDING_TOP', type: 'number', default: 200, description: 'px' },
  { id: 'PADDING_BOTTOM', type: 'number', default: 300, description: 'px' },
  { id: 'PADDING_LEFT', type: 'number', default: 50, description: 'px' },
  { id: 'PADDING_RIGHT', type: 'number', default: 50, description: 'px' },
  { id: 'TEXT_COLOR', type: 'color', default: '#000000', description: '#ffffff is white, #000000 is black' },
  { id: 'TOP_LABEL', type: 'string', default: '', description: 'ex. @username' },
];

const SHOT_ON_TWO_LINE_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;
  const TEXT_COLOR = input.get('TEXT_COLOR') as string;
  const TOP_LABEL = (input.get('TOP_LABEL') as string).trim();

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'middle';
  context.textAlign = 'center';

  // DRAW TOP LABEL
  context.font = `normal 100 50px Barlow`;
  context.fillText(TOP_LABEL, canvas.width / 2, PADDING_TOP - 75);

  // shot on ${MAKER} ${MODEL}
  context.font = `normal 500 80px Barlow`;
  context.fillText(`shot on ${[photo.make, photo.model].filter(Boolean).join(' ')}`, canvas.width / 2, canvas.height - PADDING_BOTTOM + 100);

  if (!store.disableExposureMeter) {
    context.font = `normal 100 50px Barlow`;
    context.fillText([`${photo.iso}`, `${photo.focalLength}`, `${photo.fNumber}`, `${photo.exposureTime}`].filter(Boolean).join('    '), canvas.width / 2, canvas.height - PADDING_BOTTOM + 200);
  }

  return canvas;
};

export { SHOT_ON_TWO_LINE_FUNC, SHOT_ON_TWO_LINE_OPTIONS };
