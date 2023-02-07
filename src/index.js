import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, BrowserRouter } from './imports';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


