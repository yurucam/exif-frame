import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'konsta/react';
import Router from './pages/router';

import './index.css';
import './i18n';
import './update-latest-version';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App theme="ios" safeAreas>
      <Router />
    </App>
  </React.StrictMode>
);
