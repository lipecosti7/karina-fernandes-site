import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Icon, Logo, WaNote } from './Ui'
import { Img } from './Img'
import { brand, contact, waUrl } from '../lib/data'

const links = [
  { to: '/', label: 'Início', menu: 'Início' },
  { to: '/#procedimentos', label: 'Serviços e valores', menu: 'Serviços' },
  { to: '/informacoes', label: 'Informações e horários', menu: 'Informações' },
  { to: '/feedbacks', label: 'Feedbacks', menu: 'Feedbacks' },
]
const isActive = (to: string, pathname: string, hash: string) =>
  to === '/' ? pathname === '/' && !hash : to === pathname || to === `${pathname}${hash}`
const ease = [0.76, 0, 0.24, 1] as const
// o que fica por trás do menu aberto: inerte (sem foco, sem leitor de tela)
const behind = 'main, footer, header, [data-skip]'
const setInert = (on: boolean) =>
  document.querySelectorAll(behind).forEach((el) => (on ? el.setAttribute('inert', '') : el.removeAttribute('inert')))

export function Header() {
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState('calc(100% - 42px) 36px') // centro do botão que abriu o menu
  const { pathname, hash } = useLocation()
  const burger = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const navigating = useRef(false) // fechou por navegação: o foco vai para o <main> (App), não para o hamburger
  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    // trava o scroll da página por trás do menu (html + body) para a tela ficar estática
    const html = document.documentElement
    html.style.overflow = open ? 'hidden' : ''
    document.body.style.overflow = open ? 'hidden' : ''
    setInert(open)
    if (!open && wasOpen.current && !navigating.current) burger.current?.focus()
    wasOpen.current = open
    navigating.current = false
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); html.style.overflow = ''; document.body.style.overflow = ''; setInert(false) }
  }, [open])
  // link do menu: libera a página já no clique para o App conseguir focar o <main>
  const go = () => { navigating.current = true; setInert(false); setOpen(false) }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 h-[72px] transform-gpu border-b border-black/5 bg-papel px-5 lg:px-12">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6">
        <Link to="/" aria-label="Karina Fernandes, Lash Designer: início" className="flex items-center"><Logo variant="mono" decorative className="h-[52px]" /></Link>
        <nav className="hidden gap-8 text-[15px] font-medium text-cafe xl:flex" aria-label="Principal">
          {links.map((l) => (
            <Link key={l.label} to={l.to} aria-current={isActive(l.to, pathname, hash) ? 'page' : undefined} className="relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-dourado after:transition hover:text-ouro hover:after:scale-x-100">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {/* no mobile o CTA fica só no menu */}
          <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="hidden min-h-11 cursor-pointer items-center rounded-full bg-ouro px-6 text-[15px] font-semibold text-white transition-colors hover:bg-ouro-escuro sm:inline-flex">
            Agendar pelo WhatsApp<WaNote />
          </a>
          <button ref={burger} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setOrigin(r.left + r.width / 2 + 'px ' + (r.top + r.height / 2) + 'px'); setOpen(true) }} aria-label="Abrir menu" aria-expanded={open} aria-haspopup="dialog" aria-controls="menu-principal" className="-mr-2 flex size-11 cursor-pointer items-center justify-center text-cafe xl:hidden">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu-principal" role="dialog" aria-modal="true" aria-label="Menu"
            className="fixed inset-0 z-50 grid overflow-y-auto overscroll-contain bg-ouro text-white lg:grid-cols-[1.1fr_0.9fr]"
            initial={{ clipPath: `circle(0% at ${origin})` }} animate={{ clipPath: `circle(150% at ${origin})` }}
            exit={{ clipPath: `circle(0% at ${origin})`, transition: { duration: 0.5, ease } }}
            transition={{ duration: 0.7, ease }}>
            {/* 2ª camada varre por cima, na cor da marca */}
            <motion.div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ouro to-ouro"
              initial={{ clipPath: `circle(0% at ${origin})` }} animate={{ clipPath: `circle(150% at ${origin})` }}
              exit={{ clipPath: `circle(0% at ${origin})` }} transition={{ duration: 0.8, ease, delay: 0.12 }} />

            <div className="relative z-10 flex min-h-dvh flex-col px-6 pb-6 lg:px-16 lg:pb-10">
              <div className="flex h-[72px] shrink-0 items-center justify-between">
                <Logo light decorative variant="mono" className="h-[56px]" />
                <button autoFocus onClick={() => setOpen(false)} aria-label="Fechar menu" className="-mr-2 flex size-11 cursor-pointer items-center justify-center transition hover:rotate-90">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M5 5l14 14M19 5L5 19" /></svg>
                </button>
              </div>

              <nav className="mt-5 flex-1 lg:mt-10" aria-label="Menu">
                <ul>
                  {links.map((l, i) => {
                    const active = isActive(l.to, pathname, hash)
                    const delay = 0.25 + i * 0.08
                    return (
                      <li key={l.label} className="relative">
                        {/* a linha divisória se desenha da esquerda para a direita */}
                        <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.9, ease, delay }} className="absolute inset-x-0 top-0 h-px origin-left bg-white/35" />
                        {i === links.length - 1 && <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.9, ease, delay: delay + 0.08 }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/35" />}
                        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.7, ease, delay: delay + 0.05 }}>
                          <Link to={l.to} onClick={go} aria-current={active ? 'page' : undefined} className="group relative flex items-center gap-4 py-[18px] lg:gap-6 lg:py-6">
                            {/* realce que preenche a linha no hover */}
                            <span aria-hidden className="absolute inset-y-1 -inset-x-3 -z-10 origin-left scale-x-0 rounded-2xl bg-white/15 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                            {/* página atual: marcada pelo ponto, em vez de numeração (os links não são uma sequência) */}
                            <span aria-hidden className={`size-2.5 shrink-0 rounded-full bg-papel transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />
                            <span className="font-display text-[27px] font-semibold leading-[1.08] tracking-[-0.025em] transition duration-300 group-hover:translate-x-1 sm:text-4xl lg:text-[46px]">{l.label}</span>                          </Link>
                        </motion.div>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="shrink-0 pt-5">
                <div className="mb-4 flex items-center gap-4">
                  {/* molde em arco; a foto é ampliada e posicionada no rosto (rosto ≈ 51% / 62% da imagem) */}
                  <span className="relative block h-24 w-[72px] shrink-0 overflow-hidden rounded-t-full rounded-b-2xl bg-dourado ring-2 ring-white/60 lg:hidden">
                    <Img name="karina-retrato" sizes="122px" alt="" loading="eager" className="absolute inset-0 size-full object-cover object-[45%_28%]" />
                  </span>
                  <div className="text-sm leading-snug text-white/90">
                    <p className="text-base font-semibold text-white">{brand.name}</p>
                    <p>{brand.role}</p>
                    {contact.instagram && <a className="mt-1 inline-flex items-center gap-1.5 hover:text-white" href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer"><Icon name="instagram" className="size-4" />@{contact.instagram}</a>}
                  </div>
                </div>
                <a href={waUrl()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex min-h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-papel px-8 text-[15px] font-semibold text-ouro transition hover:bg-ouro-escuro hover:text-white lg:w-auto lg:self-start">
                  <Icon name="chat" className="size-5" /> Agendar pelo WhatsApp<WaNote />
                </a>
              </motion.div>
            </div>

            <motion.div className="relative z-10 hidden p-12 pl-0 lg:block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease, delay: 0.3 }}>
              <div className="relative h-full overflow-hidden rounded-t-[999px] rounded-b-[32px] ring-1 ring-white/40">
                <Img name="karina-retrato" alt="" sizes="42vw" className="absolute inset-0 h-full w-full object-cover object-[45%_25%]" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ouro/60 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                  <p className="text-[15px] text-white/90">{brand.role}</p>
                  <p className="mt-1 font-display text-3xl font-semibold">{brand.name}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Footer() {
  const pin = <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 size-5 shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
  const item = 'inline-flex items-start gap-3 py-1.5 transition-opacity hover:opacity-75'
  return (
    <footer className="bg-ouro px-5 pb-8 pt-16 text-[15px] text-white lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-[1200px]">
        {/* faixa de chamada: marca à esquerda, ação à direita */}
        <div className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-center lg:justify-between lg:pb-14">
          <div>
            <Logo light decorative className="h-24 sm:h-28" />
            <p className="mt-5 max-w-sm leading-relaxed">Destaque sua beleza com cílios volumosos ou mais naturais. Você merece se cuidar.</p>
          </div>
          <a href={waUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-papel px-8 text-[15px] font-semibold text-ouro transition-colors hover:bg-creme lg:w-auto">
            <Icon name="chat" className="size-5" />Agendar pelo WhatsApp<WaNote />
          </a>
        </div>

        <div className="grid gap-10 border-t border-white/30 pt-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr] lg:gap-16">
          <nav aria-label="Rodapé">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]">Navegação</p>
            <ul>{links.map((l) => <li key={l.label}><Link to={l.to} className="inline-block py-1.5 transition-opacity hover:opacity-75">{l.label}</Link></li>)}</ul>
          </nav>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]">Contato</p>
            <ul>
              <li><a href={waUrl()} target="_blank" rel="noopener noreferrer" className={item}><Icon name="chat" className="mt-0.5 size-5" />WhatsApp<WaNote /></a></li>
              {contact.instagram && <li><a className={item} href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer"><Icon name="instagram" className="mt-0.5 size-5" />@{contact.instagram}</a></li>}
            </ul>
          </div>
          {(contact.address || contact.hours) && (
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em]">Atendimento</p>
              <ul>
                {contact.address && <li><a className={item} href={contact.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`} target="_blank" rel="noopener noreferrer">{pin}<span>{contact.address}<WaNote /></span></a></li>}
                {contact.hours && <li className="flex items-start gap-3 py-1.5"><Icon name="clock" className="mt-0.5 size-5" /><span>{contact.hours}</span></li>}
                <li className="flex items-start gap-3 py-1.5"><Icon name="card" className="mt-0.5 size-5" /><span>Pix, dinheiro e cartão (só por aproximação)</span></li>
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/30 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.name} · {brand.role}. Todos os direitos reservados.</p>
          <a href="#topo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-75">Voltar ao topo<span aria-hidden>↑</span></a>
        </div>
      </div>
    </footer>
  )
}
