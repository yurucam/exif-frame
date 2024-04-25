import { BlockTitle, List, Navbar, Page, Tabbar, TabbarLink } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import SettingsIcon from '../icons/settings.icon';
import ImageIcon from '../icons/image.icon';
import GenerateIcon from '../icons/generate.icon';
import themes from '../themes';
import ThemeListItem from '../components/theme.list-item';
import ThemeOptionListInput from '../components/theme-option.list-input';
import { useNavigate } from 'react-router-dom';

const ThemeSettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectedThemeName } = useStore();
  const theme = themes.find((theme) => theme.name === selectedThemeName);

  return (
    <Page style={{ paddingBottom: '10rem' }}>
      <Navbar large transparent title={t('root.themes')} />

      <BlockTitle>{t('root.themes.list')}</BlockTitle>

      <List strongIos inset>
        {themes.map((theme, index) => (
          <ThemeListItem key={index} name={theme.name} />
        ))}
      </List>

      {theme?.options.length !== 0 && <BlockTitle>{t('root.themes.customize')}</BlockTitle>}

      <List strongIos inset>
        {theme?.options.map((option, index) => {
          return <ThemeOptionListInput index={index} optionKey={option.key} description={option.description} defaultValue={option.default} type={option.type} />;
        })}
      </List>

      <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
        <TabbarLink key={1} active={false} label={t('root.tab.convert')} icon={<GenerateIcon size={24} />} onClick={() => navigate('/')} />
        <TabbarLink key={2} active={true} label={t('root.tab.theme-settings')} icon={<ImageIcon size={24} />} onClick={() => navigate('/theme-settings')} />
        <TabbarLink key={3} active={false} label={t('root.tab.export-settings')} icon={<SettingsIcon size={24} />} onClick={() => navigate('/export-settings')} />
      </Tabbar>
    </Page>
  );
};

export default ThemeSettingsPage;
