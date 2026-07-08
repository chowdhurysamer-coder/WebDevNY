import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initPerf } from '@/lib/perf'

// Always start pages at the top; never let the browser restore scroll on reload.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

// Adaptive performance tier: weak or busy devices get a lighter site.
initPerf()

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
