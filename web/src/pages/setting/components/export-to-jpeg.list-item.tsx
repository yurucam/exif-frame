import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import JpegIcon from '../../../icons/jpeg.icon';

const ExportToJpegListItem = () => {
  const { t } = useTranslation();
  const { exportToJpeg, setExportToJpeg } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.export-to-jpeg')} media={<JpegIcon size={26} />} after={<Toggle checked={exportToJpeg} onChange={() => setExportToJpeg(!exportToJpeg)} />} />
    </>
  );
};

export default ExportToJpegListItem;
