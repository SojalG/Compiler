import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import App2 from './App2.jsx';
import App4 from './App4.jsx';
import App3 from './App3.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App3 />,
  },
  {
    path: "/loginpage",
    element: <App2 />,
    children: [
      {
        path: "",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      }
    ]
  },
  {
    path: "/compiler",
    element: <App />,
  }
],
  {
    basename: "/compilein"
  });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


