import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Maximize2, X } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { Btn, Deco, Icon, WaNote } from '../components/Ui'
import { Lines, Ornament, ease } from '../components/Motion'
import { HeroPicture, Img } from '../components/Img'
import Faq from '../components/Faq'
import { ScrollMarquee } from '../components/Scroll'
import Hours from '../components/Hours'
import { brand, brl, contact, differentials, extras, priceLabel, procedures, steps, waUrl } from '../lib/data'

const wrap = 'mx-auto max-w-[1200px]'
const smooth = { stiffness: 70, damping: 24, mass: 0.5 }

// larguras geradas por scripts/optimize-servicos.mjs para cada foto (as três sem arquivo novo só têm até 768)
const photoWidths: Record<string, number[]> = { 'servico-luxo': [480, 768, 1080, 1440], 'servico-brow': [480, 768, 1080], 'servico-fox-eyes': [480, 768, 1080], 'servico-egipcio': [480, 768], 'servico-glamour': [480, 768] }
function ServicePhoto({ photo, alt, className }: { photo: string; alt: string; className: string }) {
  const base = photo.replace(/-768.webp$/, '')
  const ws = photoWidths[base.split('/').pop()!] ?? [480, 768]
  const set = (ext: string) => ws.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')
  const sizes = '(min-width: 1024px) 480px, 92vw'
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img src={`${base}-${ws[ws.length - 1]}.webp`} alt={alt} loading="lazy" decoding="async" className={className} />
    </picture>
  )
}

// catálogo: lista editorial. Foto grande (toque para ver inteira em tela cheia), nome, valores e botão de agendar
function ProcedureList() {
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    if (open === null) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      else if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % procedures.length))
      else if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + procedures.length) % procedures.length))
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = prev }
  }, [open])
  const cur = open === null ? null : procedures[open]
  const nav = 'absolute top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/35 bg-white/10 text-white transition-colors hover:bg-white/25'
  return (
    <>
      <ol className="mx-auto mt-14 flex max-w-[1040px] flex-col gap-16 lg:mt-20 lg:gap-24">
        {procedures.map((p, i) => (
          <motion.li key={p.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.8, ease }}
            className={`flex flex-col gap-6 lg:items-center lg:gap-16 ${i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Ver foto de ${p.name} em tela cheia`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[22px] bg-areia shadow-[0_26px_50px_-30px_rgba(61,44,29,0.5)] lg:w-[46%] lg:shrink-0">
              <ServicePhoto photo={p.photo} alt={p.alt} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span aria-hidden className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-papel/90 text-cafe"><Maximize2 className="size-[18px]" /></span>
            </button>
            <div className="lg:flex-1">
              <h3 className="text-[40px] leading-[1.02] sm:text-5xl">{p.name}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-cafe/15 pt-5 font-display text-[24px] font-semibold text-cafe">
                {p.maintenance
                  ? <><span>Aplicação {brl(p.price ?? 0)}</span><span className="text-cinza">Manutenção {brl(p.maintenance)}</span></>
                  : <span>{p.price === undefined ? 'Valor sob consulta' : brl(p.price)}</span>}
              </p>
              <div className="mt-6"><Btn href={waUrl(p.name)}>Agendar<span className="sr-only"> {p.name}</span><WaNote /></Btn></div>
            </div>
          </motion.li>
        ))}
      </ol>
      {cur && open !== null ? (
        <div role="dialog" aria-modal="true" aria-label={cur.name} onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#1e140a]/95 px-4 pb-5 pt-14">
          <button type="button" autoFocus aria-label="Fechar" onClick={() => setOpen(null)} className={`${nav} !top-5 !right-4 !translate-y-0`}><X className="size-5" /></button>
          <button type="button" aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + procedures.length) % procedures.length) }} className={`${nav} left-3`}><ChevronLeft className="size-5" /></button>
          <img src={cur.photo.replace('-768.webp', '.jpeg')} alt={cur.alt} onClick={(e) => e.stopPropagation()} className="max-h-[calc(100svh-150px)] max-w-full rounded-xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]" />
          <p onClick={(e) => e.stopPropagation()} className="text-center font-display text-2xl font-semibold text-white">{cur.name}<span className="mt-1 block font-sans text-sm font-normal text-white/75">{priceLabel(cur).replace('\n', ' · ')}</span></p>
          <button type="button" aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % procedures.length) }} className={`${nav} right-3`}><ChevronRight className="size-5" /></button>
        </div>
      ) : null}
    </>
  )
}

