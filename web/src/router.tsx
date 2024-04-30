import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TermAndConditionsPage from './pages/term-and-conditions';
import PrivacyPolicyPage from './pages/privacy-policy';
import ExportSettingsPage from './pages/setting/page';
import ThemeSettingsPage from './pages/theme/page';
import { useStore } from './store';
import FramePage from './pages/convert/page';

const Router = () => {
  const { tabIndex } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {tabIndex === 0 && <FramePage />}
              {tabIndex === 1 && <ThemeSettingsPage />}
              {tabIndex === 2 && <ExportSettingsPage />}
            </>
          }
        />
        <Route path="/privacy_policy" element={<PrivacyPolicyPage />} />
        <Route path="/term_and_conditions" element={<TermAndConditionsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
