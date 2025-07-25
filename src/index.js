import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './LandingPage';
import './LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
