import * as Accordion from '@radix-ui/react-accordion'
import { faq } from '../lib/data'

/** Lista de perguntas frequentes; a resposta abre com a altura animada (ver .acc no index.css). */
export default function Faq() {
  return (
    <Accordion.Root type="single" collapsible className="border-t border-papel/15">
      {faq.map((f) => (
        <Accordion.Item key={f.q} value={f.q} className="border-b border-papel/15">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-[21px] font-normal leading-tight tracking-normal transition-colors hover:text-dourado sm:text-[24px]">
              {f.q}
              <svg className="shrink-0 text-dourado transition-transform duration-300 group-data-[state=open]:rotate-45" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 4v16M4 12h16" /></svg>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="acc overflow-hidden">
            <p className="max-w-[60ch] pb-5 pr-10 text-[14.5px] font-light leading-relaxed text-papel/70">{f.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
