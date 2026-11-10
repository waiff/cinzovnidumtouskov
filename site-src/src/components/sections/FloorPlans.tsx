import { useCallback, useState } from 'react'
import { BedDouble, Info, LayoutGrid, MousePointerClick, MoveHorizontal, Ruler, Sprout, Users, X } from 'lucide-react'
import { apartments } from '../../data/apartments'
import { floorPlans, planById, type PlanRoom } from '../../data/floorplans'
import { useExplorer } from '../../context/VariantContext'
import { cn, formatArea, personsLabel } from '../../lib/format'
import { Legend } from '../floorplan/Legend'
import { PlanSvg } from '../floorplan/PlanSvg'
import { Badge } from '../ui/Badge'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SegmentedControl } from '../ui/SegmentedControl'

export function FloorPlans() {
  const { variant, setVariant, plan: planId, setPlan, focusedApt, focusApartment } = useExplorer()
  const plan = planById[planId]
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)

  const hovered = hoveredRoom ? plan.rooms.find((r) => r.id === hoveredRoom) ?? null : null
  const activeApt = hovered?.apt ?? focusedApt

  const onSelectRoom = useCallback(
    (room: PlanRoom) => {
      if (room.apt === null) return
      focusApartment(focusedApt === room.apt ? null : room.apt)
    },
    [focusApartment, focusedApt],
  )

  const wide = plan.size[0] > 12

  return (
    <section id="pudorysy" className="relative scroll-mt-20 py-24 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-40 -z-10 h-[600px] bg-[radial-gradient(50%_50%_at_50%_50%,rgb(198_225_211/0.45),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Půdorysy"
          icon={<LayoutGrid />}
          title={
            <>
              Každé podlaží <em>přehledně</em>
            </>
          }
          description="Interaktivní půdorysy všech pěti podlaží. Najeďte nebo klepněte na místnost; přepínač variant ukáže, kde přibudou lůžka pro 24 osob."
        />

        <Reveal className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0">
            <div className="flex w-max gap-1 rounded-full border border-stone-300/70 bg-white/80 p-1 shadow-sm backdrop-blur-md" role="tablist" aria-label="Podlaží">
              {floorPlans.map((p) => {
                const active = p.id === planId
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setPlan(p.id)
                      setHoveredRoom(null)
                    }}
                    className={cn(
                      'flex h-11 flex-col items-start justify-center rounded-full px-4 text-left transition-all duration-200 active:scale-[0.98]',
                      active ? 'bg-ink text-white shadow-sm' : 'text-ink-soft hover:bg-stone-900/[0.04] hover:text-ink',
                    )}
                  >
                    <span className="text-[13.5px] leading-tight font-medium">{p.label}</span>
                    <span className={cn('text-[11px] leading-tight', active ? 'text-white/60' : 'text-muted')}>{p.short}</span>
                  </button>
                )
              })}
            </div>
          </div>
          <SegmentedControl
            ariaLabel="Varianta v půdorysu"
            value={variant}
            onChange={setVariant}
            options={[
              { value: 'A', label: 'A · 16 osob' },
              { value: 'B', label: 'B · 24 osob' },
            ]}
          />
        </Reveal>

        <Reveal className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]" delay={80}>
          <div className="relative overflow-hidden rounded-[28px] border border-stone-300/60 bg-white shadow-soft">
            <div className="flex items-center justify-between gap-3 border-b border-stone-200/80 px-5 py-3.5">
              <p className="text-sm font-semibold tracking-tight text-ink">
                {plan.label} <span className="font-normal text-muted">· {plan.short}</span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted sm:hidden">
                <MoveHorizontal className="size-3.5" /> posuňte
              </p>
              <p className="hidden items-center gap-1.5 text-xs text-muted sm:flex">
                <MousePointerClick className="size-3.5" /> klepnutím vyberete byt
              </p>
            </div>
            <div className="overflow-x-auto overscroll-x-contain">
              <div key={plan.id} className={cn('animate-[fade-up_450ms_cubic-bezier(0.16,1,0.3,1)_both] p-3 sm:p-5', wide ? 'min-w-[680px]' : 'mx-auto max-w-[760px] min-w-[520px]')}>
                <PlanSvg
                  plan={plan}
                  variant={variant}
                  activeApt={activeApt}
                  hoveredRoom={hoveredRoom}
                  onHoverRoom={setHoveredRoom}
                  onSelectRoom={onSelectRoom}
                  title={`Půdorys – ${plan.label}`}
                />
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <InfoCard room={hovered} focusedApt={focusedApt} onClear={() => focusApartment(null)} />
            <div className="rounded-[24px] border border-stone-300/60 bg-white p-5 shadow-sm">
              <p className="mb-3 text-[13px] font-semibold text-ink">Byty na podlaží</p>
              <div className="grid gap-2">
                {plan.apartments.map((id) => {
                  const apt = apartments.find((a) => a.id === id)!
                  const active = focusedApt === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => focusApartment(active ? null : id)}
                      aria-pressed={active}
                      className={cn(
                        'flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                        active ? 'border-brand-600 bg-brand-600 text-white shadow-sm' : 'border-stone-200 bg-paper/70 hover:border-brand-200',
                      )}
                    >
                      <span className="text-sm font-semibold">Byt {id}</span>
                      <span className={cn('text-xs tabular-nums', active ? 'text-white/80' : 'text-muted')}>
                        {apt.layout} · {formatArea(apt.area)} · {personsLabel(apt.persons[variant])}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="rounded-[24px] border border-stone-300/60 bg-white p-5 shadow-sm">
              <p className="mb-3 text-[13px] font-semibold text-ink">Legenda</p>
              <Legend attic={plan.id === '3np'} />
            </div>
          </aside>
        </Reveal>

        <p className="mt-5 flex items-start gap-2 text-[13px] text-muted">
          <Info className="mt-0.5 size-4 shrink-0" />
          Schematické půdorysy – orientační, nejedná se o projektovou dokumentaci. Plochy dle výměry; v podkroví plocha nad světlou výškou 1,2 m.
        </p>
      </div>
    </section>
  )
}

