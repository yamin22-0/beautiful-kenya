import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App'

// Apply saved theme before first render — prevents flash
const savedTheme = localStorage.getItem('bk-theme') || 'light'
document.documentElement.setAttribute('data-theme', savedTheme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)