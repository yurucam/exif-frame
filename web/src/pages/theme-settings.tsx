import { Block, BlockTitle, Button, List, Navbar, Page, Tabbar, TabbarLink } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import SettingsIcon from '../icons/settings.icon';
import ImageIcon from '../icons/image.icon';
import GenerateIcon from '../icons/generate.icon';
import themes, { useThemeStore } from '../themes';
import ThemeListItem from '../components/theme.list-item';
import ThemeOptionListInput from '../components/theme-option.list-input';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import { useEffect, useState } from 'react';
import Photo from '../core/photo';
import { convertURLtoFile } from '../utils/convertURLtoFile';
import render from '../core/drawing/render';
import free from '../core/drawing/free';

const ThemeSettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { option } = useThemeStore();
  const store = useStore();
  const { selectedThemeName } = store;
  const [buttonClicked, setButtonClicked] = useState(0);
  const theme = themes.find((theme) => theme.name === selectedThemeName);
  theme?.options.forEach((themeOption) => {
    if (!option.has(themeOption.key)) option.set(themeOption.key, themeOption.default);
  });

  useEffect(() => {
    if (store.loading) return;

    (async () => {
      store.setLoading(true);
      const photo = await Photo.create(await convertURLtoFile('/preview.jpg'));
      const func = theme?.func;
      const canvas = await render(func!, photo, option, store);
      const preview = document.getElementById('preview') as HTMLCanvasElement;
      preview.width = 0;
      preview.height = 0;
      preview.width = canvas.width;
      preview.height = canvas.height;
      preview.getContext('2d')?.drawImage(canvas, 0, 0);
      free(canvas);
      store.setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClicked, selectedThemeName]);

  return (
    <Page style={{ paddingBottom: '10rem' }}>
      <Navbar large transparent title={t('root.themes')} />

      <BlockTitle>{t('root.themes.preview')}</BlockTitle>
      <Block>
        <div className="mx-auto w-4/5 lg:w-2/5">
          <canvas id="preview" style={{ width: '100%', objectFit: 'contain' }} />
          <div style={{ height: '0.5rem' }} />
          <Button onClick={() => setButtonClicked(buttonClicked + 1)}>{t('click-to-refresh')}</Button>
        </div>
      </Block>

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

      <Loading />
    </Page>
  );
};

export default ThemeSettingsPage;
