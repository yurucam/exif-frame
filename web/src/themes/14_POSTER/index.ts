import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const POSTER_OPTIONS: ThemeOption[] = [
  { id: 'DARK_MODE', type: 'boolean', default: false, description: 'enable to use dark mode' },
  { id: 'PADDING_TOP', type: 'number', default: 400, description: 'px' },
  { id: 'PADDING_BOTTOM', type: 'number', default: 400, description: 'px' },
  { id: 'PADDING_LEFT', type: 'number', default: 150, description: 'px' },
  { id: 'TEXT1', type: 'string', default: '2001.01.01' },
  { id: 'TEXT2', type: 'string', default: 'Lorem Ipsum' },
  { id: 'TEXT3', type: 'string', default: 'dolor sit amet, consectetur' },
  { id: 'TEXT4', type: 'string', default: 'White House' },
  { id: 'TEXT5', type: 'string', default: '1600 Pennsylvania Avenue NW, Washington, DC 20500' },
  { id: 'TEXT1_SIZE', type: 'number', default: 80, description: 'px' },
  { id: 'TEXT1_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 ~ 900' },
  { id: 'TEXT2_SIZE', type: 'number', default: 200, description: 'px' },
  { id: 'TEXT2_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: 'TEXT3_SIZE', type: 'number', default: 200, description: 'px' },
  { id: 'TEXT3_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: 'TEXT4_SIZE', type: 'number', default: 150, description: 'px' },
  { id: 'TEXT4_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: 'TEXT5_SIZE', type: 'number', default: 80, description: 'px' },
  { id: 'TEXT5_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 ~ 900' },
  { id: 'FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
  { id: 'SHADOW_SIZE', type: 'number', default: 10, description: '0 ~ 100' },
];

const POSTER_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const DARK_MODE = input.get('DARK_MODE') as boolean;
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const TEXT1 = (input.get('TEXT1') as string).trim();
  const TEXT2 = (input.get('TEXT2') as string).trim();
  const TEXT3 = (input.get('TEXT3') as string).trim();
  const TEXT4 = (input.get('TEXT4') as string).trim();
  const TEXT5 = (input.get('TEXT5') as string).trim();
  const TEXT1_SIZE = input.get('TEXT1_SIZE') as number;
  const TEXT1_WEIGHT = input.get('TEXT1_WEIGHT') as number;
  const TEXT2_SIZE = input.get('TEXT2_SIZE') as number;
  const TEXT2_WEIGHT = input.get('TEXT2_WEIGHT') as number;
  const TEXT3_SIZE = input.get('TEXT3_SIZE') as number;
  const TEXT3_WEIGHT = input.get('TEXT3_WEIGHT') as number;
  const TEXT4_SIZE = input.get('TEXT4_SIZE') as number;
  const TEXT4_WEIGHT = input.get('TEXT4_WEIGHT') as number;
  const TEXT5_SIZE = input.get('TEXT5_SIZE') as number;
  const TEXT5_WEIGHT = input.get('TEXT5_WEIGHT') as number;
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
  context.textAlign = 'left';

  context.font = `normal ${TEXT1_WEIGHT} ${TEXT1_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT1, PADDING_LEFT, PADDING_TOP);

  context.font = `normal ${TEXT2_WEIGHT} ${TEXT2_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT2, PADDING_LEFT, PADDING_TOP + TEXT1_SIZE * 2);

  context.font = `normal ${TEXT3_WEIGHT} ${TEXT3_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT3, PADDING_LEFT, PADDING_TOP + TEXT1_SIZE * 2 + TEXT2_SIZE * 1.2);

  context.font = `normal ${TEXT4_WEIGHT} ${TEXT4_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT4, PADDING_LEFT, canvas.height - PADDING_BOTTOM - TEXT5_SIZE * 1.5);

  context.font = `normal ${TEXT5_WEIGHT} ${TEXT5_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT5, PADDING_LEFT, canvas.height - PADDING_BOTTOM);

  return canvas;
};

export { POSTER_FUNC, POSTER_OPTIONS };
