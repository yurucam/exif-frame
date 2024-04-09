import { List, ListItem, Popover } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import { supportLanguages } from '../../../locales';

const LanguagePopover = () => {
  const { t, i18n } = useTranslation();
  const { languagePopover, setLanguagePopover, setLanguage } = useStore();

  return (
    <Popover opened={languagePopover} target={'.language-name'} onBackdropClick={() => setLanguagePopover(false)}>
      <List nested>
        {supportLanguages.map((language) => (
          <ListItem
            key={language}
            title={t(language)}
            link
            chevronIos={false}
            onClick={() => {
              i18n.changeLanguage(language);
              setLanguage(language as never);
              setLanguagePopover(false);
            }}
          />
        ))}
      </List>
    </Popover>
  );
};

export default LanguagePopover;
