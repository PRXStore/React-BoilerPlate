import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VisibilityProvider } from './providers/VisibilityProvider';
import App from './App';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <VisibilityProvider>

    <App />
    </VisibilityProvider>
  </StrictMode>,
)
