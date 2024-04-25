import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { pageView } from './google-analytics';
import RootPage from './pages/root';
import TermAndConditionsPage from './pages/term-and-conditions';
import PrivacyPolicyPage from './pages/privacy-policy';

const Router = () => {
  useEffect(() => pageView(window.location.pathname), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/privacy_policy" element={<PrivacyPolicyPage />} />
        <Route path="/term_and_conditions" element={<TermAndConditionsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
