// Flash prevention — force black before React hydrates
document.body.style.background = '#000000'
document.documentElement.style.background = '#000000'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