// mesma media query da variante `land`: abaixo dela (celular em pé) o hero fica estático
const LAND = '(min-aspect-ratio: 11/10) and (min-width: 640px)'
const subscribe = (cb: () => void) => { const m = window.matchMedia(LAND); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) }
const useLand = () => useSyncExternalStore(subscribe, () => window.matchMedia(LAND).matches, () => true)

function Hero() {
  const animated = useLand()
  const rise = (delay: number) => ({ initial: animated ? { opacity: 0, y: 14 } : false, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay } } as const)
  return (
    <>
    {/* celular: foto em tela cheia (exatamente a altura da tela, sem rolagem) com o texto embaixo sobre um degradê escuro */}
    <section className="relative h-svh overflow-hidden bg-[#2c1f15] text-papel land:hidden">
      <motion.div {...(animated ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.4, ease } } : {})} className="absolute -left-[4%] top-[72px] aspect-[3/4] w-[112%] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_80%,transparent)]">
        <HeroPicture alt="Karina Fernandes" pictureClassName="block size-full" className="absolute inset-0 size-full object-cover object-[50%_0%]" />
      </motion.div>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(to_top,rgba(43,30,20,0.92),rgba(43,30,20,0.62)_55%,transparent)]" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(43,30,20,0.45),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center">
        <motion.p {...rise(0.1)} className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em] text-dourado">
          <span className="h-px w-8 bg-dourado/60" />{brand.role}<span className="h-px w-8 bg-dourado/60" />
        </motion.p>
        <h1 className="mt-4 font-display text-[clamp(44px,13vw,64px)] font-bold leading-[1] tracking-[-0.01em]">
          <span className="sr-only">{brand.name} — {brand.role}. </span>
          <motion.span {...rise(0.25)} className="block text-papel">Um olhar feito</motion.span>
          <motion.span {...rise(0.45)} className="-mt-1 block font-script text-[1.25em] font-normal leading-[1.1] tracking-normal text-dourado">sob medida</motion.span>
        </h1>
        <motion.p {...rise(0.7)} className="mt-4 max-w-[30ch] text-[15px] leading-snug text-papel/85">
          Cílios e sobrancelhas com atendimento individual e hora marcada.
        </motion.p>
      </div>
    </section>
    <HeroDesktop />
    </>
  )
}

