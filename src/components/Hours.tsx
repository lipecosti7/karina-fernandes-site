import { schedule, payments } from '../lib/data'

// horários e formas de pagamento: bloco único, centralizado e discreto
export default function Hours({ className = 'mt-20 lg:mt-28 border-t border-ouro/20 pt-14 lg:pt-20' }: { className?: string }) {
  return (
    <div className={`mx-auto flex max-w-xl flex-col items-center text-center ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ouro">Horário de funcionamento</p>
      <dl className="mt-6 grid gap-3">
        {schedule.map((h) => (
          <div key={h.days} className="flex flex-wrap items-baseline justify-center gap-x-4">
            <dt className="text-xs font-medium uppercase tracking-[0.2em] text-cinza">{h.days}</dt>
            <dd className="font-display text-[26px] leading-none text-cafe">{h.time}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-sm text-cinza">
        {payments.map((p) => ('note' in p ? `${p.label} (${p.note})` : p.label)).join('  ·  ')}
      </p>
    </div>
  )
}
