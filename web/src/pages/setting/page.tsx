import { List, Navbar, Page, Tabbar, TabbarLink } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import DarkModeListItem from './components/dark-mode.list-item';
import LanguageListItem from './components/language.list-item';
import LanguagePopover from './components/language.popover';
import QualityListItem from './components/quality.list-item';
import FixImageWidthListItem from './components/fix-image-width.list-item';
import ShowCameraMakerListItem from './components/show-camera-maker.list-item';
import ShowCameraModelListItem from './components/show-camera-model.list-item';
import ShowLensModelListItem from './components/show-lens-model.list-item';
import FixWatermarkListItem from './components/fix-watermark.list-item';
import ExportToJpegListItem from './components/export-to-jpeg.list-item';
import SettingsIcon from '../../icons/settings.icon';
import ImageIcon from '../../icons/image.icon';
import GenerateIcon from '../../icons/generate.icon';
import BugReportListItem from './components/bug-report.list-item';
import ReleasesListItem from './components/releases.list-item';
import CurrentVersionListItem from './components/current-version.list-item';
import FocalLength35mmModeListItem from './components/focal-length-35mm-mode.list-item';
import DisableExposureMeterListItem from './components/disable-exposure-meter.list-item';
import RatioPopover from './components/ratio.popover';
import RatioListItem from './components/ratio.list-item';
import TermAndConditionsListItem from './components/term-and-conditions.list-item';
import PrivacyPolicyListItem from './components/privacy-policy.list-item';
import { useStore } from '../../store';
import SponsorsListItem from './components/sponsors.list-item';
import FocalLengthRatioModeListItem from './components/focal-length-ratio-mode.list-item';
import LabListItem from './components/lab.list-item';
import DateNotationListItem from './components/date-notation.list-item';
import DateNotationPopover from './components/date-notation.popover';
import OverrideMetadataListItem from './components/override-metadata.list-item';
import OverrideMetadataPopover from './components/override-metadata.popover';
import CreateOverrideMetadataListItem from './components/create-override-metadata.list-item';
import MaintainExifListItem from './components/maintain-exif.list-item';

const ExportSettingsPage = () => {
  const { t } = useTranslation();
  const { setTabIndex } = useStore();

  return (
    <Page style={{ paddingBottom: '10rem' }}>
      <Navbar large transparent title={t('root.settings')} />

      <List strongIos inset>
        <DarkModeListItem />
        <LanguageListItem />
        <FixWatermarkListItem />
      </List>

      <List strongIos inset>
        <ExportToJpegListItem />
        <MaintainExifListItem />
        <QualityListItem />
        <FixImageWidthListItem />
        <FocalLengthRatioModeListItem />
        <FocalLength35mmModeListItem />
        <RatioListItem />
        <DateNotationListItem />
      </List>

      <List strongIos inset>
        <DisableExposureMeterListItem />
        <ShowCameraMakerListItem />
        <ShowCameraModelListItem />
        <ShowLensModelListItem />
      </List>

      <List strongIos inset>
        <OverrideMetadataListItem />
        <CreateOverrideMetadataListItem />
      </List>

      <List strongIos inset>
        <BugReportListItem />
        <ReleasesListItem />
      </List>

      <List strongIos inset>
        <PrivacyPolicyListItem />
        <TermAndConditionsListItem />
      </List>

      <List strongIos inset>
        <SponsorsListItem />
        <LabListItem />
        <CurrentVersionListItem />
      </List>

      <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
        <TabbarLink key={1} active={false} label={t('root.tab.convert')} icon={<GenerateIcon size={24} />} onClick={() => setTabIndex(0)} />
        <TabbarLink key={2} active={false} label={t('root.tab.theme-settings')} icon={<ImageIcon size={24} />} onClick={() => setTabIndex(1)} />
        <TabbarLink key={3} active={true} label={t('root.tab.export-settings')} icon={<SettingsIcon size={24} />} onClick={() => setTabIndex(2)} />
      </Tabbar>

      <LanguagePopover />
      <RatioPopover />
      <DateNotationPopover />
      <OverrideMetadataPopover />
    </Page>
  );
};

export default ExportSettingsPage;
