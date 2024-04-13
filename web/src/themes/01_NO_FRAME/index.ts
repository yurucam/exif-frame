import Photo from '../../core/photo';
import sandbox from '../00_BASE/sandbox';
import { ThemeFunc, ThemeOption } from '../00_BASE/type';

const NO_FRAME_OPTIONS: ThemeOption[] = [];

const NO_FRAME_THEME_FUNC: ThemeFunc = (photo: Photo) => {
  return sandbox(photo, '#ffffff', { top: 0, right: 0, bottom: 0, left: 0 });
};

export { NO_FRAME_THEME_FUNC, NO_FRAME_OPTIONS };
