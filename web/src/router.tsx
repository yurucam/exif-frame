import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TermAndConditionsPage from './pages/term-and-conditions';
import PrivacyPolicyPage from './pages/privacy-policy';
import FramePage from './pages/frame';
import ExportSettingsPage from './pages/export-settings';
import ThemeSettingsPage from './pages/theme-settings';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FramePage />} />
        <Route path="/theme-settings" element={<ThemeSettingsPage />} />
        <Route path="/export-settings" element={<ExportSettingsPage />} />
        <Route path="/privacy_policy" element={<PrivacyPolicyPage />} />
        <Route path="/term_and_conditions" element={<TermAndConditionsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
