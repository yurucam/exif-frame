import Photo from '../../core/photo';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption } from '../../pages/theme/types/theme-option';
import sandbox from '../../core/drawing/sandbox';
import { Store } from '../../store';
import { ThemeOptionInput } from '../../pages/theme/types/theme-option';

const CINEMATIC_OPTIONS: ThemeOption[] = [
  {
    type: 'color',
    id: 'backgroundColor',
    description: 'Background Color',
    default: '#000000',
  },
  {
    type: 'range-slider',
    id: 'letterboxSize',
    description: 'Letterbox Size',
    default: 15,
    min: 0,
    max: 40,
    step: 1,
  },
  {
    type: 'color',
    id: 'textColor',
    description: 'Text Color',
    default: '#ffffff',
  },
  {
    type: 'range-slider',
    id: 'textSize',
    description: 'Text Size',
    default: 18,
    min: 10,
    max: 50,
    step: 1,
  }
];

const CINEMATIC_FUNC: ThemeFunc = (photo: Photo, options: ThemeOptionInput, store: Store) => {
  const backgroundColor = (options.get('backgroundColor') as string) || '#000000';
  const letterboxSize = (options.get('letterboxSize') as number) ?? 15;
  const textColor = (options.get('textColor') as string) || '#ffffff';
  const textSize = (options.get('textSize') as number) ?? 18;

  const paddingSize = photo.image.height * (letterboxSize / 100);

  const canvas = sandbox(photo, {
    backgroundColor: backgroundColor,
    padding: {
      top: paddingSize,
      bottom: paddingSize,
      left: 0,
      right: 0,
    },
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
  });

  const ctx = canvas.getContext('2d')!;
  const bottomLetterboxY = canvas.height - paddingSize;

  const fontRatio = canvas.width / 1000;
  const actualTextSize = textSize * fontRatio;

  ctx.fillStyle = textColor;
  ctx.font = `normal 400 ${actualTextSize}px Barlow`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const textY = bottomLetterboxY + (paddingSize / 2);

  const exifText = [];
  if (photo.make || photo.model) exifText.push(`SHOT ON ${photo.make} ${photo.model}`.trim());
  if (photo.lensModel) exifText.push(photo.lensModel);
  if (photo.focalLength || photo.fNumber || photo.iso || photo.exposureTime) {
    const specs = [photo.focalLength, photo.fNumber, photo.iso ? `ISO${photo.iso}` : '', photo.exposureTime].filter(Boolean).join(' ');
    if (specs) exifText.push(specs);
  }

  exifText.forEach((line, index) => {
    const y = textY + (index - (exifText.length - 1) / 2) * actualTextSize * 1.5;
    ctx.fillText(line, canvas.width / 2, y);
  });

  return canvas;
};

export { CINEMATIC_FUNC, CINEMATIC_OPTIONS };
