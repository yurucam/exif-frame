import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../00_BASE/sandbox';
import { ThemeFunc, ThemeOption, ThemeOptionInput } from '../00_BASE/type';

const APPLE_LOGO = new Image();
APPLE_LOGO.src = '/maker/apple.png';

const CANON_LOGO = new Image();
CANON_LOGO.src = '/maker/canon.png';

const FUJI_LOGO = new Image();
FUJI_LOGO.src = '/maker/fujifilm.png';

const NIKON_LOGO = new Image();
NIKON_LOGO.src = '/maker/nikon.png';

const OLYMPUS_LOGO = new Image();
OLYMPUS_LOGO.src = '/maker/olympus.png';

const PANASONIC_LOGO = new Image();
PANASONIC_LOGO.src = '/maker/panasonic.png';

const SAMSUNG_LOGO = new Image();
SAMSUNG_LOGO.src = '/maker/samsung.png';

const SONY_LOGO = new Image();
SONY_LOGO.src = '/maker/sony.png';

const STRAP_OPTIONS: ThemeOption[] = [{ key: 'ARTIST', type: String, default: 'Your Name', description: 'your name' }];

const STRAP_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const ARTIST = (input.get('ARTIST') as string).trim();
  const PADDING_BOTTOM = 300;
  const FONT_SIZE = 70;

  const canvas = sandbox(photo, '#ffffff', { top: 0, right: 0, bottom: PADDING_BOTTOM, left: 0 });

  const context = canvas.getContext('2d')!;
  context.textBaseline = 'middle';
  context.fillStyle = '#000000';
  context.textAlign = 'left';
  context.font = `normal 500 ${FONT_SIZE}px Barlow`;
  context.fillText(
    [`ISO ${photo.iso}`, `${photo.focalLength}`, `${photo.fNumber}`, `${photo.exposureTime}s`]
      .filter(Boolean)
      .map((value) => value.trim())
      .join('  '),
    FONT_SIZE,
    canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 2
  );

  context.font = `normal 100 ${FONT_SIZE}px Barlow`;
  context.fillStyle = '#333333';
  context.fillText(`Shot by © ${ARTIST}`, FONT_SIZE, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 2);

  context.fillStyle = '#000000';
  context.textAlign = 'right';
  context.font = `normal 500 ${FONT_SIZE}px Barlow`;
  const topWidth = context.measureText(
    [
      store.showCameraMaker ? store.overrideCameraMaker || photo.make : null,
      store.showCameraModel ? store.overrideCameraModel || photo.model : null,
    ]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' ')
  ).width;
  context.fillText(
    [
      store.showCameraMaker ? store.overrideCameraMaker || photo.make : null,
      store.showCameraModel ? store.overrideCameraModel || photo.model : null,
    ]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' '),
    canvas.width - FONT_SIZE,
    canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 2
  );

  context.fillStyle = '#333333';
  context.font = `normal 100 ${FONT_SIZE}px Barlow`;
  const bottomWidth = context.measureText(
    [store.showLensModel ? store.overrideLensModel || photo.lensModel : null]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' ')
  ).width;
  context.fillText(
    [store.showLensModel ? store.overrideLensModel || photo.lensModel : null]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' '),
    canvas.width - FONT_SIZE,
    canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 2
  );

  context.beginPath();
  context.moveTo(canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2, canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE);
  context.lineTo(canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE);
  context.strokeStyle = '#333333';
  context.lineWidth = 2;
  context.stroke();

  let TARGET_LOGO_HEIGHT = FONT_SIZE * 2;
  const TARGET_LOGO_WIDTH = 400;

  if (photo.make?.toUpperCase().includes('APPLE')) {
    let LOGO_WIDTH = (APPLE_LOGO.width / APPLE_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (APPLE_LOGO.height / APPLE_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      APPLE_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  if (photo.make?.toUpperCase().includes('CANON')) {
    let LOGO_WIDTH = (CANON_LOGO.width / CANON_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (CANON_LOGO.height / CANON_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      CANON_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  if (photo.make?.toUpperCase().includes('SONY')) {
    let LOGO_WIDTH = (SONY_LOGO.width / SONY_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (SONY_LOGO.height / SONY_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      SONY_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  if (photo.make?.toUpperCase().includes('NIKON')) {
    let LOGO_WIDTH = (NIKON_LOGO.width / NIKON_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (NIKON_LOGO.height / NIKON_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      NIKON_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  if (photo.make?.toUpperCase().includes('FUJI')) {
    let LOGO_WIDTH = (FUJI_LOGO.width / FUJI_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (FUJI_LOGO.height / FUJI_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      FUJI_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  if (photo.make?.toUpperCase().includes('OLYMPUS')) {
    let LOGO_WIDTH = (OLYMPUS_LOGO.width / OLYMPUS_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (OLYMPUS_LOGO.height / OLYMPUS_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      OLYMPUS_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  if (photo.make?.toUpperCase().includes('PANASONIC')) {
    let LOGO_WIDTH = (PANASONIC_LOGO.width / PANASONIC_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (PANASONIC_LOGO.height / PANASONIC_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      PANASONIC_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  if (photo.make?.toUpperCase().includes('SAMSUNG')) {
    let LOGO_WIDTH = (SAMSUNG_LOGO.width / SAMSUNG_LOGO.height) * TARGET_LOGO_HEIGHT;
    if (LOGO_WIDTH > TARGET_LOGO_WIDTH) {
      LOGO_WIDTH = TARGET_LOGO_WIDTH;
      TARGET_LOGO_HEIGHT = (SAMSUNG_LOGO.height / SAMSUNG_LOGO.width) * TARGET_LOGO_WIDTH;
    }
    context.drawImage(
      SAMSUNG_LOGO,
      canvas.width - Math.max(topWidth, bottomWidth) - FONT_SIZE * 2 - FONT_SIZE - LOGO_WIDTH,
      canvas.height - PADDING_BOTTOM / 2 - TARGET_LOGO_HEIGHT / 2,
      LOGO_WIDTH,
      TARGET_LOGO_HEIGHT
    );
  }

  return canvas;
};

export { STRAP_FUNC, STRAP_OPTIONS };
