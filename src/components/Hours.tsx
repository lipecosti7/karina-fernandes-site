import { schedule, payments } from '../lib/data'

// "8:00 às 20:00" -> "8h — 20h"
const fmt = (t: string) => t.replace(/(\d+):00/g, '$1h').replace(' às ', ' — ')

// horários e formas de pagamento: tipográfico, centralizado e discreto
export default function Hours({ className = 'mt-20 lg:mt-28 border-t border-ouro/20 pt-14 lg:pt-20' }: { className?: string }) {
  return (
    <div className={`mx-auto flex max-w-xl flex-col items-center text-center ${className}`}>
      <p className="text-[10.5px] font-normal uppercase tracking-[0.42em] text-ouro">Horário de funcionamento</p>
      <dl className="mt-9">
        {schedule.map((h, i) => (
          <div key={h.days} className={i ? 'mt-7 border-t border-cafe/15 pt-7' : ''}>
            <dt className="text-[10px] font-normal uppercase tracking-[0.3em] text-cinza">{h.days}</dt>
            <dd className="mt-2 font-numeral text-[44px] leading-none text-cafe">{fmt(h.time)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-[13px] font-light text-cinza">
        {payments.map((p) => ('note' in p ? `${p.label} (${p.note})` : p.label)).join('  ·  ')}
      </p>
    </div>
  )
}
