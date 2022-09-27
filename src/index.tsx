import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Admin from './Admin';
import PrivacyPolicy from './privacy-policy';
import Cheats from './components/cheats/cheats';
import NotFound from './404';
import Catalog from './catalog';
require('dotenv').config();

render(
  <React.StrictMode>
    <Provider store={store}>
      <Cheats/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/catalog/*" element={<Catalog />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/privacy-policy/*" element={<PrivacyPolicy />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
