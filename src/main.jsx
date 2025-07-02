import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SEO from './components/SEO.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SEO />
    <App />
  </StrictMode>,
)
