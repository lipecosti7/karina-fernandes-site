import { type ReactNode } from 'react'
import { motion } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1] as const

/** Título que sobe linha a linha por trás de uma máscara. `now` anima no carregamento; senão, ao entrar na tela. */
export function Lines({ lines, delay = 0, now, still }: { lines: ReactNode[]; delay?: number; now?: boolean; still?: boolean }) {
  if (still) return <span className="block">{lines.map((l, i) => <span key={i} className="block">{l}</span>)}</span>
  // observa o wrapper (que não é recortado): o span interno nasce fora da máscara e o observer nunca o veria
  const trigger = now ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.15 } }
  return (
    // cada máscara ganha 0.12em acima e abaixo para não cortar acentos nem descendentes (ç, g, p);
    // a margem só para baixo (sem colapso entre irmãos) devolve o espaçamento original entre as linhas
    <motion.span className="-mt-[0.12em] block pb-[0.24em]" initial="hidden" {...trigger}>
      {lines.map((l, i) => (
        <span key={i} className="-mb-[0.24em] block overflow-hidden py-[0.12em]">
          <motion.span className="block" variants={{
            hidden: { y: '110%' },
            show: { y: 0, transition: { duration: 0.9, ease, delay: delay + i * 0.09 } },
          }}>{l}</motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Divisória do catálogo: fio fino com um pequeno losango ornamental no centro. Se desenha ao entrar na tela. */
export function Ornament({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg viewBox="0 0 200 12" fill="none" aria-hidden initial="hidden" whileInView="show" viewport={{ once: true }} className={`overflow-visible ${className}`}>
      <motion.path d="M0 6H84M116 6H200" stroke="currentColor" strokeWidth="1" strokeLinecap="round" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }} transition={{ duration: 1.1, ease, delay }} />
      <motion.g stroke="currentColor" strokeWidth="1" variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1 } }} transition={{ duration: 0.8, ease, delay: delay + 0.5 }} style={{ transformOrigin: '100px 6px' }}>
        <path d="M100 1l5 5-5 5-5-5z" />
        <path d="M88 6h4M108 6h4" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  )
}

// ---------- Cílios fio a fio ----------
// Pálpebra em arco com leques de cílios que "nascem" um a um (do canto interno ao externo). Gerado uma vez.
const LASH_N = 23
const lid = (t: number) => ({ x: 20 + t * 260, y: 118 - 74 * Math.sin(t * Math.PI) * (1 - 0.18 * t) })
const lashes = Array.from({ length: LASH_N }, (_, i) => {
  const t = i / (LASH_N - 1)
  const b = lid(t)
  const a = Math.PI * (1.12 - 1.26 * t) + (t > 0.7 ? 0.2 * (t - 0.7) : 0) // ângulo: do canto interno (para cima/esq.) ao externo (para a direita)
  const len = 26 + 30 * Math.sin(Math.min(1, t * 1.15) * Math.PI * 0.9) + (i % 2) * 6
  const dir = { x: Math.cos(a), y: -Math.sin(a) }
  const e = { x: b.x + dir.x * len, y: b.y + dir.y * len }
  const c = { x: b.x + dir.x * len * 0.5 - dir.y * 5, y: b.y + dir.y * len * 0.5 + dir.x * 5 } // leve curvatura
  return { d: `M${b.x.toFixed(1)} ${b.y.toFixed(1)}Q${c.x.toFixed(1)} ${c.y.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`, w: 1.3 + (i % 3) * 0.35 }
})

/** Olho desenhado em linha fina: pálpebra, íris e cílios. `mode="load"` anima ao carregar; "view" ao entrar na tela. */
export function Lashes({ className = '', delay = 0, mode = 'view' }: { className?: string; delay?: number; mode?: 'load' | 'view' }) {
  const trigger = mode === 'load' ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-80px' } }
  return (
    <motion.svg viewBox="0 0 300 180" fill="none" aria-hidden initial="hidden" {...trigger} className={`overflow-visible ${className}`}>
      <g stroke="currentColor" strokeLinecap="round">
        <motion.path d="M20 118C70 142 130 150 160 150C200 150 250 138 280 118" strokeWidth="1.6" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }} transition={{ duration: 1.6, ease, delay }} />
        <motion.path d={Array.from({ length: 41 }, (_, i) => { const p = lid(i / 40); return `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}` }).join('')} strokeWidth="1.8" variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }} transition={{ duration: 1.6, ease, delay }} />
        <motion.circle cx="150" cy="116" r="24" strokeWidth="1.3" variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }} transition={{ duration: 1, ease, delay: delay + 0.5 }} style={{ transformOrigin: '150px 116px' }} />
        <motion.circle cx="150" cy="116" r="9" fill="currentColor" strokeWidth="0" variants={{ hidden: { opacity: 0 }, show: { opacity: 0.85 } }} transition={{ duration: 1, delay: delay + 0.8 }} />
        {lashes.map((l, i) => (
          <motion.path key={i} d={l.d} strokeWidth={l.w} variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.7, ease, delay: delay + 0.9 + i * 0.07 }} />
        ))}
      </g>
    </motion.svg>
  )
}
