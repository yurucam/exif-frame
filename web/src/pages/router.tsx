import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './main/page';
import PrivacyPolicyPage from './privacy-policy/privacy-policy';
import SponsorsPage from './sponsors/sponsors';
import TermAndConditionsPage from './term-and-conditions/term-and-conditions';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/privacy_policy.html" element={<PrivacyPolicyPage />} />
        <Route path="/term_and_conditions.html" element={<TermAndConditionsPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
