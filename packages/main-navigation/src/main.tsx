import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Overview } from './pages/home';
import { Blog } from './pages/blog';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
    children: [
      {
        path: '/',
        element: <Overview/>
      },
      {
        path: '/blog',
        element: <Blog />
      }
    ]
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
