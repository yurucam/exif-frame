import Photo from '../../core/photo';
import sandbox from '../00_BASE/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../00_BASE/type';

const JUST_FRAME_OPTIONS: ThemeOption[] = [
  { key: 'BACKGROUND_COLOR', type: String, default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { key: 'PADDING_TOP', type: Number, default: 100, description: 'px' },
  { key: 'PADDING_BOTTOM', type: Number, default: 100, description: 'px' },
  { key: 'PADDING_LEFT', type: Number, default: 100, description: 'px' },
  { key: 'PADDING_RIGHT', type: Number, default: 100, description: 'px' },
];

const JUST_FRAME_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;

  return sandbox(photo, BACKGROUND_COLOR, { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT });
};

export { JUST_FRAME_FUNC, JUST_FRAME_OPTIONS };
