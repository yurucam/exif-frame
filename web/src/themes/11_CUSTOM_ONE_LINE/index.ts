import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../../core/drawing/theme';

const CUSTOM_ONE_LINE_OPTIONS: ThemeOption[] = [
  { key: 'BACKGROUND_COLOR', type: String, default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { key: 'PADDING_INSIDE', type: Boolean, default: true, description: 'enable to use inside padding' },
  { key: 'PADDING_TOP', type: Number, default: 100, description: 'px' },
  { key: 'PADDING_BOTTOM', type: Number, default: 250, description: 'px' },
  { key: 'PADDING_LEFT', type: Number, default: 100, description: 'px' },
  { key: 'PADDING_RIGHT', type: Number, default: 100, description: 'px' },
  { key: 'TEXT', type: String, default: 'Your Text', description: 'ex. Hello, World!' },
  { key: 'TEXT_COLOR', type: String, default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { key: 'TEXT_SHADOW_COLOR', type: String, default: '#000000', description: '#ffffff is white, #000000 is black' },
  { key: 'TEXT_ALIGN', type: String, default: 'center', description: 'left or center or right' },
  { key: 'FONT_STYLE', type: String, default: 'normal', description: 'normal or italic' },
  { key: 'FONT_WEIGHT', type: Number, default: 300, description: '100 - 900' },
  { key: 'FONT_SIZE', type: Number, default: 70, description: 'px' },
  { key: 'FONT_FAMILY', type: String, default: 'Barlow', description: 'ex. digital-7, Barlow, Arial, sans-serif' },
];

const CUSTOM_ONE_LINE_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const PADDING_INSIDE = input.get('PADDING_INSIDE') as boolean;
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;
  const TEXT = input.get('TEXT') as string;
  const TEXT_COLOR = input.get('TEXT_COLOR') as string;
  const TEXT_SHADOW_COLOR = input.get('TEXT_SHADOW_COLOR') as string;
  const TEXT_ALIGN = (input.get('TEXT_ALIGN') as string).trim() as CanvasTextAlign;
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
  context.textAlign = TEXT_ALIGN as CanvasTextAlign;
  context.shadowColor = TEXT_SHADOW_COLOR;
  context.shadowBlur = 10;
  context.fillText(TEXT, TEXT_ALIGN === 'left' ? PADDING_LEFT : TEXT_ALIGN === 'center' ? canvas.width / 2 : canvas.width - PADDING_RIGHT, canvas.height - PADDING_BOTTOM / 2);
  context.shadowBlur = 0;

  return canvas;
};

export { CUSTOM_ONE_LINE_FUNC, CUSTOM_ONE_LINE_OPTIONS };
