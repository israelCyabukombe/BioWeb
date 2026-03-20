import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from './context/ThemeProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
