import { useMemo, useState } from 'react'
import { ArrowUpRight, Bath, BedDouble, Building, Ruler, SearchX, Sofa, Sprout, Users } from 'lucide-react'
import { apartments, floorGroups, totals, type FloorGroup } from '../../data/apartments'
import { useExplorer } from '../../context/VariantContext'
import { cn, formatArea, personsLabel } from '../../lib/format'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function roomIcon(name: string) {
  if (name.startsWith('Ložnice')) return BedDouble
  if (name.startsWith('Koupelna')) return Bath
  return Sofa
}

export function Apartments() {
  const { variant, showApartment } = useExplorer()
  const [group, setGroup] = useState<FloorGroup | 'all'>('all')
  const list = useMemo(() => (group === 'all' ? apartments : apartments.filter((a) => a.group === group)), [group])

  return (
    <section id="byty" className="relative scroll-mt-20 border-t border-stone-300/50 bg-sand/45 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Byty"
          icon={<Building />}
          title={
            <>
              Osm bytů. <em>Každý samostatný.</em>
            </>
          }
          description="Vlastní vstup, koupelna s WC a kuchyňský kout v každém bytě. Obsazenost se mění podle zvolené varianty."
        />

        <Reveal className="mt-10 -mx-4 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2" role="tablist" aria-label="Filtr podle podlaží">
            {floorGroups.map((g) => {
              const count = g.id === 'all' ? apartments.length : apartments.filter((a) => a.group === g.id).length
              const active = group === g.id
              return (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setGroup(g.id)}
                  className={cn(
                    'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                    active ? 'border-ink bg-ink text-white shadow-sm' : 'border-stone-300/80 bg-white/80 text-ink-soft hover:border-stone-400 hover:text-ink',
                  )}
                >
                  {g.label}
                  <span className={cn('rounded-full px-1.5 text-xs tabular-nums', active ? 'bg-white/15' : 'bg-stone-900/5')}>{count}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {list.length === 0 ? (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-[28px] border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-white text-muted shadow-sm">
              <SearchX className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-ink">Na tomto podlaží nejsou žádné byty</p>
              <p className="mt-1 text-sm text-muted">Zkuste jiné podlaží nebo zobrazte všechny byty.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setGroup('all')}>
              Zobrazit vše
            </Button>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {list.map((apt, i) => (
              <Reveal as="li" key={apt.id} delay={(i % 4) * 60}>
                <article className="group flex h-full flex-col rounded-[24px] border border-stone-300/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                  <header className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-[44px] leading-none text-brand-700 italic">{String(apt.id).padStart(2, '0')}</p>
                      <p className="mt-2 text-[13px] text-muted">{apt.floor}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <Badge tone="dark">{apt.layout}</Badge>
                      {apt.garden && (
                        <Badge tone="brand" icon={<Sprout className="size-3" />}>
                          zahrádka {apt.garden} m²
                        </Badge>
                      )}
                    </div>
                  </header>

                  <div className="mt-5 flex items-center gap-4 border-y border-stone-200/80 py-3.5">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                      <Ruler className="size-4 text-brand-600" strokeWidth={1.8} />
                      {formatArea(apt.area)}
                    </span>
                    <span className="h-4 w-px bg-stone-200" />
                    <span key={variant} className="flex animate-[fade-up_350ms_ease-out_both] items-center gap-1.5 text-sm font-semibold text-ink">
                      <Users className="size-4 text-brand-600" strokeWidth={1.8} />
                      {personsLabel(apt.persons[variant])}
                      {apt.persons.A !== apt.persons.B && <span className="text-xs font-medium text-muted">· var. {variant}</span>}
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-1 flex-col gap-3.5">
                    {apt.rooms.map((room) => {
                      const Icon = roomIcon(room.name)
                      const extras = variant === 'B' ? (room.itemsB ?? []) : []
                      return (
                        <li key={room.name} className="flex gap-3">
                          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-paper text-ink-soft">
                            <Icon className="size-3.5" strokeWidth={1.8} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="flex items-baseline justify-between gap-2 text-[13.5px] leading-snug">
                              <span className="font-medium text-ink">{room.name}</span>
                              <span className="shrink-0 text-muted tabular-nums">{formatArea(room.area)}</span>
                            </p>
                            {(room.items.length > 0 || extras.length > 0) && (
                              <p className="mt-1 flex flex-wrap gap-1">
                                {room.items.map((it) => (
                                  <span key={it} className="rounded-md bg-stone-900/[0.04] px-1.5 py-0.5 text-[11.5px] text-ink-soft">
                                    {it}
                                  </span>
                                ))}
                                {extras.map((it) => (
                                  <span key={it} className="animate-[fade-up_300ms_ease-out_both] rounded-md bg-brand-100 px-1.5 py-0.5 text-[11.5px] font-medium text-brand-800">
                                    + {it}
                                  </span>
                                ))}
                              </p>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  <button
                    type="button"
                    onClick={() => showApartment(apt.id, apt.plan)}
                    className="mt-5 inline-flex items-center justify-between rounded-xl bg-paper px-3.5 py-2.5 text-sm font-medium text-ink transition-all duration-200 group-hover:bg-brand-600 group-hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Na půdorysu
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-stone-300/60 bg-white/70 px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            <span className="font-semibold text-ink">Celkem</span> · {totals.apartments} bytů · {formatArea(totals.area)}
          </p>
          <p className="flex items-center gap-4 text-sm">
            <span className={cn('transition-colors', variant === 'A' ? 'font-semibold text-ink' : 'text-muted')}>Varianta A: {totals.persons.A} osob</span>
            <span className="h-4 w-px bg-stone-300" />
            <span className={cn('transition-colors', variant === 'B' ? 'font-semibold text-ink' : 'text-muted')}>Varianta B: {totals.persons.B} osob</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
