import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainRoutes from './route/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import { DindinProvider } from './context/dindinContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DindinProvider>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </DindinProvider>
  </React.StrictMode>
);