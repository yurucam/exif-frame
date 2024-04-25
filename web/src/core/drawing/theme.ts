import Photo from '../photo';
import { Store } from '../../store';

type ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => HTMLCanvasElement;

type ThemeOption = {
  key: string;
  type: typeof String | typeof Number | typeof Boolean;
  default: string | number | boolean;
  description?: string;
};

type ThemeOptionInput = Map<string, string | number | boolean>;

export type { ThemeFunc, ThemeOption, ThemeOptionInput };
