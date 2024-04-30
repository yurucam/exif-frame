import Photo from '../../core/photo';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption } from '../../pages/theme/types/theme-option';

const NO_FRAME_OPTIONS: ThemeOption[] = [];

const NO_FRAME_THEME_FUNC: ThemeFunc = (photo: Photo, _input, store) => {
  return sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: '#ffffff',
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });
};

export { NO_FRAME_THEME_FUNC, NO_FRAME_OPTIONS };
