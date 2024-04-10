import { BlockTitle, List, ListItem, Navbar, Page, Toolbar } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import OpenSettingsLink from './components/open-settings.link';
import OpenThemesLink from './components/open-themes.link';
import SettingsPanel from './components/settings.panel';
import ThemesPanel from './components/themes.panel';
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
import ThemeListItem from './components/theme.list-item';
import themes from '../../themes';
import AddPhotoButton from './components/add-photo.button';
import { useStore } from '../../store';
import DownloadOnePhotoButton from './components/download-one-photo.button';
import RemoveOnePhotoButton from './components/remove-one-photo.button';
import DownloadAllPhotoButton from './components/download-all-photo.button';
import BugReportButton from './components/bug-report.button';
import Loading from './components/loading';
import ReleasesButton from './components/releases.button';
import OverrideMetadataPopup from './components/override-metadata.popup';
import OverrideMetadataButton from './components/override-metadata.button';
import FixWatermarkListItem from './components/fix-watermark.list-item';
import ExportToJpegListItem from './components/export-to-jpeg.list-item';
import RemoveAllPhotoButton from './components/remove-all-photo.button';
import FeatureRequestButton from './components/feature-request.button';

const RootPage = () => {
  const { t } = useTranslation();
  const { photos } = useStore();

  return (
    <Page style={{ paddingBottom: '5rem' }}>
      <Navbar title={t('root.title')} left={<OpenThemesLink />} right={<OpenSettingsLink />} />

      <Toolbar top className={`left-0 ios:top-11-safe material:top-14-safe sticky w-full`}>
        <AddPhotoButton />
        <DownloadAllPhotoButton />
      </Toolbar>

      <Toolbar className="left-0 bottom-0 fixed w-full">
        <BugReportButton />
        <FeatureRequestButton />
        <ReleasesButton />
      </Toolbar>

      {photos.length !== 0 && (
        <BlockTitle>
          {t('root.loaded-photos')}
          <RemoveAllPhotoButton />
        </BlockTitle>
      )}
      <List strongIos inset>
        {photos.map((photo, index) => (
          <ListItem
            key={index}
            media={
              <img
                src={photo.thumbnail}
                alt={photo.file.name}
                style={{ width: '5rem', height: '4rem', objectFit: 'cover', borderRadius: '0.5rem' }}
              />
            }
            title={photo.file.name}
            subtitle={`${photo.focalLength} ${photo.fNumber} ISO${photo.iso} ${photo.exposureTime}s`}
            text={`${photo.make} ${photo.model} ${photo.lensModel}`}
            after={
              <>
                <OverrideMetadataButton photo={photo} />
                <DownloadOnePhotoButton photo={photo} />
                <RemoveOnePhotoButton index={index} />
              </>
            }
          />
        ))}
      </List>

      <SettingsPanel>
        <List strongIos inset>
          <DarkModeListItem />
          <LanguageListItem />
          <FixWatermarkListItem />
        </List>

        <List strongIos inset>
          <ExportToJpegListItem />
          <QualityListItem />
          <FixImageWidthListItem />
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
      </SettingsPanel>

      <ThemesPanel>
        <List strongIos inset>
          {themes.map((theme, index) => (
            <ThemeListItem key={index} name={theme.name} />
          ))}
        </List>
      </ThemesPanel>

      <LanguagePopover />
      <OverrideMetadataPopup />

      <Loading />
    </Page>
  );
};

export default RootPage;
