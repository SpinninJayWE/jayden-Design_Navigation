import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import router from "./router";
import {AuthProvider} from "./providers/user";
import {SideBarProvider} from "./providers/globals";



function Root () {

  return (
      <AuthProvider>
        <SideBarProvider>
          <RouterProvider router={router} />
        </SideBarProvider>
      </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Root />
)
