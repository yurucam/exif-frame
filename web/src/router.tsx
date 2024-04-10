import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/root/page';
import { useEffect } from 'react';
import { pageView } from './google-analytics';

const Router = () => {
  useEffect(() => pageView(window.location.pathname), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
