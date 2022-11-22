import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import CtxtProvider from './contexter';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <CtxtProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </CtxtProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
