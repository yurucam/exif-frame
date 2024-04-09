import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';
import downloadOneFile from '../../../core/download-one-file';
import Photo from '../../../core/photo';
import themes from '../../../themes';
import canvasToWebp from '../../../core/canvas-to-webp';
import { IoDownloadOutline } from 'react-icons/io5';
import draw from '../../../themes/draw';

interface DownloadOnePhotoButtonProps {
  photo: Photo;
}

const DownloadOnePhotoButton: React.FC<DownloadOnePhotoButtonProps> = ({ photo }) => {
  const {
    selectedThemeName,
    quality,
    fixImageWidth,
    imageWidth,
    fixWatermark,
    watermark,
    showCameraMaker,
    showCameraModel,
    showLensModel,
    overrideCameraMaker,
    overrideCameraModel,
    overrideLensModel,
    setLoading,
  } = useStore();

  const selectedTheme = themes.find((theme) => theme.name === selectedThemeName)!;

  return (
    <Button
      onClick={async () => {
        setLoading(true);
        const canvas = await draw(selectedTheme.func, photo, {
          watermark: fixWatermark ? watermark : undefined,
          imageWidth: fixImageWidth ? imageWidth : undefined,
          showCameraMaker,
          showCameraModel,
          showLensModel,
          overrideCameraMaker,
          overrideCameraModel,
          overrideLensModel,
        });
        await downloadOneFile({ name: photo.file.name, buffer: await canvasToWebp(canvas, quality) });
        setLoading(false);
      }}
    >
      <Icon ios={<IoDownloadOutline className="w-5 h-5" />} />
    </Button>
  );
};

export default DownloadOnePhotoButton;
