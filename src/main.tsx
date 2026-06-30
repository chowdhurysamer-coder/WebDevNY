import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// App mounted successfully — clear the stale-cache recovery flag and any
// cache-buster query so future deploys can self-heal again.
try {
  sessionStorage.removeItem('wdny_recover')
  if (location.search.includes('v=')) {
    history.replaceState(null, '', location.pathname + location.hash)
  }
} catch (e) { /* ignore */ }
