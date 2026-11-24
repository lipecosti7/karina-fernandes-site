import { motion } from 'motion/react'
import { Quote } from 'lucide-react'
import PageHero from '../components/PageHero'
import { Lines, ease } from '../components/Motion'
import { Btn, Deco, Icon, WaNote } from '../components/Ui'
import { contact, differentials, gallery, testimonials, waUrl } from '../lib/data'

export default function Feedbacks() {
  return (
    <>
      <title>Feedbacks | Karina Fernandes</title>
      <PageHero eyebrow="Feedbacks" lines={['A confiança de quem', 'já viveu essa experiência.']}
        sub="Conheça as experiências de clientes que confiaram seus momentos de cuidado ao meu atendimento." />

      <section className="px-5 pb-20 pt-6 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-[1200px]">
          {testimonials.length > 0 ? (
            <>
              <h2 className="sr-only">Depoimentos</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t, i) => (
                  <motion.figure key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, ease, delay: (i % 3) * 0.1 }} className="flex flex-col rounded-[10px] border border-cafe/10 bg-papel p-7">
                    <Quote aria-hidden strokeWidth={1.6} className="size-8 text-ouro" />
                    <p className="mt-4 text-sm tracking-widest text-ouro"><span aria-hidden>{'★'.repeat(t.rating)}</span><span className="sr-only">Nota {t.rating} de 5</span></p>
                    <blockquote className="mt-3 flex-1 text-lg leading-relaxed">{t.text}</blockquote>
                    <figcaption className="mt-5 border-t border-cafe/10 pt-4 text-[15px] font-semibold">{t.name}</figcaption>
                  </motion.figure>
                ))}
              </div>
            </>
          ) : (
            /* sem depoimentos reais ainda (nada é inventado): painel de convite no lugar */
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              className="relative overflow-hidden rounded-[10px] bg-creme px-7 py-12 sm:px-14 sm:py-16">
              <span aria-hidden className="absolute inset-0 bg-dourado" style={{ maskImage: 'url(/assets/svg/cilios-padrao.svg)', WebkitMaskImage: 'url(/assets/svg/cilios-padrao.svg)', maskSize: '160px', WebkitMaskSize: '160px' }} />
              <Quote aria-hidden strokeWidth={1.4} className="absolute -bottom-6 -right-3 size-32 text-dourado/30 sm:-right-4 sm:-top-4 sm:bottom-auto sm:size-56" />
              <div className="relative max-w-2xl">
                <h2 className="text-[34px] sm:text-5xl"><Lines lines={['Os primeiros depoimentos', 'chegam em breve.']} /></h2>
                <p className="mt-5 text-lg leading-relaxed text-cinza">Estou reunindo, com autorização, as experiências de quem já passou pelo atendimento. Enquanto isso, tire suas dúvidas direto pelo WhatsApp.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Btn href={waUrl(undefined, 'duvida')}><Icon name="chat" className="size-5" />Tirar dúvida no WhatsApp<WaNote /></Btn>
                  {contact.instagram && <Btn variant="outline" href={`https://instagram.com/${contact.instagram}`}><Icon name="instagram" className="size-5" />Ver no Instagram</Btn>}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="bg-creme px-5 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="mb-12 text-[44px] sm:text-6xl"><Lines lines={['Antes e depois']} /></h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {gallery.map((g, n) => (
                <motion.div key={n} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
                  {/* o observador olha o contêiner; o recorte abre no filho (clip-path fechado no alvo não disparava no celular) */}
                  <motion.div variants={{ hidden: { clipPath: 'inset(0 100% 0 0)' }, show: { clipPath: 'inset(0 0% 0 0)' } }} transition={{ duration: 1.1, ease }} className="grid grid-cols-2 gap-1 overflow-hidden rounded-[10px]">
                    <figure className="relative"><img src={g.before} alt="Antes" loading="lazy" className="h-64 w-full object-cover" /><figcaption className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">Antes</figcaption></figure>
                    <figure className="relative"><img src={g.after} alt="Depois" loading="lazy" className="h-64 w-full object-cover" /><figcaption className="absolute left-3 top-3 rounded-full bg-ouro px-3 py-1 text-xs text-white">Depois</figcaption></figure>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* o que a cliente encontra no atendimento (os mesmos diferenciais do site) */}
      <section className="bg-creme px-5 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-xl">
            <h2 className="text-[44px] sm:text-6xl"><Lines lines={['O que você', 'encontra aqui.']} /></h2>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="mt-3 w-44 sm:w-60">
              <motion.div variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }} transition={{ duration: 1, ease, delay: 0.4 }} style={{ originX: 0 }} className="text-dourado">
                <Deco name="sublinhado-pincel" className="block aspect-[300/16] w-full" />
              </motion.div>
            </motion.div>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {differentials.map((d, i) => (
              <motion.li key={d.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="group rounded-[10px] border border-cafe/10 bg-papel p-7 transition-colors duration-300 hover:border-ouro/60">
                <span className="inline-block text-ouro transition-transform duration-300 group-hover:scale-110"><Icon name={d.icon} className="size-9" /></span>
                <h3 className="mt-5 font-display text-[22px] font-semibold leading-tight tracking-tight">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cinza">{d.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl text-[44px] sm:text-6xl"><Lines lines={['A próxima experiência', 'pode ser a sua.']} /></h2>
          <Btn href={waUrl()}>Agendar pelo WhatsApp<WaNote /></Btn>
        </div>
      </section>
    </>
  )
}
