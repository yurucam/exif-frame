import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/root/page';
import { useEffect } from 'react';
import { pageView } from './google-analytics';
import AppLandingPage from './pages/app-landing-page/page';

const Router = () => {
  useEffect(() => pageView(window.location.pathname), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/app-landing-page" element={<AppLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
