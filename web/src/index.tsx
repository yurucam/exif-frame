import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'konsta/react';
import Router from './router';

import './index.css';
import './locales';
import './google-analytics';
import './update-latest-version';

const digital7 = new FontFace('digital-7', 'url(fonts/digital-7.ttf)');
digital7.load().then((font) => document.fonts.add(font));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App theme="ios" safeAreas>
      <Router />
    </App>
  </React.StrictMode>
);
