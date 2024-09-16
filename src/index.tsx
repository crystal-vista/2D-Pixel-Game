import React from 'react';
import ReactDOM from 'react-dom/client';
import MainMenu from './components/ui/MainMenu';
import App from './app';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MainMenu />
  </React.StrictMode>
);
