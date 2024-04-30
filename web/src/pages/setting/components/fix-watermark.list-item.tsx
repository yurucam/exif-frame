import { ListInput, ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import WatermarkIcon from '../../../icons/watermark.icon';

const FixWatermarkListItem = () => {
  const { t } = useTranslation();
  const { fixWatermark, watermark, setFixWatermark, setWatermark } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.fix-watermark')} media={<WatermarkIcon size={26} />} after={<Toggle checked={fixWatermark} onChange={() => setFixWatermark(!fixWatermark)} />} />

      {fixWatermark && <ListInput floatingLabel label={t('root.settings.watermark')} type="text" value={watermark} onChange={(e) => setWatermark(e.target.value)} />}
    </>
  );
};

export default FixWatermarkListItem;
