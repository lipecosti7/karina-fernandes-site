import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Deco } from './Ui'

const smooth = { stiffness: 70, damping: 24, mass: 0.5, restDelta: 0.0005 }

/** Faixa de palavras que desliza lateralmente conforme a rolagem; cada linha anda para um lado. */
export function ScrollMarquee({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scrollYProgress = useSpring(raw, smooth)
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const right = useTransform(scrollYProgress, [0, 1], ['-35%', '0%'])
  const row = [...words, ...words, ...words]
  // separador: o brilho do catálogo
  const sep = <Deco name="estrela-brilho" className="size-[0.7em] shrink-0 text-ouro" />
  const cls = 'flex w-max items-center gap-8 whitespace-nowrap font-display text-[clamp(52px,8.5vw,128px)] font-medium italic leading-[1.05]'
  return (
    <div ref={ref} aria-hidden className="overflow-hidden bg-papel py-12 lg:py-20">
      <motion.div style={{ x: left }} className={`${cls} text-dourado`}>
        {row.map((w, i) => <span key={i} className="flex items-center gap-[0.35em]">{w}{sep}</span>)}
      </motion.div>
      <motion.div style={{ x: right }} className={`${cls} mt-1 text-[#e6d3b5]`}>
        {row.map((w, i) => <span key={i} className="flex items-center gap-[0.35em]">{w}{sep}</span>)}
      </motion.div>
    </div>
  )
}
