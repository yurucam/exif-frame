import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const SIMPLE_OPTIONS: ThemeOption[] = [
  { id: 'LABEL', type: 'string', default: '@username', description: 'ex. @username' },
  { id: 'FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
  { id: 'PADDING_INSIDE', type: 'boolean', default: false, description: 'enable to use inside padding' },
  { id: 'PADDING_TOP', type: 'number', default: 100, description: 'px' },
  { id: 'PADDING_BOTTOM', type: 'number', default: 400, description: 'px' },
  { id: 'PADDING_LEFT', type: 'number', default: 100, description: 'px' },
  { id: 'PADDING_RIGHT', type: 'number', default: 100, description: 'px' },
];

const SIMPLE_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const LABEL = (input.get('LABEL') as string).trim();
  const FONT_FAMILY = (input.get('FONT_FAMILY') as string).trim();
  const PADDING_INSIDE = input.get('PADDING_INSIDE') as boolean;
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: '#ffffff',
    padding: PADDING_INSIDE ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = '#a0a0a0';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.font = `300 ${40}px ${FONT_FAMILY}`;
  context.fillText(LABEL, canvas.width / 2, canvas.height - 60);

  context.textAlign = 'left';
  context.fillStyle = '#000000';
  context.font = `700 ${100}px ${FONT_FAMILY}`;
  const makerWidth = context.measureText(photo.make + ' ').width;
  context.font = `300 ${100}px ${FONT_FAMILY}`;
  const modelWidth = context.measureText(photo.model).width;
  context.font = `700 ${100}px ${FONT_FAMILY}`;
  context.fillText(photo.make, canvas.width / 2 - (makerWidth + modelWidth) / 2, canvas.height - PADDING_BOTTOM / 2 - 100);
  context.font = `300 ${100}px ${FONT_FAMILY}`;
  context.fillText(photo.model, canvas.width / 2 - (makerWidth + modelWidth) / 2 + makerWidth, canvas.height - PADDING_BOTTOM / 2 - 100);

  context.textAlign = 'center';
  context.fillStyle = '#a0a0a0';

  context.font = `300 ${30}px ${FONT_FAMILY}`;
  context.fillText(photo.takenAt, canvas.width / 2, canvas.height - PADDING_BOTTOM / 2 + 80);

  if (!store.disableExposureMeter) {
    context.font = `300 ${50}px ${FONT_FAMILY}`;
    context.fillText([`${photo.iso}`, `${photo.focalLength}`, `${photo.fNumber}`, `${photo.exposureTime}`].filter(Boolean).join(' ∙ '), canvas.width / 2, canvas.height - PADDING_BOTTOM / 2);
  }

  return canvas;
};

export { SIMPLE_FUNC, SIMPLE_OPTIONS };
