import { BlockTitle, List, Navbar, Page, Tabbar, TabbarLink } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store';
import SettingsIcon from '../../icons/settings.icon';
import ImageIcon from '../../icons/image.icon';
import GenerateIcon from '../../icons/generate.icon';
import themes from '../../themes';
import ThemeListItem from './components/theme.list-item';
import ThemeOptionListInput from './components/theme-option.list-input';
import Loading from '../convert/components/loading';
import ThemeOptionResetButton from './components/theme-option-reset.button';
import Preview from './components/preview';
import RerenderButton from './components/rerender.button';

const ThemeSettingsPage = () => {
  const { t } = useTranslation();
  const { selectedThemeName, setTabIndex } = useStore();
  const theme = themes.find((theme) => theme.name === selectedThemeName);

  return (
    <Page style={{ paddingBottom: '10rem' }}>
      <Navbar large transparent title={t('root.themes')} />

      <Preview />
      <div className="flex justify-center mt-4">
        <RerenderButton />
      </div>

      <BlockTitle>{t('root.themes.list')}</BlockTitle>
      <List strongIos inset>
        {themes.map((theme, index) => (
          <ThemeListItem key={index} name={theme.name} />
        ))}
      </List>

      {theme?.options.length !== 0 && (
        <BlockTitle>
          {t('root.themes.customize')}
          <ThemeOptionResetButton />
        </BlockTitle>
      )}
      <List strongIos inset>
        {theme?.options.map((option, index) => {
          return <ThemeOptionListInput {...option} key={index} />;
        })}
      </List>

      <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
        <TabbarLink key={1} active={false} label={t('root.tab.convert')} icon={<GenerateIcon size={24} />} onClick={() => setTabIndex(0)} />
        <TabbarLink key={2} active={true} label={t('root.tab.theme-settings')} icon={<ImageIcon size={24} />} onClick={() => setTabIndex(1)} />
        <TabbarLink key={3} active={false} label={t('root.tab.export-settings')} icon={<SettingsIcon size={24} />} onClick={() => setTabIndex(2)} />
      </Tabbar>

      <Loading />
    </Page>
  );
};

export default ThemeSettingsPage;
