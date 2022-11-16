import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CtxtProvider from './contexter';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CtxtProvider>
        <App />
      </CtxtProvider>
    </BrowserRouter>
  </React.StrictMode>
);
