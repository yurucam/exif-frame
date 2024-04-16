import Photo from '../../core/photo';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption } from '../../core/drawing/theme';

const NO_FRAME_OPTIONS: ThemeOption[] = [];

const NO_FRAME_THEME_FUNC: ThemeFunc = (photo: Photo, _input, store) => {
  return sandbox(photo, {
    targetRatio: store.ratio,
    backgroundColor: '#ffffff',
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });
};

export { NO_FRAME_THEME_FUNC, NO_FRAME_OPTIONS };
