import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import TermAndConditionsPage from './pages/term-and-conditions';
import PrivacyPolicyPage from './pages/privacy-policy';
import ExportSettingsPage from './pages/setting/page';
import ThemeSettingsPage from './pages/theme/page';
import { useStore } from './store';
import FramePage from './pages/convert/page';
import SponsorsPage from './pages/sponsors';
import LabPage from './pages/lab/page';
import MetadataPage from './pages/metadata/page';
import EditPage from './pages/edit/page';
import LandingPage from './pages/landing/page';

const AppRoutes = () => {
  const { tabIndex, editPhotoIndex } = useStore();
  if (editPhotoIndex !== null) return <EditPage />;

  return (
    <>
      {tabIndex === 0 && <FramePage />}
      {tabIndex === 1 && <ThemeSettingsPage />}
      {tabIndex === 2 && <ExportSettingsPage />}
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppRoutes />} />

        <Route path="/privacy_policy.html" element={<PrivacyPolicyPage />} />
        <Route path="/term_and_conditions.html" element={<TermAndConditionsPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/metadata" element={<MetadataPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
