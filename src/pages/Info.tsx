import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { CircleAlert, Clock3, Heart } from 'lucide-react'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import Hours from '../components/Hours'
import { Lines, Ornament, ease } from '../components/Motion'
import { Btn, WaNote } from '../components/Ui'
import { infos, policiesThanks, restrictions, waUrl } from '../lib/data'

// um ícone por informação, na mesma ordem de `infos` em lib/data.ts
const infoIcons = [Clock3, Heart].map((I, i) => <I key={i} aria-hidden strokeWidth={1.6} className="size-8" />)

// números tirados dos próprios textos do catálogo
const facts = [
  { big: '2 a 3 h', label: 'de duração média do procedimento' },
  { big: String(restrictions.length), label: 'restrições para conferir antes de agendar' },
]

export default function Info() {
  const [ok, setOk] = useState(false)
  const [warn, setWarn] = useState(false) // tentou agendar sem marcar a confirmação
  const check = useRef<HTMLInputElement>(null)
  return (
    <>
      <title>Informações e horários | Karina Fernandes</title>
      <PageHero eyebrow="Informações" lines={['Um momento de calma', 'e cuidado só seu.']}
        sub="Confira o que você precisa saber antes do seu horário, para um resultado perfeito." />

      {/* o essencial em dois números */}
      <section className="px-5 pb-6 pt-4 lg:px-12">
        <ul className="mx-auto grid max-w-[1200px] gap-px overflow-hidden rounded-[10px] bg-cafe/10 sm:grid-cols-2">
          {facts.map((f, i) => (
            <motion.li key={f.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, ease, delay: i * 0.1 }} className="bg-creme px-7 py-8">
              <p className="font-display text-6xl font-medium leading-none text-ouro">{f.big}</p>
              <p className="mt-3 max-w-[26ch] text-[15px] leading-snug text-cinza">{f.label}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="px-5 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-xl">
            <h2 className="text-[44px] sm:text-6xl"><Lines lines={['Antes de', 'agendar.']} /></h2>
            <Ornament className="mt-4 w-44 text-dourado sm:w-60" />
          </div>
          <h3 className="sr-only">Informações</h3>
          <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {infos.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className="group rounded-[10px] border border-cafe/10 bg-papel p-7 transition-colors duration-300 hover:border-ouro/60">
                <div className="text-ouro transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 [&>svg]:origin-left">{infoIcons[i]}</div>
                <dt className="mt-5 font-display text-[28px] font-semibold leading-tight">{p.title}</dt>
                <dd className="mt-2 text-[16px] leading-relaxed text-cinza">{p.text}</dd>
              </motion.div>
            ))}
          </dl>

          {/* restrições: lista numa moldura fina, como no catálogo */}
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease }} className="mt-16 rounded-[10px] border border-ouro/30 bg-creme p-7 sm:p-12">
            <h3 className="text-[34px] sm:text-5xl">Restrições</h3>
            <Ornament className="mt-4 w-40 text-dourado" />
            <ul className="mt-8">
              {restrictions.map((r) => (
                <li key={r} className="flex items-start gap-4 border-b border-ouro/20 py-4 last:border-b-0">
                  <CircleAlert aria-hidden strokeWidth={1.5} className="mt-0.5 size-6 shrink-0 text-ouro" />
                  <span className="text-[16px] leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <Hours />

          {/* confirmação e botão: cartão na cor da marca */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease }}
            className="mt-16 grid gap-8 rounded-[10px] bg-ouro p-8 text-white sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <h3 className="text-[36px] sm:text-5xl">Pronta para reservar seu horário?</h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed">Ao confirmar, você declara estar ciente das informações e restrições acima. Depois é só chamar no WhatsApp.</p>
              <p className="mt-3 font-script text-[34px] leading-none">{policiesThanks}</p>
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-[16px]">
                <input ref={check} type="checkbox" checked={ok} onChange={(e) => { setOk(e.target.checked); if (e.target.checked) setWarn(false) }} className="mt-0.5 size-5 shrink-0 accent-white" /> Li e estou ciente das informações e restrições
              </label>
              {/* o link só abre o WhatsApp com a confirmação marcada; sem ela, explica o motivo (sem `disabled`, continua focável) */}
              <div className="mt-6">
                <Btn variant="white" href={waUrl()} aria-disabled={!ok} aria-describedby={ok ? undefined : 'aviso-politicas'} className={`w-full sm:w-auto ${ok ? '' : 'cursor-not-allowed opacity-60'}`}
                  onClick={(e) => { if (!ok) { e.preventDefault(); setWarn(true); check.current?.focus() } }}>
                  Agendar pelo WhatsApp<WaNote />
                </Btn>
              </div>
              <p id="aviso-politicas" aria-live="polite" className="mt-3 min-h-6 text-[15px]">{warn && !ok ? 'Marque “Li e estou ciente das informações e restrições” para continuar.' : ''}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-creme px-5 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
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
