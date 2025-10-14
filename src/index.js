import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import initSmoothScroll from './utils/smoothScroll';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        { path: '*', element: <App /> },
        // keep other routes controlled inside App
      ], { future: { v7_startTransition: true } })}
      future={{ v7_startTransition: true }}
    />
  </React.StrictMode>
);

// Init smooth scrolling behavior for internal hash links
initSmoothScroll();