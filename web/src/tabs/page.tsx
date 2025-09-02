import { Page, Tabbar, TabbarLink } from 'konsta/react';
import { GalleryTab } from './gallery/tab';
import { ThemeTab } from './theme/tab';
import { SettingTab } from './setting/tab';
import { useEffect } from 'react';
import { RiGalleryFill, RiSettings3Fill } from 'react-icons/ri';
import { MdDesignServices } from 'react-icons/md';
import { useSettingStore } from '../state/setting.store';
import Loading from './loading';
import { useTabIndexStore } from '../state/tab-index.store';

export const MainPage = () => {
  const { tabIndex, setTabIndex } = useTabIndexStore();
  const initializeDarkMode = useSettingStore((state) => state.initializeDarkMode);

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  return (
    <>
      <Loading />
      <Page style={{ paddingBottom: '10rem' }}>
        {tabIndex === 0 ? <GalleryTab /> : <></>}
        {tabIndex === 1 ? <ThemeTab /> : <></>}
        {tabIndex === 2 ? <SettingTab /> : <></>}

        <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
          <TabbarLink key={1} active={tabIndex == 0} label={'Gallery'} icon={<RiGalleryFill size={24} />} onClick={() => setTabIndex(0)} />
          <TabbarLink key={2} active={tabIndex == 1} label={'Theme'} icon={<MdDesignServices size={24} />} onClick={() => setTabIndex(1)} />
          <TabbarLink key={3} active={tabIndex == 2} label={'Setting'} icon={<RiSettings3Fill size={24} />} onClick={() => setTabIndex(2)} />
        </Tabbar>
      </Page>
    </>
  );
};
