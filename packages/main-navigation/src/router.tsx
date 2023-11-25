import {createBrowserRouter, useLocation, useNavigation} from "react-router-dom";
import App from "./App";
import React, {lazy} from "react";
const DashBoard = lazy(() => import('./pages/dashBoard'))
const Postings = lazy(() => import('./pages/Postings'))
const PostingDetail = lazy(() =>import('./pages/postingDetail'))
const Login = lazy(() => import('./pages/login'))
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
        path: '/postings',
        element: <Postings />,
        children: [
          {
            path: '/postings/:id',
            element: <PostingDetail />
          }
        ]
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  },

]);

export default router