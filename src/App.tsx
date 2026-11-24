import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header, Footer } from './components/Layout'
import PageHero from './components/PageHero'
import { Btn, WaNote } from './components/Ui'
import { waUrl } from './lib/data'
import Home from './pages/Home'
import Info from './pages/Info'
import Feedbacks from './pages/Feedbacks'

function ScrollManager() {
  const { hash, key } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    const initial = first.current
    first.current = false
    if (!hash) {
      // troca de página: topo imediato e foco no conteúdo (leitor de tela anuncia a nova página)
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (!initial) document.getElementById('conteudo')?.focus({ preventScroll: true })
      return
    }
    // âncora: o alvo pode ainda não existir (o HScroll remonta ao trocar de modo), então tenta por ~1s
    const id = decodeURIComponent(hash.slice(1))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' })
        if (!initial) {
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        }
      } else if (performance.now() - start < 1000) raf = requestAnimationFrame(tryScroll)
    }
    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [key, hash])
  return null
}

function NotFound() {
  return (
    <>
      <title>Página não encontrada | Karina Fernandes</title>
      <meta name="robots" content="noindex" />
      <PageHero eyebrow="Erro 404" lines={['Esta página não existe.']} sub="O endereço pode ter mudado. Serviços, valores e agendamento estão na página inicial." />
      <section className="px-5 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-wrap gap-3">
          <Btn to="/">Voltar ao início</Btn>
          <Btn variant="outline" href={waUrl()}>Agendar pelo WhatsApp<WaNote /></Btn>
        </div>
      </section>
    </>
  )
}

export default function App() {
  return (
    <>
      {/* atalho de teclado: primeiro item focável da página */}
      <a href="#conteudo" data-skip onClick={(e) => { e.preventDefault(); document.getElementById('conteudo')?.focus() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-papel focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-ouro">Pular para o conteúdo</a>
      <ScrollManager />
      <Header />
      {/* trava de rolagem lateral no mobile: navegadores sem `overflow-x: clip` (iOS < 16, alguns Android)
          deixavam a página arrastar para o lado. Só abaixo de lg, onde não há a seção sticky do desktop
          (overflow hidden num ancestral quebraria o sticky). */}
      <div className="max-lg:overflow-x-hidden">
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/informacoes" element={<Info />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}
