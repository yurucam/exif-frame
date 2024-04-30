import { ListInput, ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import ImageWidthIcon from '../../../icons/image-width.icon';

const FixImageWidthListItem = () => {
  const { t } = useTranslation();
  const { fixImageWidth, imageWidth, setFixImageWidth, setImageWidth } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.fix-image-width')} media={<ImageWidthIcon size={26} />} after={<Toggle checked={fixImageWidth} onChange={() => setFixImageWidth(!fixImageWidth)} />} />

      {fixImageWidth && <ListInput floatingLabel label={t('root.settings.image-width')} type="number" value={imageWidth} onChange={(e) => setImageWidth(e.target.value)} />}
    </>
  );
};

export default FixImageWidthListItem;
