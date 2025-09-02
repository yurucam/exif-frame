import { Button } from 'konsta/react';
import { IoDownloadOutline } from 'react-icons/io5';
import { useLoadingStore } from '../../../state/loading.store';
import { usePictureStore } from '../../../state/picture.store';
import { useSettingStore } from '../../../state/setting.store';
import { useThemeStore } from '../../../state/theme.store';
import { dumpExifMetadata, replaceExifMetadata } from 'exif-curator';
import { SvgConverter } from '../../../core/svg/converter';
import download from '../../../core/download';
import { useTranslation } from 'react-i18next';

export const DownloadAllPicturesButton = () => {
  const { t } = useTranslation();
  const { pictures } = usePictureStore();
  const { svg } = useThemeStore();
  const { webpMode } = useSettingStore();
  const { setLoading } = useLoadingStore();

  const handleClick = async () => {
    if (!pictures || pictures.length === 0) return;
    setLoading(true);
    try {
      const fileExtension = webpMode ? 'webp' : 'jpeg';
      for (const picture of pictures) {
        const dumpedExifMetadata = await dumpExifMetadata(await picture.loadDataUrl());
        const convertedImage = webpMode ? await SvgConverter.toWebp(svg, picture) : await SvgConverter.toJpeg(svg, picture);
        const blob = new Blob([await replaceExifMetadata(convertedImage, dumpedExifMetadata)], { type: `image/${fileExtension}` });
        const url = URL.createObjectURL(blob);
        const baseName = picture.file.name.replace(/\.[^.]+$/, '');
        await download(`exif_frame_${baseName}.${fileExtension}`, url);
        URL.revokeObjectURL(url);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button clear onClick={handleClick} disabled={!pictures || pictures.length === 0}>
        <IoDownloadOutline size={18} />
        <div style={{ width: 4 }} />
        {t('download-all')}
      </Button>
    </>
  );
};