/* desktop/paisagem: texto à esquerda, retrato em forma de arco na metade direita com fio dourado */
function HeroDesktop() {
  const animated = useLand()
  const rise = (delay: number) => ({ initial: animated ? { opacity: 0, y: 14 } : false, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay } } as const)
  return (
    <section className="relative hidden min-h-[max(100svh,780px)] flex-col bg-papel pt-[84px] text-cafe land:flex">
      <svg aria-hidden width="0" height="0" className="absolute">
        <clipPath id="hero-forma" clipPathUnits="objectBoundingBox"><path d="M0.5 0C0.224 0 0 0.246 0 0.55V1H1V0Z" /></clipPath>
      </svg>
      <div className="relative flex flex-1 flex-col">
        <div className="absolute inset-y-0 left-0 z-10 flex w-[52%] flex-col items-start justify-center pl-[clamp(2rem,8.2vw,8rem)] pr-6 text-left">
          <motion.p {...rise(0.1)} className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em] text-ouro">
            <span className="h-px w-12 bg-ouro/50" />{brand.role}
          </motion.p>
          <h1 className="mt-6 font-display text-[clamp(64px,6.4vw,108px)] font-bold leading-[1] tracking-[-0.01em]">
            <span className="sr-only">{brand.name} — {brand.role}. </span>
            <motion.span {...rise(0.25)} className="block text-cafe">Um olhar feito</motion.span>
            <motion.span {...rise(0.45)} className="-mt-1 block font-script text-[1.25em] font-normal leading-[1.1] tracking-normal text-ouro">sob medida</motion.span>
          </h1>
          <motion.p {...rise(0.7)} className="mt-6 max-w-[36ch] text-[18px] leading-snug text-cafe/80">
            Cílios e sobrancelhas com atendimento individual e hora marcada.
          </motion.p>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/2 [clip-path:url(#hero-forma)]">
          <motion.div {...(animated ? { initial: { scale: 1.06 }, animate: { scale: 1 }, transition: { duration: 2, ease } } : {})} className="relative size-full overflow-hidden bg-areia">
            <HeroPicture alt="Karina Fernandes" className="absolute inset-0 size-full object-cover object-[50%_28%]" />
          </motion.div>
          <svg aria-hidden viewBox="0 0 1 1" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full"
            style={{ maskImage: 'radial-gradient(ellipse 120% 120% at 0% 0%, #000 45%, transparent 85%)', WebkitMaskImage: 'radial-gradient(ellipse 120% 120% at 0% 0%, #000 45%, transparent 85%)' }}>
            <path d="M0.06 1V0.56C0.06 0.26 0.22 0.035 0.52 0.035C0.78 0.035 0.97 0.2 0.97 0.5" fill="none" stroke="#c8a063" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function Differentials() {
  return (
    <section className="overflow-hidden bg-papel px-5 py-10 lg:px-12 lg:py-28">
      <h2 className="sr-only">Diferenciais</h2>
      {/* celular: lista original, com ícone ao lado e animação na rolagem */}
      <ul className={`${wrap} lg:hidden`}>
        {differentials.map((d) => <DifferentialRow key={d.title} {...d} />)}
      </ul>
      {/* desktop: quatro colunas centralizadas */}
      <ul className={`${wrap} hidden gap-10 lg:grid lg:grid-cols-4`}>
        {differentials.map((d) => <Differential key={d.title} {...d} />)}
      </ul>
    </section>
  )
}

// celular: cada diferencial aparece acompanhando a rolagem; a divisória se desenha, o ícone gira até o lugar e o texto desliza da direita
function DifferentialRow({ icon, title, text }: { icon: string; title: string; text: string }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 100%', 'start 60%'] })
  const p = useSpring(scrollYProgress, smooth)
  const line = useTransform(p, [0.1, 1], [0, 1])
  const iconIn = useTransform(p, [0, 0.6], [0, 1])
  const iconScale = useTransform(iconIn, [0, 1], [0.4, 1])
  const iconRotate = useTransform(iconIn, [0, 1], [-30, 0])
  const textIn = useTransform(p, [0.2, 0.85], [0, 1])
  const textX = useTransform(textIn, [0, 1], [48, 0])
  const textBlur = useTransform(textIn, [0, 1], ['blur(6px)', 'blur(0px)'])
  return (
    <li ref={ref} className="group relative flex items-start gap-5 py-7 first:pt-0 lg:gap-6">
      <motion.span aria-hidden style={{ scaleX: line }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-cafe/15" />
      <motion.span style={{ opacity: iconIn, scale: iconScale, rotate: iconRotate }} className="mt-0.5 shrink-0 text-ouro">
        <span className="block transition-transform duration-300 group-hover:scale-110"><Icon name={icon} className="size-9 lg:size-10" /></span>
      </motion.span>
      <motion.div style={{ opacity: textIn, x: textX, filter: textBlur }} className="pt-1">
        <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight">{title}</h3>
        <p className="mt-1.5 max-w-[44ch] text-[15px] leading-relaxed text-cinza">{text}</p>
      </motion.div>
    </li>
  )
}

function Differential({ icon, title, text }: { icon: string; title: string; text: string }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 100%', 'start 65%'] })
  const p = useSpring(scrollYProgress, smooth)
  const inView = useTransform(p, [0, 1], [0, 1])
  const y = useTransform(inView, [0, 1], [24, 0])
  return (
    <motion.li ref={ref} style={{ opacity: inView, y }} className="flex flex-col items-center text-center">
      <span className="text-ouro"><Icon name={icon} className="size-9" /></span>
      <h3 className="mt-5 font-display text-[24px] font-semibold leading-tight tracking-tight">{title}</h3>
      <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-cinza">{text}</p>
    </motion.li>
  )
}

function BookingPolicy() {
  return (
    <section className="px-5 pt-20 text-center lg:px-12 lg:pt-32">
      <div className={`${wrap} flex flex-col items-center`}>
        <h2 className="text-[40px] sm:text-6xl"><Lines lines={['Antes de agendar']} /></h2>
        <p className="mt-5 max-w-md text-cinza">O atendimento leva de 2 a 3 horas. Confira as restrições antes de marcar o seu horário.</p>
        <Link to="/informacoes" className="group mt-8 inline-flex items-center gap-3 text-[15px] font-medium text-cafe">
          <span className="border-b border-cafe pb-1">Ver informações completas</span>
          <ArrowUpRight aria-hidden strokeWidth={1.6} className="size-5 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
      </div>
    </section>
  )
}

// selo giratório da marca: texto em círculo (a fonte vem do site, por isso é um SVG inline e não uma máscara)
function Seal() {
  return (
    <svg viewBox="0 0 160 160" aria-hidden className="size-full">
      <defs><path id="selo-circulo" d="M80 80m-56 0a56 56 0 1 1 112 0a56 56 0 1 1-112 0" /></defs>
      <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text fill="currentColor" fontSize="13.5" letterSpacing="3.2" className="font-sans" style={{ textTransform: 'uppercase' }}>
        <textPath href="#selo-circulo">Karina Fernandes · Lash Designer · </textPath>
      </text>
      <text x="80" y="92" textAnchor="middle" fill="currentColor" fontSize="40" className="font-display">KF</text>
    </svg>
  )
}

function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const spin = useTransform(scrollYProgress, [0, 1], [0, 300]) // o selo gira conforme a rolagem
  return (
    <section ref={ref} id="sobre" className="scroll-mt-20 overflow-hidden px-5 py-20 lg:px-12 lg:py-32">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24`}>
        {/* retrato em arco, com a moldura em linha fina deslocada e o selo da marca girando com a rolagem */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <span aria-hidden className="pointer-events-none absolute -inset-x-3 -bottom-3 -top-3 translate-x-3 translate-y-3 text-dourado lg:translate-x-4">
            <Deco name="moldura-arco" fit className="size-full" />
          </span>
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-areia">
            <Img name="karina-pincas" sizes="(min-width: 1024px) 45vw, 90vw" alt={`${brand.name} segurando pinças douradas de extensão de cílios`} className="absolute inset-0 size-full object-cover object-[14%_30%]" />
          </div>
          <motion.div style={{ rotate: spin }} className="absolute -bottom-7 -left-2 size-28 rounded-full bg-papel p-2 text-ouro sm:-left-6 sm:size-32 lg:-left-8">
            <Seal />
          </motion.div>
        </div>
        <div>
          <div className="flex items-start gap-3">
            <h2 className="text-[44px] sm:text-6xl"><Lines lines={['Seu olhar,', 'com mais cuidado.']} /></h2>
            <motion.span initial={{ opacity: 0, rotate: -90, scale: 0.4 }} whileInView={{ opacity: 1, rotate: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease, delay: 0.6 }} className="mt-1 text-dourado">
              <Deco name="estrela-brilho" className="block size-7 sm:size-9" />
            </motion.span>
          </div>
          <Ornament className="mt-5 w-40 text-dourado lg:w-52" />
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cafe">Sou a Karina, lash designer. Escolho com você a técnica que combina com o seu olhar, sem pressa e com atenção aos detalhes.</p>
            <div className="mt-8"><Btn to="/#procedimentos">Ver serviços e valores</Btn></div>
          </motion.div>
          <Location />
        </div>
      </div>
    </section>
  )
}

function Location() {
  if (!contact.address) return null
  const link = contact.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
  return (
    <div className="mt-10 flex items-start gap-3 border-t border-cafe/15 pt-6">
      <MapPin aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-ouro" />
      <p className="text-[15px] leading-relaxed text-cinza">
        {contact.address}{' '}
        <a href={link} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-medium text-cafe underline decoration-ouro/50 underline-offset-4 hover:decoration-ouro">Abrir no mapa<WaNote /></a>
      </p>
    </div>
  )
}

function Step({ i, title, text, progress }: { i: number; title: string; text: string; progress: MotionValue<number> }) {
  // cada etapa "acende" quando a linha do percurso chega até ela
  const at = i / steps.length
  const on = useTransform(progress, [at, at + 0.06], [0, 1])
  const dot = useTransform(on, [0, 1], ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'])
  // o texto nunca fica apagado demais: mínimo de 0.75 para continuar legível
  const fade = useTransform(on, [0, 1], [0.75, 1])
  return (
    <li className="relative">
      <motion.span style={{ backgroundColor: dot }} aria-hidden className="absolute -left-10 top-1.5 size-[15px] rounded-full border-2 border-white lg:-top-12 lg:left-0" />
      <motion.div style={{ opacity: fade }}>
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/80">Etapa {i + 1}</span>
        <h3 className="mt-2 text-[26px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-white/90">{text}</p>
      </motion.div>
    </li>
  )
}

function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 30%'] })
  const progress = useSpring(scrollYProgress, smooth)
  return (
    <section className="bg-ouro px-5 py-20 text-white lg:px-12 lg:py-32">
      <div className={wrap}>
        <h2 className="max-w-2xl text-[44px] sm:text-6xl"><Lines lines={['Do primeiro contato', 'ao olhar dos sonhos.']} /></h2>
        <ol ref={ref} className="relative mt-16 grid gap-12 pl-10 lg:mt-20 lg:grid-cols-4 lg:gap-10 lg:pl-0 lg:pt-12">
          <span aria-hidden className="absolute bottom-0 left-[6px] top-2 w-[3px] rounded-full bg-white/30 lg:inset-x-0 lg:bottom-auto lg:top-[6px] lg:h-[3px] lg:w-auto" />
          <motion.span aria-hidden style={{ scaleY: progress }} className="absolute bottom-0 left-[6px] top-2 w-[3px] origin-top rounded-full bg-papel lg:hidden" />
          <motion.span aria-hidden style={{ scaleX: progress }} className="absolute inset-x-0 top-[6px] hidden h-[3px] origin-left rounded-full bg-papel lg:block" />
          {steps.map((s, i) => <Step key={s.title} i={i} title={s.title} text={s.text} progress={progress} />)}
        </ol>
      </div>
    </section>
  )
}

// serviços avulsos (sem foto): lista editorial com valor à direita
function Extras() {
  return (
    <div className="mx-auto mt-16 max-w-xl lg:mt-24">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-ouro">Outros serviços</p>
      <ul className="mt-6">
        {extras.map((e) => (
          <li key={e.name} className="flex items-baseline gap-4 border-b border-ouro/25 py-4">
            <span className="font-display text-[26px] leading-none">{e.name}</span>
            <span aria-hidden className="flex-1 translate-y-[-4px] border-b border-dotted border-ouro/40" />
            <span className="font-display text-[26px] leading-none text-ouro">{brl(e.price)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <title>Karina Fernandes | Lash Designer</title>
      <Hero />
      <Differentials />
      <About />

      {/* Serviços: seção simples; só as ondas de troca de seção como ornamento */}
      <section id="procedimentos" className="relative scroll-mt-20 bg-creme px-5 pb-28 pt-28 lg:px-12 lg:pb-44 lg:pt-44">
        {/* ondas de troca de seção: entram e saem do papel; proporção fixa 1440x120, ampliada e centralizada no celular */}
        <div aria-hidden className="absolute inset-x-0 -top-px flex overflow-hidden text-papel">
          <Deco name="onda-secao" className="block aspect-[1440/120] w-[220%] -translate-x-[27%] -scale-y-100 sm:w-[calc(100%+4px)] sm:-translate-x-0.5" />
        </div>
        <div aria-hidden className="absolute inset-x-0 -bottom-px flex overflow-hidden text-papel">
          <Deco name="onda-secao" className="block aspect-[1440/120] w-[220%] -translate-x-[27%] sm:w-[calc(100%+4px)] sm:-translate-x-0.5" />
        </div>
        <div className={`${wrap} relative`}>
          <h2 className="text-center text-[44px] sm:text-6xl"><Lines lines={['Serviços e valores']} /></h2>
          <ProcedureList />
          <Extras />
          <Hours />
        </div>
      </section>

      <ScrollMarquee words={['Brasileiro', 'Egípcio', 'Luxo', 'Fox Eyes', 'Glamour']} />

      <HowItWorks />

      <BookingPolicy />

      <section id="faq" className="scroll-mt-20 px-5 py-20 lg:px-12 lg:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div>
            <h2 className="text-[44px] sm:text-6xl"><Lines lines={['Perguntas', 'frequentes']} /></h2>
            <p className="mt-5 max-w-sm text-cinza">Não encontrou o que procurava? Chame no WhatsApp, respondo com prazer.</p>
            <div className="mt-6"><Btn variant="outline" href={waUrl(undefined, 'duvida')}>Tirar dúvida no WhatsApp<WaNote /></Btn></div>
          </div>
          <Faq />
        </div>
      </section>
    </>
  )
}
