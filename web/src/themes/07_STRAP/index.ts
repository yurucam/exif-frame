import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../../core/drawing/theme';

const supportLogo = new Map<string, HTMLImageElement>();

const loadLogo = (pathname: string): HTMLImageElement => {
  const image = new Image();
  image.src = pathname;
  return image;
};

supportLogo.set('APPLE_LIGHT', loadLogo('/maker/light/apple.png'));
supportLogo.set('APPLE_DARK', loadLogo('/maker/dark/apple.png'));
supportLogo.set('CANON_LIGHT', loadLogo('/maker/light/canon.png'));
supportLogo.set('CANON_DARK', loadLogo('/maker/dark/canon.png'));
supportLogo.set('FUJI_LIGHT', loadLogo('/maker/light/fujifilm.png'));
supportLogo.set('FUJI_DARK', loadLogo('/maker/dark/fujifilm.png'));
supportLogo.set('NIKON_LIGHT', loadLogo('/maker/light/nikon.png'));
supportLogo.set('NIKON_DARK', loadLogo('/maker/dark/nikon.png'));
supportLogo.set('OLYMPUS_LIGHT', loadLogo('/maker/light/olympus.png'));
supportLogo.set('OLYMPUS_DARK', loadLogo('/maker/dark/olympus.png'));
supportLogo.set('PANASONIC_LIGHT', loadLogo('/maker/light/panasonic.png'));
supportLogo.set('PANASONIC_DARK', loadLogo('/maker/dark/panasonic.png'));
supportLogo.set('SAMSUNG_LIGHT', loadLogo('/maker/light/samsung.png'));
supportLogo.set('SAMSUNG_DARK', loadLogo('/maker/dark/samsung.png'));
supportLogo.set('SONY_LIGHT', loadLogo('/maker/light/sony.png'));
supportLogo.set('SONY_DARK', loadLogo('/maker/dark/sony.png'));

const STRAP_OPTIONS: ThemeOption[] = [
  { key: 'ARTIST', type: String, default: 'Your Name', description: 'your name' },
  { key: 'DARK_MODE', type: String, default: 'no', description: 'yes or no' },
];

const STRAP_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const ARTIST = (input.get('ARTIST') as string).trim();
  const DARK_MODE = (input.get('DARK_MODE') as string).trim() === 'yes';
  const PADDING_BOTTOM = 300;
  const FONT_SIZE = 70;
  const BACKGROUND_COLOR = DARK_MODE ? '#000000' : '#ffffff';
  const PRIMARY_TEXT_COLOR = DARK_MODE ? '#ffffff' : '#000000';
  const SECONDARY_TEXT_COLOR = DARK_MODE ? '#888888' : '#333333';

  const canvas = sandbox(photo, BACKGROUND_COLOR, { top: 0, right: 0, bottom: PADDING_BOTTOM, left: 0 });
  const context = canvas.getContext('2d')!;
  context.textBaseline = 'middle';

  // LEFT FIRST
  context.textAlign = 'left';

  // ISO, Focal Length, F-Number, Exposure Time
  context.font = `normal 500 ${FONT_SIZE}px Barlow`;
  context.fillStyle = PRIMARY_TEXT_COLOR;
  context.fillText(
    [`ISO ${photo.iso}`, `${photo.focalLength}`, `${photo.fNumber}`, `${photo.exposureTime}s`]
      .filter(Boolean)
      .map((value) => value.trim())
      .join('  '),
    FONT_SIZE,
    canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 2
  );

  // Shot by
  context.font = `normal 100 ${FONT_SIZE}px Barlow`;
  context.fillStyle = SECONDARY_TEXT_COLOR;
  context.fillText(`Shot by © ${ARTIST}`, FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 2);

  // RIGHT SECOND
  context.textAlign = 'right';

  // Maker, Model
  context.fillStyle = PRIMARY_TEXT_COLOR;
  context.font = `normal 500 ${FONT_SIZE}px Barlow`;
  const makerModelText = [
    store.showCameraMaker ? store.overrideCameraMaker || photo.make : null,
    store.showCameraModel ? store.overrideCameraModel || photo.model : null,
  ]
    .filter(Boolean)
    .map((value) => value!.trim())
    .join(' ');
  const topWidth = context.measureText(makerModelText).width;
  context.fillText(makerModelText, canvas.width - FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 2);

  // Lens Model
  context.fillStyle = SECONDARY_TEXT_COLOR;
  context.font = `normal 100 ${FONT_SIZE}px Barlow`;
  const lensModelText = [store.showLensModel ? store.overrideLensModel || photo.lensModel : null]
    .filter(Boolean)
    .map((value) => value!.trim())
    .join(' ');
  const bottomWidth = context.measureText(lensModelText).width;
  context.fillText(lensModelText, canvas.width - FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 2);

  // DRAW LINE
  context.beginPath();
  context.moveTo(canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2, canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE);
  context.lineTo(canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE);
  context.strokeStyle = SECONDARY_TEXT_COLOR;
  context.lineWidth = 2;
  context.stroke();

  // DRAW ICON
  let TARGET_LOGO_HEIGHT = FONT_SIZE * 2;
  const TARGET_LOGO_WIDTH = 400;

  let logo: HTMLImageElement | undefined;

  if (photo.make?.toUpperCase().includes('APPLE') || photo.model?.toUpperCase().includes('APPLE')) {
    logo = DARK_MODE ? supportLogo.get('APPLE_DARK') : supportLogo.get('APPLE_LIGHT');
  }

  if (photo.make?.toUpperCase().includes('CANON') || photo.model?.toUpperCase().includes('CANON')) {
    logo = DARK_MODE ? supportLogo.get('CANON_DARK') : supportLogo.get('CANON_LIGHT');
  }

  if (photo.make?.toUpperCase().includes('FUJI') || photo.model?.toUpperCase().includes('FUJI')) {
    logo = DARK_MODE ? supportLogo.get('FUJI_DARK') : supportLogo.get('FUJI_LIGHT');
  }

  if (photo.make?.toUpperCase().includes('NIKON') || photo.model?.toUpperCase().includes('NIKON')) {
    logo = DARK_MODE ? supportLogo.get('NIKON_DARK') : supportLogo.get('NIKON_LIGHT');
  }

  if (photo.make?.toUpperCase().includes('OLYMPUS') || photo.model?.toUpperCase().includes('OLYMPUS')) {
    logo = DARK_MODE ? supportLogo.get('OLYMPUS_DARK') : supportLogo.get('OLYMPUS_LIGHT');
  }

  if (photo.make?.toUpperCase().includes('PANASONIC') || photo.model?.toUpperCase().includes('PANASONIC')) {
    logo = DARK_MODE ? supportLogo.get('PANASONIC_DARK') : supportLogo.get('PANASONIC_LIGHT');
  }

  if (photo.make?.toUpperCase().includes('SONY') || photo.model?.toUpperCase().includes('SONY')) {
    logo = DARK_MODE ? supportLogo.get('SONY_DARK') : supportLogo.get('SONY_LIGHT');
  }

  if (photo.make?.toUpperCase().includes('SAMSUNG') || photo.model?.toUpperCase().includes('SAMSUNG')) {
    logo = DARK_MODE ? supportLogo.get('SAMSUNG_DARK') : supportLogo.get('SAMSUNG_LIGHT');
  }

  if (logo) {
    let LOGO_WIDTH = (logo.width / logo.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (logo.height / logo.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      logo,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  return canvas;
};

export { STRAP_FUNC, STRAP_OPTIONS };