function InfoCard({ room, focusedApt, onClear }: { room: PlanRoom | null; focusedApt: number | null; onClear: () => void }) {
  const { variant } = useExplorer()
  const aptId = room?.apt ?? (room ? null : focusedApt)
  const apt = aptId !== null && aptId !== undefined ? apartments.find((a) => a.id === aptId) : undefined

  if (!room && !apt) {
    return (
      <div className="flex min-h-[184px] flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-stone-300 bg-white/60 p-6 text-center">
        <span className="grid size-11 place-items-center rounded-2xl bg-white text-brand-700 shadow-sm ring-1 ring-stone-200">
          <MousePointerClick className="size-5" strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Vyberte místnost</p>
          <p className="mt-1 text-[13px] text-muted">Najeďte myší nebo klepněte na místnost v půdorysu.</p>
        </div>
      </div>
    )
  }

  return (
    <div key={`${room?.id ?? 'apt'}-${aptId}`} className="min-h-[184px] animate-[fade-up_300ms_ease-out_both] rounded-[24px] border border-brand-200 bg-brand-50/70 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          {room ? (
            <>
              <p className="text-xs font-medium tracking-wide text-brand-700 uppercase">{apt ? `Byt ${apt.id}` : 'Společné prostory'}</p>
              <p className="mt-1 text-lg leading-tight font-semibold tracking-tight text-ink">{room.name}</p>
            </>
          ) : (
            apt && (
              <>
                <p className="text-xs font-medium tracking-wide text-brand-700 uppercase">{apt.floor}</p>
                <p className="mt-1 text-lg leading-tight font-semibold tracking-tight text-ink">Byt {apt.id}</p>
              </>
            )
          )}
        </div>
        {!room && apt && (
          <button type="button" onClick={onClear} className="grid size-8 place-items-center rounded-full bg-white text-muted shadow-sm transition-all duration-200 hover:scale-105 hover:text-ink active:scale-95" aria-label="Zrušit výběr">
            <X className="size-4" />
          </button>
        )}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3">
        {room && (
          <div className="rounded-xl bg-white px-3 py-2.5">
            <dt className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <Ruler className="size-3" /> Plocha
            </dt>
            <dd className="mt-0.5 text-[15px] font-semibold text-ink">
              {formatArea(room.area)}
              {room.areaNote && <span className="ml-1 text-xs font-normal text-muted">{room.areaNote}</span>}
            </dd>
          </div>
        )}
        {apt && (
          <>
            <div className="rounded-xl bg-white px-3 py-2.5">
              <dt className="flex items-center gap-1.5 text-[11.5px] text-muted">
                <BedDouble className="size-3" /> Byt
              </dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-ink">
                {apt.layout} · {formatArea(apt.area)}
              </dd>
            </div>
            <div className="rounded-xl bg-white px-3 py-2.5">
              <dt className="flex items-center gap-1.5 text-[11.5px] text-muted">
                <Users className="size-3" /> Varianta {variant}
              </dt>
              <dd className="mt-0.5 text-[15px] font-semibold text-ink">{personsLabel(apt.persons[variant])}</dd>
            </div>
          </>
        )}
        {apt?.garden && (
          <div className="rounded-xl bg-white px-3 py-2.5">
            <dt className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <Sprout className="size-3" /> Zahrádka
            </dt>
            <dd className="mt-0.5 text-[15px] font-semibold text-ink">{apt.garden} m²</dd>
          </div>
        )}
      </dl>
      {apt && !room && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {apt.rooms.map((r) => (
            <Badge key={r.name} tone="outline">
              {r.name} · {formatArea(r.area)}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
