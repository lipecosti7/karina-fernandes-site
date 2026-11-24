import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Img } from './Img'
import { Banknote, Brush, CalendarCheck, Clock, CreditCard, Leaf, MapPin, MessageCircle, ScanEye, ScanFace, ShieldCheck, Sparkles } from 'lucide-react'
import { FaInstagram, FaPix, FaWhatsapp } from 'react-icons/fa6'

// o anel de foco vem do index.css (global)
const base = 'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-colors duration-200'
const styles = {
  primary: 'bg-ouro text-white hover:bg-ouro-escuro',
  white: 'bg-papel text-ouro hover:bg-creme',
  outline: 'border border-cafe/30 text-cafe hover:border-cafe',
}
type BtnProps = {
  variant?: keyof typeof styles; to?: string; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void; children: ReactNode; className?: string
  'aria-disabled'?: boolean; 'aria-describedby'?: string
}
export function Btn({ variant = 'primary', to, href, onClick, children, className = '', ...aria }: BtnProps) {
  const cls = `${base} ${styles[variant]} ${className}`
  // href = link externo (WhatsApp, Instagram): abre em nova aba
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls} {...aria}>{children}</a>
  return to ? <Link to={to} className={cls} {...aria}>{children}</Link> : <button type="button" onClick={onClick} className={cls} {...aria}>{children}</button>
}
// texto extra para leitores de tela nos links que saem do site
export const WaNote = () => <span className="sr-only"> (abre o WhatsApp)</span>
// Ícones de biblioteca: Lucide (traço fino, combina com o estilo delicado da marca) e Font Awesome só para as marcas (WhatsApp, Instagram).
// Herdam a cor do texto (currentColor); o tamanho vem da classe (size-*).
const lucide = { map: ScanFace, leaf: Leaf, shield: ShieldCheck, calendar: CalendarCheck, pin: MapPin, clock: Clock, talk: MessageCircle, look: ScanEye, brush: Brush, care: Sparkles, cash: Banknote, card: CreditCard } as const
export const Icon = ({ name, className = 'size-6' }: { name: string; className?: string }) => {
  if (name === 'chat') return <FaWhatsapp aria-hidden className={`shrink-0 ${className}`} />
  if (name === 'pix') return <FaPix aria-hidden className={`shrink-0 ${className}`} />
  if (name === 'instagram') return <FaInstagram aria-hidden className={`shrink-0 ${className}`} />
  const L = lucide[name as keyof typeof lucide]
  return L ? <L aria-hidden strokeWidth={1.6} className={`shrink-0 ${className}`} /> : null
}
// Logo da Karina (monograma KF + assinatura + "Lash Designer"), extraída do catálogo.
// full = lockup completo; mono = só o monograma (cabeçalho). light = versão clara para fundos dourados/escuros.
// decorative: alt vazio quando o nome já aparece ao lado (rodapé, menu)
export const Logo = ({ light, decorative, variant = 'full', className = 'h-[48px]' }: { light?: boolean; decorative?: boolean; variant?: 'full' | 'mono'; className?: string }) => (
  <Img name={variant === 'mono' ? (light ? 'logo-mono-claro' : 'logo-mono') : light ? 'logo-claro' : 'logo-ouro'} sizes={variant === 'mono' ? '100px' : '(min-width: 1024px) 420px, 280px'} loading="eager" alt={decorative ? '' : 'Karina Fernandes, Lash Designer'} className={`w-auto ${className}`} />
)

// ornamentos de /assets/svg (arco, pincel, fios, brilho, selo...), pintados com a cor do texto (currentColor) por máscara
export const Deco = ({ name, className = '', fit }: { name: string; className?: string; fit?: boolean }) => {
  const url = `url(/assets/svg/${name}.svg)`
  return <span aria-hidden className={`inline-block shrink-0 bg-current ${className}`} style={{ maskImage: url, WebkitMaskImage: url, maskSize: fit ? '100% 100%' : 'contain', WebkitMaskSize: fit ? '100% 100%' : 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }} />
}
