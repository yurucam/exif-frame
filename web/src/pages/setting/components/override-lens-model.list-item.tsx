import { ListInput } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import LensIcon from '../../../icons/lens.icon';

const OverrideLensModelListItem = () => {
  const { t } = useTranslation();
  const { showLensModel, overrideLensModel, setOverrideLensModel } = useStore();

  if (!showLensModel) return null;

  return (
    <>
      <ListInput
        floatingLabel
        label={t('root.settings.override-lens-model')}
        media={<LensIcon size={26} />}
        type="text"
        value={overrideLensModel}
        onChange={(e) => setOverrideLensModel(e.target.value)}
      />
    </>
  );
};

export default OverrideLensModelListItem;
