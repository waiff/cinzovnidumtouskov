import { ArrowRight, BadgeCheck, Check, MessageSquareQuote, Users } from 'lucide-react'
import { variants, type VariantId } from '../../data/apartments'
import { pricing, pricingIncludes } from '../../data/pricing'
import { useExplorer } from '../../context/VariantContext'
import { cn, formatCurrency } from '../../lib/format'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Pricing() {
  const { variant, setVariant } = useExplorer()

  const pick = (v: VariantId) => {
    setVariant(v)
    document.getElementById('poptavka')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="cena" className="relative scroll-mt-20 py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-brand-200/35 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Cena"
          icon={<BadgeCheck />}
          title={
            <>
              Jeden nájem <em>za celý dům</em>
            </>
          }
          description="Měsíční cena za pronájem všech 8 bytů. Pro představu uvádíme i přepočet na jedno lůžko."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {(['A', 'B'] as VariantId[]).map((id, i) => {
            const v = variants[id]
            const cfg = pricing.variants[id]
            const active = variant === id
            const perBed = cfg.monthly !== null ? cfg.monthly / cfg.beds : null
            return (
              <Reveal key={id} delay={i * 90}>
                <article
                  onClick={() => setVariant(id)}
                  className={cn(
                    'relative flex h-full cursor-pointer flex-col rounded-[28px] border p-7 transition-all duration-300 sm:p-8',
                    active ? 'border-brand-600 bg-white shadow-lift ring-4 ring-brand-600/10' : 'border-stone-300/70 bg-white/70 shadow-sm backdrop-blur-md hover:border-stone-400/80 hover:bg-white',
                  )}
                >
                  {id === 'B' && (
                    <span className="absolute -top-3 right-6 rounded-full bg-ink px-3 py-1 text-xs font-medium text-white shadow-sm">Nejvyšší kapacita</span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted">{v.title}</p>
                      <p className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight text-ink">
                        <Users className="size-5 text-brand-600" />
                        {v.persons} osob
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className={cn(
                        'grid size-6 place-items-center rounded-full border-2 transition-all duration-200',
                        active ? 'border-brand-600 bg-brand-600 text-white' : 'border-stone-300 bg-white',
                      )}
                    >
                      {active && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                  </div>

                  <div className="mt-7 border-t border-stone-200 pt-6">
                    {cfg.monthly !== null ? (
                      <>
                        <p className="flex items-baseline gap-2">
                          <span className="text-[44px] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">{formatCurrency(cfg.monthly, pricing.currency)}</span>
                          <span className="text-muted">/ měsíc</span>
                        </p>
                        <p className="mt-2 text-sm text-muted">
                          ≈ <span className="font-semibold text-ink">{formatCurrency(perBed!, pricing.currency)}</span> za lůžko měsíčně · {cfg.beds} lůžek
                        </p>
                        {pricing.note && <p className="mt-1 text-xs text-muted">{pricing.note}</p>}
                      </>
                    ) : (
                      <div className="flex items-start gap-4">
                        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                          <MessageSquareQuote className="size-5" strokeWidth={1.7} />
                        </span>
                        <div>
                          <p className="text-[32px] leading-none font-semibold tracking-[-0.03em] text-ink">Cena na dotaz</p>
                          <p className="mt-2 text-sm text-muted">Celý dům na měsíc · přepočet na {cfg.beds} lůžek pošleme s nabídkou</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mt-6 text-[14.5px] leading-relaxed text-muted">{v.summary}.</p>
                  <ul className="mt-5 grid gap-2.5">
                    {pricingIncludes.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2.4} />
                        {it}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="mt-8 w-full"
                    variant={active ? 'primary' : 'secondary'}
                    iconRight={<ArrowRight className="size-4" />}
                    onClick={(e) => {
                      e.stopPropagation()
                      pick(id)
                    }}
                  >
                    Poptat variantu {id}
                  </Button>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
