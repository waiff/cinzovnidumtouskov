import { ArrowRight, BedSingle, Check, Sofa, UserRound, Users } from 'lucide-react'
import { apartments, variants, totals, type VariantId } from '../../data/apartments'
import { pricing } from '../../data/pricing'
import { useExplorer } from '../../context/VariantContext'
import { cn, formatCurrency } from '../../lib/format'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SegmentedControl } from '../ui/SegmentedControl'

const rows: { label: string; ids: number[] }[] = [
  { label: 'Podkroví', ids: [5, 6] },
  { label: '1. patro', ids: [3, 4] },
  { label: 'Přízemí', ids: [1, 2] },
  { label: 'Přístavba', ids: [7, 8] },
]

const bullets: Record<VariantId, string[]> = {
  A: ['16 lůžek v 8 bytech', 'Ve 2+kk spí obě osoby v ložnici', 'Obytný pokoj zůstává společný, s pohovkou', 'Více soukromí a klidu na odpočinek'],
  B: ['24 lůžek v 8 bytech', 'Byty 1–4: 2 osoby v ložnici + 2 v obytném pokoji', 'Byty 5–8: po 2 osobách', 'Na pokoji vždy nejvýše 2 osoby'],
}

export function Variants() {
  const { variant, setVariant } = useExplorer()
  const v = variants[variant]
  const price = pricing.variants[variant].monthly

  return (
    <section id="varianty" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Varianty obsazení"
          icon={<Users />}
          title={
            <>
              Dvě kapacity. <em>Jeden dům.</em>
            </>
          }
          description="Dům si pronajímá jedna firma. Podle počtu zaměstnanců zvolíte variantu A pro 16 osob, nebo variantu B pro 24 osob, se stejným standardem vybavení."
          action={
            <SegmentedControl
              ariaLabel="Zvolit variantu"
              size="lg"
              value={variant}
              onChange={setVariant}
              options={[
                { value: 'A', label: 'Varianta A', hint: '16 osob' },
                { value: 'B', label: 'Varianta B', hint: '24 osob' },
              ]}
            />
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-brand-900 p-7 text-white shadow-lift sm:p-9">
              <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-brand-500/40 blur-3xl" />
              <div aria-hidden className="bg-grid absolute inset-0 opacity-30 invert" />
              <div className="relative">
                <p className="text-sm font-medium text-brand-200">{v.title}</p>
                <div className="mt-3 flex items-end gap-3">
                  <span key={variant} className="animate-[fade-up_500ms_cubic-bezier(0.16,1,0.3,1)_both] text-[88px] leading-[0.85] font-semibold tracking-[-0.05em] tabular-nums">
                    {v.persons}
                  </span>
                  <span className="pb-2 text-lg text-white/70">osob</span>
                </div>
                <p className="mt-5 text-lg font-medium">{v.summary}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{v.detail}</p>
                <ul className="mt-7 grid gap-3">
                  {bullets[variant].map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] text-white/90">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/40 text-brand-100">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-xs tracking-wide text-white/55 uppercase">Celý dům / měsíc</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">{price !== null ? formatCurrency(price, pricing.currency) : 'Cena na dotaz'}</p>
                </div>
                <Button href="#cena" variant="light" size="sm" iconRight={<ArrowRight className="size-4" />}>
                  Ceník
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <div className="h-full rounded-[28px] border border-stone-300/60 bg-white p-5 shadow-soft sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[15px] font-semibold tracking-tight text-ink">Obsazenost po bytech</p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-ink" /> ložnice
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-brand-500" /> obytný pokoj
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[76px_1fr] items-stretch gap-3 sm:grid-cols-[92px_1fr]">
                    <p className="self-center text-[13px] font-medium text-muted">{row.label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {row.ids.map((id) => {
                        const apt = apartments.find((a) => a.id === id)!
                        const bedroom = apt.rooms[0].persons[variant]
                        const total = apt.persons[variant]
                        const living = apt.layout === '2+kk' ? total - bedroom : 0
                        const extra = variant === 'B' && living > 0
                        return (
                          <div
                            key={id}
                            className={cn(
                              'flex flex-col gap-3 rounded-2xl border p-3.5 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between',
                              extra ? 'border-brand-200 bg-brand-50' : 'border-stone-200 bg-paper/60',
                            )}
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-ink">Byt {id}</p>
                              <p className="text-xs text-muted">
                                {apt.layout} · {apt.area.toLocaleString('cs-CZ')} m²
                              </p>
                            </div>
                            <div className="flex items-center gap-1" aria-label={`${total} osoby`}>
                              {Array.from({ length: 4 }).map((_, i) => {
                                const filled = i < total
                                const inLiving = i >= total - living && filled && apt.layout === '2+kk' && living > 0
                                return (
                                  <span
                                    key={i}
                                    className={cn(
                                      'grid size-7 place-items-center rounded-full transition-all duration-300',
                                      !filled && 'scale-90 border border-dashed border-stone-300 text-stone-300',
                                      filled && !inLiving && 'bg-ink text-white',
                                      inLiving && 'bg-brand-500 text-white',
                                    )}
                                    style={{ transitionDelay: `${i * 40}ms` }}
                                  >
                                    <UserRound className="size-3.5" strokeWidth={2.2} />
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 border-t border-stone-200 pt-5 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-paper text-brand-700">
                    <Users className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-ink tabular-nums">{totals.persons[variant]} osob</p>
                    <p className="text-xs text-muted">celkem v domě</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-paper text-brand-700">
                    <BedSingle className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-ink tabular-nums">{totals.persons[variant]} lůžek</p>
                    <p className="text-xs text-muted">90 × 200 cm s matrací</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-paper text-brand-700">
                    <Sofa className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-ink">{variant === 'A' ? '6 obývacích pokojů' : '2 obývací pokoje'}</p>
                    <p className="text-xs text-muted">{variant === 'A' ? 've všech 2+kk volné' : 'volné v bytech 5 a 6'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
