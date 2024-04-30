import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '../../../icons/language.icon';
import { useStore } from '../../../store';

const LanguageListItem = () => {
  const { t, i18n } = useTranslation();
  const { setLanguagePopover } = useStore();

  return (
    <ListItem media={<LanguageIcon size={26} />} title={t('root.settings.language')} after={<div className="language-name">{t(i18n.language)}</div>} onClick={() => setLanguagePopover(true)} link />
  );
};

export default LanguageListItem;
