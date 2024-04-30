import render from '../../../core/drawing/render';
import { useEffect } from 'react';
import { useStore } from '../../../store';
import themes from '../../../themes';
import { ThemeOptionInput, getConverter } from '../types/theme-option';
import Customize from '../database/customize';
import free from '../../../core/drawing/free';

const Preview = () => {
  const store = useStore();
  const { selectedThemeName, rerenderOptions, tabIndex, darkMode } = useStore();

  useEffect(() => {
    const preview = document.getElementById('preview') as HTMLCanvasElement;
    preview.width = 0;
    preview.height = 0;

    if (store.photos.length === 0) return;
    if (tabIndex !== 1) return;

    const input: ThemeOptionInput = new Map<string, string | number | boolean>();
    const theme = themes.find((theme) => theme.name === selectedThemeName);
    theme?.options.forEach((option) => {
      const value = Customize.get(selectedThemeName, option.id, getConverter(option.type));
      if (value !== null) {
        input.set(option.id, value);
      } else {
        input.set(option.id, option.default);
      }
    });

    const func = theme?.func;

    render(func!, store.photos[0], input, store).then((canvas) => {
      const ctx = preview.getContext('2d')!;
      const ratio = canvas.width / canvas.height;
      if (preview.width > preview.height) {
        preview.width = 1000;
        preview.height = 1000 / ratio;
      } else {
        preview.height = 1000;
        preview.width = 1000 * ratio;
      }
      ctx.clearRect(0, 0, preview.width, preview.height);
      ctx.fillStyle = darkMode ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, preview.width, preview.height);
      ctx.fillStyle = '#ffffff';
      ctx.drawImage(canvas, 0, 0, preview.width, preview.height);
      free(canvas);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThemeName, rerenderOptions, tabIndex]);

  return <canvas id="preview" className="w-4/6 md:w-2/6 mx-auto mt-4" style={{ maxHeight: '1000px', maxWidth: '1000px', backgroundColor: darkMode ? '#000000' : '#ffffff' }} />;
};

export default Preview;
