import { useRef, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import CardDeckCarousel, { type Slide } from '../components/ui/card-deck-carousel'
import { Btn, Deco, Icon, WaNote } from '../components/Ui'
import { Lines, Ornament, ease } from '../components/Motion'
import { HeroPicture, Img } from '../components/Img'
import Faq from '../components/Faq'
import { ScrollMarquee } from '../components/Scroll'
import Hours from '../components/Hours'
import { brand, brl, contact, differentials, extras, priceLabel, procedures, steps, waUrl } from '../lib/data'

const wrap = 'mx-auto max-w-[1200px]'
const smooth = { stiffness: 70, damping: 24, mass: 0.5 }
// fotos reais dos serviços (recortadas do catálogo; WebP otimizado em public/assets, gerado por `npm run images`)
const deckSlides: Slide[] = procedures.map((p) => ({ image: p.photo, title: p.name, caption: p.description, price: priceLabel(p), alt: p.alt }))

// catálogo: cartões empilhados (arraste, use as setas ou os botões). Título, descrição e valor ficam sobre a foto;
// o botão de agendar acompanha o cartão do topo na faixa de controles
const subscribeWide = (cb: () => void) => { const m = window.matchMedia('(min-width: 1024px)'); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) }
function ProcedureDeck() {
  // desktop: a pilha abre em leque para os lados; celular: pilha reta e compacta
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia('(min-width: 1024px)').matches, () => false)
  return (
    <div className="mt-2 lg:mt-6">
      <CardDeckCarousel slides={deckSlides} aspect="4 / 5" scatter={wide ? 11 : 7} spread={wide ? 120 : 0} autoplay={0} height="min(100svh, 780px)" cardWidth="min(78vw, 400px)" showCount={false}
        style={{ height: 'auto' }} background="transparent" ink="var(--color-cafe)" ariaLabel="Serviços"
        meta={(i) => <div><Btn href={waUrl(procedures[i].name)} className="w-full">Agendar<span className="sr-only"> {procedures[i].name}</span><WaNote /></Btn></div>} />
    </div>
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
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-papel text-cafe land:min-h-[max(100svh,780px)] land:overflow-visible land:pt-[84px]">
      <h1 className="sr-only">{brand.name} — {brand.role}</h1>
      <svg aria-hidden width="0" height="0" className="absolute">
        <clipPath id="hero-forma" clipPathUnits="objectBoundingBox"><path d="M0.5 0C0.224 0 0 0.246 0 0.55V1H1V0Z" /></clipPath>
      </svg>
      <div className="relative flex flex-1 flex-col">
        <div className="relative z-10 flex flex-col items-center px-5 pt-[104px] text-center sm:px-8 land:absolute land:inset-y-0 land:left-0 land:w-[52%] land:items-start land:justify-center land:pl-[clamp(2rem,8.2vw,8rem)] land:pr-6 land:pt-0 land:text-left">
          <motion.div {...rise(0.1)}>
            <Img name="logo-ouro" sizes="(min-width: 1024px) 380px, 240px" alt={`${brand.name}, ${brand.role}`} loading="eager" className="h-auto w-[min(13rem,56vw)] sm:w-60 land:w-[min(22rem,27vw)]" />
          </motion.div>
          <motion.div {...rise(0.4)} className="mt-5 flex items-center gap-3 text-dourado land:mt-6">
            <span className="h-px w-10 bg-dourado/60 land:w-16" />
            <Deco name="estrela-brilho" className="size-3.5 shrink-0" />
            <span className="h-px w-10 bg-dourado/60 land:w-16" />
          </motion.div>
          <motion.p {...rise(0.65)} className="mt-6 font-script text-[clamp(46px,12vw,64px)] leading-[1.05] text-ouro land:mt-7 land:text-[clamp(56px,6vw,96px)]">
            Realce o seu olhar.
          </motion.p>
          <motion.div {...rise(1.0)} className="mt-8 land:mt-10">
            <a href={waUrl()} target="_blank" rel="noopener noreferrer"
              className="inline-flex min-h-[3.25rem] cursor-pointer items-center gap-2.5 rounded-full bg-ouro px-9 text-[15px] font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-ouro-escuro">
              <Icon name="chat" className="size-5" />Agendar horário<WaNote />
            </a>
          </motion.div>
        </div>
        {/* celular: retrato em arco com moldura fina deslocada (sem gradiente); desktop: forma em arco na metade direita */}
        <div className="relative mx-auto mb-14 mt-14 w-[min(76vw,330px)] land:absolute land:inset-y-0 land:left-auto land:right-0 land:m-0 land:w-1/2 land:[clip-path:url(#hero-forma)]">
          <span aria-hidden className="pointer-events-none absolute -inset-x-3 -bottom-3 -top-3 translate-x-3 translate-y-3 text-dourado land:hidden">
            <Deco name="moldura-arco" fit className="size-full" />
          </span>
          <motion.div {...(animated ? { initial: { scale: 1.06 }, animate: { scale: 1 }, transition: { duration: 2, ease } } : {})}
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[20px] bg-areia land:aspect-auto land:size-full land:rounded-none">
            <HeroPicture alt="Karina Fernandes" className="absolute inset-0 size-full object-cover object-[44%_12%]" />
          </motion.div>
          <svg aria-hidden viewBox="0 0 1 1" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden size-full land:block"
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
            <Img name="karina-pincas" sizes="(min-width: 1024px) 45vw, 90vw" alt={`${brand.name} segurando pinças douradas de extensão de cílios`} className="absolute inset-0 size-full object-cover object-[50%_30%]" />
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
          <ProcedureDeck />
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
