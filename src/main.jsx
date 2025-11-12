import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";
import App2 from './App2.jsx';
import App4 from './App4.jsx';
import App3 from './App3.jsx';


const router = createBrowserRouter([
  {
 path: "/",
     element: <App />,
 },
 {
  path: "/loginpage",
  element: <App2 />,
 },
 {
  path: "/homepage",
  element: <App3 />,
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


