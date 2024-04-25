import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../../core/drawing/theme';

const FILM_OPTIONS: ThemeOption[] = [
  { key: 'TEXT_COLOR', type: String, default: '#FFA500', description: 'default is orange hex code' },
  { key: 'BACKGROUND_COLOR', type: String, default: '#000000', description: '#ffffff is white, #000000 is black' },
  { key: 'PADDING_TOP', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_BOTTOM', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_LEFT', type: Number, default: 0, description: 'px' },
  { key: 'PADDING_RIGHT', type: Number, default: 0, description: 'px' },
];

const FILM_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const TEXT_COLOR = input.get('TEXT_COLOR') as string;
  const BACKGROUND_COLOR = (input.get('BACKGROUND_COLOR') as string).trim();
  const PADDING_TOP = input.get('PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('PADDING_RIGHT') as number;

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'bottom';

  if (!store.disableExposureMeter) {
    context.textAlign = 'right';
    context.font = `100px digital-7`;
    context.fillText(`${photo.iso}`, canvas.width - 100, canvas.height - 100);
    context.fillText(`${photo.exposureTime}`, canvas.width - 100, canvas.height - 200);
    context.fillText(`${photo.fNumber?.replace('f/', '')}`, canvas.width - 100, canvas.height - 300);
    const isoWidth = context.measureText(`${photo.iso}`).width;
    const exposureTimeWidth = context.measureText(`${photo.exposureTime}`).width;
    const fNumberWidth = context.measureText(`${photo.fNumber?.replace('f/', '')}`).width;

    context.font = `70px digital-7`;
    context.fillText('ISO', canvas.width - 100 - isoWidth - 20, canvas.height - 105);
    context.fillText('SEC', canvas.width - 100 - exposureTimeWidth - 20, canvas.height - 205);
    context.fillText('F', canvas.width - 100 - fNumberWidth - 20, canvas.height - 305);
  }

  context.font = `70px digital-7`;
  context.textAlign = 'left';
  context.fillText(
    [store.showLensModel ? store.overrideLensModel || photo.lensModel : null]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' '),
    100,
    canvas.height - 105
  );
  context.fillText(
    [store.showCameraMaker ? store.overrideCameraMaker || photo.make : null, store.showCameraModel ? store.overrideCameraModel || photo.model : null]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' '),
    100,
    canvas.height - 205
  );

  return canvas;
};

export { FILM_FUNC, FILM_OPTIONS };
