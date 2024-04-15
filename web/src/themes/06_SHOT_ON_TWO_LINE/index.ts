import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../../core/drawing/theme';

const SHOT_ON_TWO_LINE_OPTIONS: ThemeOption[] = [
  { key: 'BACKGROUND_COLOR', type: String, default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { key: 'TEXT_COLOR', type: String, default: '#000000', description: '#ffffff is white, #000000 is black' },
  { key: 'TOP_LABEL', type: String, default: '', description: 'ex. @username' },
];

const SHOT_ON_TWO_LINE_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const TEXT_COLOR = input.get('TEXT_COLOR') as string;
  const TOP_LABEL = (input.get('TOP_LABEL') as string).trim();

  const canvas = sandbox(photo, BACKGROUND_COLOR, { top: 200, right: 50, bottom: 300, left: 50 });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'middle';
  context.textAlign = 'center';

  // DRAW TOP LABEL
  context.font = `normal 100 50px Barlow`;
  context.fillText(TOP_LABEL, canvas.width / 2, 125);

  // shot on ${MAKER} ${MODEL}
  context.font = `normal 500 80px Barlow`;
  context.fillText(
    `shot on ${[
      store.showCameraMaker ? store.overrideCameraMaker || photo.make : null,
      store.showCameraModel ? store.overrideCameraModel || photo.model : null,
    ]
      .filter(Boolean)
      .join(' ')}`,
    canvas.width / 2,
    canvas.height - 200
  );

  // ISO ${ISO} | ${F} ${FocalLength} | ${ShutterSpeed}s
  context.font = `normal 100 50px Barlow`;

  if (!store.disableExposureMeter) {
    context.fillText(
      [
        `ISO ${photo.iso}`,
        `${store.focalLength35mmMode ? photo.focalLengthIn35mm : photo.focalLength}`,
        `${photo.fNumber}`,
        `${photo.exposureTime}s`,
      ]
        .filter(Boolean)
        .join('    '),
      canvas.width / 2,
      canvas.height - 100
    );
  }

  return canvas;
};

export { SHOT_ON_TWO_LINE_FUNC, SHOT_ON_TWO_LINE_OPTIONS };
