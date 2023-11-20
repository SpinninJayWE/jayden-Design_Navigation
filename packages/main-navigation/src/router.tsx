import {createBrowserRouter, useLocation, useNavigation} from "react-router-dom";
import App from "./App";
import React, {lazy} from "react";
const DashBoard = lazy(() => import('./pages/dashBoard'))

const Blog = lazy(() => import('./pages/blog'))
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DashBoard />
      },
      {
        path: '/blog',
        element: <Blog />
      }
    ]
  },
]);

export default router