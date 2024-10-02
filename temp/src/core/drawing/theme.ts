import Photo from '../photo';
import { Store } from '../../store';
import { ThemeOptionInput } from '../../pages/theme/types/theme-option';

type ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => HTMLCanvasElement;

export type { ThemeFunc };
