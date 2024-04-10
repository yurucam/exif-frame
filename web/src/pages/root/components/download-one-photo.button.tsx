import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';
import downloadOneFile from '../../../core/download-one-file';
import Photo from '../../../core/photo';
import themes from '../../../themes';
import canvasToWebp from '../../../core/canvas-to-webp';
import { IoDownloadOutline } from 'react-icons/io5';
import draw from '../../../themes/draw';
import canvasToJpeg from '../../../core/canvas-to-jpeg';
import { downloadOnePhotoEvent } from '../../../google-analytics';

interface DownloadOnePhotoButtonProps {
  photo: Photo;
}

const DownloadOnePhotoButton: React.FC<DownloadOnePhotoButtonProps> = ({ photo }) => {
  const {
    exportToJpeg,
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
    <div className="w-10">
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
