import { List, Navbar, Page, Tabbar, TabbarLink } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import DarkModeListItem from '../components/dark-mode.list-item';
import LanguageListItem from '../components/language.list-item';
import LanguagePopover from '../components/language.popover';
import QualityListItem from '../components/quality.list-item';
import FixImageWidthListItem from '../components/fix-image-width.list-item';
import ShowCameraMakerListItem from '../components/show-camera-maker.list-item';
import ShowCameraModelListItem from '../components/show-camera-model.list-item';
import ShowLensModelListItem from '../components/show-lens-model.list-item';
import OverrideCameraMakerListItem from '../components/override-camera-maker.list-item';
import OverrideCameraModelListItem from '../components/override-camera-model.list-item';
import OverrideLensModelListItem from '../components/override-lens-model.list-item';
import FixWatermarkListItem from '../components/fix-watermark.list-item';
import ExportToJpegListItem from '../components/export-to-jpeg.list-item';
import SettingsIcon from '../icons/settings.icon';
import ImageIcon from '../icons/image.icon';
import GenerateIcon from '../icons/generate.icon';
import BugReportListItem from '../components/bug-report.list-item';
import FeatureRequestListItem from '../components/feature-request.list-item';
import ReleasesListItem from '../components/releases.list-item';
import CurrentVersionListItem from '../components/current-version.list-item';
import FocalLength35mmModeListItem from '../components/focal-length-35mm-mode.list-item';
import DisableExposureMeterListItem from '../components/disable-exposure-meter.list-item';
import RatioPopover from '../components/ratio.popover';
import RatioListItem from '../components/ratio.list-item';
import { useNavigate } from 'react-router-dom';
import TermAndConditionsListItem from '../components/term-and-conditions.list-item';
import PrivacyPolicyListItem from '../components/privacy-policy.list-item';

const ExportSettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        <QualityListItem />
        <FixImageWidthListItem />
        <FocalLength35mmModeListItem />
        <RatioListItem />
      </List>

      <List strongIos inset>
        <DisableExposureMeterListItem />
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
        <PrivacyPolicyListItem />
        <TermAndConditionsListItem />
      </List>

      <List strongIos inset>
        <CurrentVersionListItem />
      </List>

      <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
        <TabbarLink key={1} active={false} label={t('root.tab.convert')} icon={<GenerateIcon size={24} />} onClick={() => navigate('/')} />
        <TabbarLink key={2} active={false} label={t('root.tab.theme-settings')} icon={<ImageIcon size={24} />} onClick={() => navigate('/theme-settings')} />
        <TabbarLink key={3} active={true} label={t('root.tab.export-settings')} icon={<SettingsIcon size={24} />} onClick={() => navigate('/export-settings')} />
      </Tabbar>

      <LanguagePopover />
      <RatioPopover />
    </Page>
  );
};

export default ExportSettingsPage;
