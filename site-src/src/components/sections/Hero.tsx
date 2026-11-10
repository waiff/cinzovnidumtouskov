import { ArrowRight, Building2, DoorOpen, LayoutGrid, MapPin } from 'lucide-react'
import { totals } from '../../data/apartments'
import { site } from '../../data/site'
import { formatArea } from '../../lib/format'
import { Button } from '../ui/Button'
import { BuildingStack } from './BuildingStack'

const stats = [
  { value: String(totals.apartments), label: 'vybavených bytů' },
  { value: formatArea(totals.area), label: 'obytné plochy' },
  { value: `${totals.persons.A} / ${totals.persons.B}`, label: 'lůžek dle varianty' },
  { value: String(totals.gardens), label: 'byty se zahrádkou' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] size-[720px] rounded-full bg-brand-200/45 blur-[120px]" />
        <div className="absolute top-40 -left-40 size-[520px] rounded-full bg-sand blur-[100px]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="flex flex-col lg:col-span-7 lg:pt-6">
          <div className="flex animate-fade-up flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50/80 px-3 py-1.5 text-[13px] font-medium text-brand-800 backdrop-blur-md">
              <Building2 className="size-3.5" />
              Pronájem celého domu firmě
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-300/70 bg-white/70 px-3 py-1.5 text-[13px] font-medium text-ink-soft backdrop-blur-md">
              <MapPin className="size-3.5 text-brand-600" />
              {site.address.city} · 9 km od Plzně
            </span>
          </div>

          <h1 className="mt-7 animate-fade-up text-balance text-[40px] leading-[1.02] font-semibold tracking-[-0.035em] text-ink [animation-delay:80ms] sm:text-[56px] lg:text-[64px]">
            8 vybavených bytů pro{' '}
            <em className="font-serif font-normal tracking-[-0.01em] text-brand-700">16&nbsp;nebo&nbsp;24</em> zaměstnanců
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-pretty text-[17px] leading-relaxed text-muted [animation-delay:160ms] sm:text-lg">
            Každý byt má vlastní vstup, koupelnu s WC a kuchyňský kout. Každý nájemník má vlastní lůžko, uzamykatelnou skříň a místo u stolu. Na pokoji
            bydlí nejvýše dvě osoby.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Button href="#poptavka" size="lg" iconRight={<ArrowRight className="size-4" />}>
              Poptat ubytování
            </Button>
            <Button href="#pudorysy" size="lg" variant="secondary" icon={<LayoutGrid className="size-4 text-brand-600" />}>
              Prohlédnout půdorysy
            </Button>
          </div>

          <dl className="mt-12 grid animate-fade-up grid-cols-2 overflow-hidden rounded-2xl border border-stone-300/60 bg-white/60 shadow-soft backdrop-blur-md [animation-delay:320ms] sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={[
                  'flex flex-col gap-1 px-5 py-4',
                  i % 2 === 1 ? 'border-l border-stone-300/50' : '',
                  i >= 2 ? 'border-t border-stone-300/50 sm:border-t-0' : '',
                  i === 2 ? 'sm:border-l' : '',
                ].join(' ')}
              >
                <dt className="order-2 text-[13px] text-muted">{s.label}</dt>
                <dd className="order-1 text-[22px] font-semibold tracking-tight text-ink tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 flex animate-fade-up items-center gap-2 text-[13px] text-muted [animation-delay:400ms]">
            <DoorOpen className="size-4 text-brand-600" />
            Vlastní vstup do každého bytu · byty 1, 2 a 7 se zahrádkou
          </p>
        </div>

        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">
          <BuildingStack />
        </div>
      </div>
    </section>
  )
}
