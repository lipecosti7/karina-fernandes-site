import { Icon } from './Ui'
import { Lines, Ornament } from './Motion'
import { payments, schedule } from '../lib/data'

// horários e formas de pagamento (catálogo), logo abaixo dos serviços
export default function Hours({ className = 'mt-20 lg:mt-28 border-t border-ouro/20 pt-14 lg:pt-20' }: { className?: string }) {
  return (
    <div className={`grid gap-12 lg:grid-cols-2 lg:gap-20 ${className}`}>
      <div>
        <h3 className="text-[34px] sm:text-5xl"><Lines lines={['Horário de', 'funcionamento']} /></h3>
        <Ornament className="mt-5 w-40 text-dourado" />
        <dl className="mt-8">
          {schedule.map((h) => (
            <div key={h.days} className="flex items-baseline justify-between gap-6 border-b border-ouro/20 py-4 first:pt-0">
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-cinza">{h.days}</dt>
              <dd className="font-display text-[30px] leading-none text-ouro sm:text-[38px]">{h.time}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h3 className="text-[34px] sm:text-5xl"><Lines lines={['Formas de', 'pagamento']} /></h3>
        <Ornament className="mt-5 w-40 text-dourado" />
        <ul className="mt-8 grid grid-cols-3 gap-3">
          {payments.map((p) => (
            <li key={p.label} className="flex flex-col items-center rounded-[18px] border border-ouro/25 bg-papel px-2 py-6 text-center text-ouro">
              <Icon name={p.icon} className="size-9" />
              <span className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-cafe">{p.label}</span>
              {'note' in p && <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-cinza">{p.note}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

