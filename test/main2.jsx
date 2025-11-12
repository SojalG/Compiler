import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../vite-project/src/App.jsx';
import "../vite-project/src/TextCursor/TextCursor.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
