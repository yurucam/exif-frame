import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const TWO_LINE_OPTIONS: ThemeOption[] = [
  { id: 'BACKGROUND_COLOR', type: 'color', default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { id: 'PADDING_INSIDE', type: 'boolean', default: false, description: 'enable to use inside padding' },
  { id: 'PADDING_TOP', type: 'number', default: 100, description: 'px' },
  { id: 'PADDING_BOTTOM', type: 'number', default: 350, description: 'px' },
  { id: 'PADDING_LEFT', type: 'number', default: 100, description: 'px' },
  { id: 'PADDING_RIGHT', type: 'number', default: 100, description: 'px' },
  { id: 'TEXT_COLOR', type: 'color', default: '#000000', description: '#ffffff is white, #000000 is black' },
  { id: 'TEXT_ALPHA', type: 'range-slider', default: 1, min: 0, max: 1, step: 0.01, description: '0 - 1' },
  { id: 'TEXT_ALIGN', type: 'select', options: ['center', 'right', 'left'], default: 'center', description: 'left or center or right' },
  { id: 'FONT_STYLE', type: 'select', options: ['normal', 'italic'], default: 'normal', description: 'normal or italic' },
  { id: 'FONT_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 - 900' },
  { id: 'FONT_SIZE', type: 'number', default: 70, description: 'px' },
  { id: 'FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
  { id: 'TOP_LABEL', type: 'string', default: '', description: 'ex. @username' },
  { id: 'DIVIDER', type: 'string', default: '∙', description: 'ex. |' },
  { id: 'TEMPLATE1', type: 'string', default: '{MAKER}{BODY}{LENS}' },
  { id: 'TEMPLATE2', type: 'string', default: '{ISO}{MM}{F}{SEC}' },
];

const TWO_LINE_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const PADDING_INSIDE = input.get('PADDING_INSIDE') as boolean;
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;
  const TEXT_COLOR = input.get('TEXT_COLOR') as string;
  const TEXT_ALPHA = input.get('TEXT_ALPHA') as number;
  const TEXT_ALIGN = (input.get('TEXT_ALIGN') as string).trim() as CanvasTextAlign;
  const FONT_STYLE = (input.get('FONT_STYLE') as string).trim();
  const FONT_WEIGHT = input.get('FONT_WEIGHT') as number;
  const FONT_SIZE = input.get('FONT_SIZE') as number;
  const FONT_FAMILY = (input.get('FONT_FAMILY') as string).trim();
  const TOP_LABEL = (input.get('TOP_LABEL') as string).trim();
  const DIVIDER = (input.get('DIVIDER') as string).trim();
  const TEMPLATE1 = (input.get('TEMPLATE1') as string).trim();
  const TEMPLATE2 = (input.get('TEMPLATE2') as string).trim();

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
  context.globalAlpha = TEXT_ALPHA;
  context.fillText(TOP_LABEL, canvas.width / 2, PADDING_TOP / 2);

  const text1 = TEMPLATE1.split('}')
    .map((part) => `${part}}`)
    .map((part) =>
      part
        .replace(/{MAKER}/g, photo.make)
        .replace(/{BODY}/g, photo.model || '')
        .replace(/{LENS}/g, photo.lensModel || '')
        .replace(/{ISO}/g, store.disableExposureMeter ? '' : photo.iso || '')
        .replace(/{MM}/g, store.disableExposureMeter ? '' : photo.focalLength || '')
        .replace(/{F}/g, store.disableExposureMeter ? '' : photo.fNumber || '')
        .replace(/{SEC}/g, store.disableExposureMeter ? '' : photo.exposureTime || '')
        .replace(/{TAKEN_AT}/g, photo.takenAt || '')
        .replace(/}/g, '')
    )
    .filter(Boolean)
    .join(' ' + DIVIDER + ' ');

  context.textAlign = TEXT_ALIGN as CanvasTextAlign;
  context.fillText(text1, TEXT_ALIGN === 'left' ? PADDING_LEFT : TEXT_ALIGN === 'center' ? canvas.width / 2 : canvas.width - PADDING_RIGHT, canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 1.5);

  if (!store.disableExposureMeter) {
    const text2 = TEMPLATE2.split('}')
      .map((part) => `${part}}`)
      .map((part) =>
        part
          .replace(/{MAKER}/g, photo.make)
          .replace(/{BODY}/g, photo.model || '')
          .replace(/{LENS}/g, photo.lensModel || '')
          .replace(/{ISO}/g, store.disableExposureMeter ? '' : photo.iso || '')
          .replace(/{MM}/g, store.disableExposureMeter ? '' : photo.focalLength || '')
          .replace(/{F}/g, store.disableExposureMeter ? '' : photo.fNumber || '')
          .replace(/{SEC}/g, store.disableExposureMeter ? '' : photo.exposureTime || '')
          .replace(/{TAKEN_AT}/g, photo.takenAt || '')
          .replace(/}/g, '')
      )
      .filter(Boolean)
      .join(' ' + DIVIDER + ' ');

    context.fillText(text2, TEXT_ALIGN === 'left' ? PADDING_LEFT : TEXT_ALIGN === 'center' ? canvas.width / 2 : canvas.width - PADDING_RIGHT, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 1.5);
  }

  context.globalAlpha = 1;

  return canvas;
};

export { TWO_LINE_FUNC, TWO_LINE_OPTIONS };
