import { motion } from 'motion/react'
import { Lines, ease } from './Motion'
import { Deco } from './Ui'

/** Topo das páginas internas: etiqueta, título em linhas, subtítulo e onda de transição para a próxima seção. */
export default function PageHero({ eyebrow, lines, sub }: { eyebrow: string; lines: string[]; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-ouro px-5 pb-28 pt-[128px] text-white lg:px-12 lg:pb-40 lg:pt-[168px]">
      {/* textura de fios da marca, bem sutil, no lugar da sobrancelha grande que passava por trás do título */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-papel/20" style={{ maskImage: 'url(/assets/svg/cilios-padrao.svg)', WebkitMaskImage: 'url(/assets/svg/cilios-padrao.svg)', maskSize: '160px', WebkitMaskSize: '160px' }} />
      <div className="relative mx-auto max-w-[1200px]">
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
          <Deco name="estrela-brilho" className="size-4" />{eyebrow}
        </motion.p>
        <h1 className="max-w-4xl text-[clamp(28px,7.4vw,72px)]"><Lines now lines={lines} delay={0.1} /></h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.5 }}
          className="mt-7 max-w-md text-lg leading-relaxed text-white">{sub}</motion.p>
      </div>
      {/* a onda tem proporção fixa (1440x120): no celular aparece ampliada e recortada ao centro, para não ficar rasa */}
      <div aria-hidden className="absolute inset-x-0 -bottom-px flex overflow-hidden text-papel">
        <Deco name="onda-secao" className="block aspect-[1440/120] w-[220%] -translate-x-[27%] sm:w-[calc(100%+4px)] sm:-translate-x-0.5" />
      </div>
    </section>
  )
}
