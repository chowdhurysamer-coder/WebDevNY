import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Always start pages at the top; never let the browser restore scroll on reload.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// App mounted successfully, clear the stale-cache recovery flag and any
// cache-buster query so future deploys can self-heal again.
try {
  sessionStorage.removeItem('wdny_recover')
  if (location.search.includes('v=')) {
    history.replaceState(null, '', location.pathname + location.hash)
  }
} catch (e) { /* ignore */ }
