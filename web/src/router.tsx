import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootPage from './pages/root/page';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
