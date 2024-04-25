import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../../core/drawing/theme';

const SHOT_ON_ONE_LINE_OPTIONS: ThemeOption[] = [
  { key: 'BACKGROUND_COLOR', type: String, default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { key: 'TEXT_COLOR', type: String, default: '#000000', description: '#ffffff is white, #000000 is black' },
  { key: 'PADDING_TOP', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_BOTTOM', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_LEFT', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_RIGHT', type: Number, default: 0, description: 'px' },
];

const SHOT_ON_ONE_LINE_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const TEXT_COLOR = input.get('TEXT_COLOR') as string;
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = (input.get('PADDING_BOTTOM') as number) + 200;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;
  const FONT_SIZE = 70;

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'middle';
  context.font = `normal 100 ${FONT_SIZE}px Barlow`;
  context.textAlign = 'right';

  if (!store.disableExposureMeter) {
    context.fillText(
      [`ISO ${photo.iso}`, `${store.focalLength35mmMode ? photo.focalLengthIn35mm : photo.focalLength}`, `${photo.fNumber}`, `${photo.exposureTime}s`]
        .filter(Boolean)
        .map((value) => value.trim())
        .join('  '),
      canvas.width - FONT_SIZE,
      canvas.height - PADDING_BOTTOM / 2
    );
  }

  context.textAlign = 'left';
  context.font = `normal 100 ${FONT_SIZE}px Barlow`;
  context.fillText(`Shot on  `, FONT_SIZE, canvas.height - PADDING_BOTTOM / 2);
  const shotOnWidth = context.measureText('Shot on  ').width;

  context.font = `normal 500 ${FONT_SIZE}px Barlow`;
  context.fillText(
    [
      store.showCameraMaker ? store.overrideCameraMaker || photo.make : null,
      store.showCameraModel ? store.overrideCameraModel || photo.model : null,
      store.showLensModel ? store.overrideLensModel || photo.lensModel : null,
    ]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' '),
    shotOnWidth + FONT_SIZE,
    canvas.height - PADDING_BOTTOM / 2
  );

  return canvas;
};

export { SHOT_ON_ONE_LINE_FUNC, SHOT_ON_ONE_LINE_OPTIONS };
