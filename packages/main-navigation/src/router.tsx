import {createBrowserRouter, createHashRouter, Navigate, useLocation, useNavigation} from "react-router-dom";
import App from "./App";
import React, {lazy} from "react";
import SessionChatWindow from "./components/chat/session-chat";
import TestPage from "./pages/test";
// import PostingDetail from "./pages/postingDetail";
// import Postings from "./pages/Postings";
// import DashBoard from "./pages/dashBoard";
// import Chat from "./pages/chat";
// import PostAdd from './pages/posting-add'
// import Login from "./pages/login";
const DashBoard = lazy(() => import('./pages/dashBoard'))
const Postings = lazy(() => import('./pages/Postings'))
const PostingDetail = lazy(() =>import('./pages/postingDetail'))
const Login = lazy(() => import('./pages/login'))
const Chat = lazy(() => import('./pages/chat'))
const PostAdd = lazy(() => import('./pages/posting-add'))
export const router = createHashRouter([
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
          },
          {
            path: '/postings/add',
            element: <PostAdd />
          }
        ]
      },
      {
        path: '/chat',
        element: <Chat />,
        children: [
          {
            path: '/chat/:id',
            element: <SessionChatWindow />
          }
        ]
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/test',
        element: <TestPage />
      }
    ]
  },

]);

export default router