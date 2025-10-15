import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import initSmoothScroll from './utils/smoothScroll';

const router = createBrowserRouter(
  [
    { path: '*', element: <App /> },
  ],
  {
    // Use a root basename during development to make local routes simple
    // and keep the GitHub Pages basename in production builds
    basename: process.env.NODE_ENV === 'development' ? '/' : '/devcollegeacademy',
    // Opt-in to upcoming v7 behavior to avoid the runtime warning
    future: { v7_startTransition: true },
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

initSmoothScroll();
