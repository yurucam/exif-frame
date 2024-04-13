import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';
import downloadOneFile from '../../../core/download-one-file';
import Photo from '../../../core/photo';
import canvasToWebp from '../../../core/canvas-to-webp';
import { IoDownloadOutline } from 'react-icons/io5';
import canvasToJpeg from '../../../core/canvas-to-jpeg';
import { downloadOnePhotoEvent } from '../../../google-analytics';
import themes, { useThemeStore } from '../../../themes';
import render from '../../../themes/00_BASE/render';

interface DownloadOnePhotoButtonProps {
  photo: Photo;
}

const DownloadOnePhotoButton: React.FC<DownloadOnePhotoButtonProps> = ({ photo }) => {
  const store = useStore();
  const { selectedThemeName, exportToJpeg, quality, setLoading } = store;

  const { option } = useThemeStore();
  const theme = themes.find((theme) => theme.name === selectedThemeName);
  theme?.options.forEach((themeOption) => {
    if (!option.has(themeOption.key)) option.set(themeOption.key, themeOption.default);
  });
  const func = theme?.func;

  return (
    <div className="w-10">
      <Button
        onClick={async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 100));
          const canvas = await render(func!, photo, option, store);
          await downloadOneFile({
            name: photo.file.name,
            buffer: exportToJpeg ? await canvasToJpeg(canvas, quality) : await canvasToWebp(canvas, quality),
            type: exportToJpeg ? 'image/jpeg' : 'image/webp',
          });
          setLoading(false);
          downloadOnePhotoEvent();
        }}
      >
        <Icon ios={<IoDownloadOutline className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default DownloadOnePhotoButton;
