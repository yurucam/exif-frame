import { BlockTitle, List, ListItem, Navbar, Page, Tabbar, TabbarLink, Toolbar } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import DarkModeListItem from './components/dark-mode.list-item';
import LanguageListItem from './components/language.list-item';
import LanguagePopover from './components/language.popover';
import QualityListItem from './components/quality.list-item';
import FixImageWidthListItem from './components/fix-image-width.list-item';
import ShowCameraMakerListItem from './components/show-camera-maker.list-item';
import ShowCameraModelListItem from './components/show-camera-model.list-item';
import ShowLensModelListItem from './components/show-lens-model.list-item';
import OverrideCameraMakerListItem from './components/override-camera-maker.list-item';
import OverrideCameraModelListItem from './components/override-camera-model.list-item';
import OverrideLensModelListItem from './components/override-lens-model.list-item';
import AddPhotoButton from './components/add-photo.button';
import { useStore } from '../../store';
import DownloadOnePhotoButton from './components/download-one-photo.button';
import RemoveOnePhotoButton from './components/remove-one-photo.button';
import DownloadAllPhotoButton from './components/download-all-photo.button';
import Loading from './components/loading';
import OverrideMetadataPopup from './components/override-metadata.popup';
import OverrideMetadataButton from './components/override-metadata.button';
import FixWatermarkListItem from './components/fix-watermark.list-item';
import ExportToJpegListItem from './components/export-to-jpeg.list-item';
import RemoveAllPhotoButton from './components/remove-all-photo.button';
import SettingsIcon from '../../icons/settings.icon';
import ImageIcon from '../../icons/image.icon';
import GenerateIcon from '../../icons/generate.icon';
import BugReportListItem from './components/bug-report.list-item';
import FeatureRequestListItem from './components/feature-request.list-item';
import ReleasesListItem from './components/releases.list-item';
import CurrentVersionListItem from './components/current-version.list-item';
import themes from '../../themes';
import ThemeListItem from './components/theme.list-item';
import ThemeOptionListInput from './components/theme-option.list-input';
import FocalLength35mmModeListItem from './components/focal-length-35mm-mode';

const RootPage = () => {
  const { t } = useTranslation();
  const { focalLength35mmMode, photos, selectedThemeName, tabIndex, setTabIndex } = useStore();
  const theme = themes.find((theme) => theme.name === selectedThemeName);

  return (
    <Page style={{ paddingBottom: '10rem' }}>
      {tabIndex === 1 && (
        <>
          <Navbar large transparent title={t('root.convert')} />

          <Toolbar className="bottom-12 fixed">
            <AddPhotoButton />
            <DownloadAllPhotoButton />
          </Toolbar>

          {photos.length !== 0 && (
            <BlockTitle>
              {t('root.loaded-photos')}
              <RemoveAllPhotoButton />
            </BlockTitle>
          )}

          <List id="list" strongIos inset>
            {photos.map((photo, index) => (
              <ListItem
                key={index}
                media={
                  <img
                    src={photo.thumbnail}
                    alt={photo.file.name}
                    style={{ width: '8rem', height: '6rem', objectFit: 'cover', borderRadius: '0.5rem' }}
                  />
                }
                title={photo.file.name}
                subtitle={`${focalLength35mmMode ? photo.focalLengthIn35mm : photo.focalLength} ${photo.fNumber} ISO${photo.iso} ${
                  photo.exposureTime
                }s`}
                text={`${photo.make} ${photo.model} ${photo.lensModel}`}
                footer={
                  <div className="flex space-x-1 mt-1">
                    <OverrideMetadataButton photo={photo} />
                    <DownloadOnePhotoButton photo={photo} />
                    <RemoveOnePhotoButton index={index} />
                  </div>
                }
              />
            ))}
          </List>
        </>
      )}

      {tabIndex === 2 && (
        <>
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
              return (
                <ThemeOptionListInput
                  index={index}
                  optionKey={option.key}
                  description={option.description}
                  defaultValue={option.default}
                  type={option.type}
                />
              );
            })}
          </List>
        </>
      )}

      {tabIndex === 3 && (
        <>
          <Navbar large transparent title={t('root.settings')} />

          <List strongIos inset>
            <DarkModeListItem />
            <LanguageListItem />
            <FixWatermarkListItem />
          </List>

          <List strongIos inset>
            <ExportToJpegListItem />
            <QualityListItem />
            <FixImageWidthListItem />
            <FocalLength35mmModeListItem />
          </List>

          <List strongIos inset>
            <ShowCameraMakerListItem />
            <ShowCameraModelListItem />
            <ShowLensModelListItem />
          </List>

          <List strongIos inset>
            <OverrideCameraMakerListItem />
            <OverrideCameraModelListItem />
            <OverrideLensModelListItem />
          </List>

          <List strongIos inset>
            <BugReportListItem />
            <FeatureRequestListItem />
            <ReleasesListItem />
          </List>

          <List strongIos inset>
            <CurrentVersionListItem />
          </List>
        </>
      )}

      <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
        <TabbarLink
          key={1}
          active={tabIndex === 1}
          label={t('root.tab.convert')}
          icon={<GenerateIcon size={24} />}
          onClick={() => setTabIndex(1)}
        />

        <TabbarLink
          key={2}
          active={tabIndex === 2}
          label={t('root.tab.theme-settings')}
          icon={<ImageIcon size={24} />}
          onClick={() => setTabIndex(2)}
        />

        <TabbarLink
          key={3}
          active={tabIndex === 3}
          label={t('root.tab.export-settings')}
          icon={<SettingsIcon size={24} />}
          onClick={() => setTabIndex(3)}
        />
      </Tabbar>

      <LanguagePopover />
      <OverrideMetadataPopup />

      <Loading />
    </Page>
  );
};

export default RootPage;
