import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { LocationProvider } from './components/LocationContext';
import App from './App';
import './index.css';
import { UnitProvider } from './components/UnitContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LocationProvider>
          <UnitProvider>
            <App />
          </UnitProvider>
        </LocationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);