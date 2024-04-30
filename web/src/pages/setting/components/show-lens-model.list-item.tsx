import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import LensIcon from '../../../icons/lens.icon';

const ShowLensModelListItem = () => {
  const { t } = useTranslation();
  const { showLensModel, setShowLensModel } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.show-lens-model')} media={<LensIcon size={26} />} after={<Toggle checked={showLensModel} onChange={() => setShowLensModel(!showLensModel)} />} />
    </>
  );
};

export default ShowLensModelListItem;
