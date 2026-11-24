import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/cormorant-garamond/700.css'
import './index.css'
// ao recarregar, a página volta ao topo (hero): sem restauração de rolagem do navegador (também no index.html, antes do React)
// e, enquanto o visitante não interage, qualquer salto durante o carregamento (foco de iframe, imagens, fontes) é desfeito
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
// o âncora da URL (ex.: /#procedimentos, deixado pelo clique no menu) é descartado ao carregar: refresh sempre abre no hero
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
{
  const top = () => window.scrollTo(0, 0)
  const stop = () => {
    for (const e of ['load', 'pageshow']) window.removeEventListener(e, top)
    for (const e of ['wheel', 'touchstart', 'keydown', 'pointerdown']) window.removeEventListener(e, stop)
  }
  top()
  for (const e of ['load', 'pageshow']) window.addEventListener(e, top)
  for (const e of ['wheel', 'touchstart', 'keydown', 'pointerdown']) window.addEventListener(e, stop, { passive: true })
  setTimeout(stop, 4000)
}

createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>)
