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



function Root () {

  return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Root />
)
