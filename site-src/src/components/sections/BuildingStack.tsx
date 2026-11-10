import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { apartments, type PlanId } from '../../data/apartments'
import { useExplorer } from '../../context/VariantContext'
import { cn, personsLabel } from '../../lib/format'
import { SegmentedControl } from '../ui/SegmentedControl'

interface Band {
  plan: PlanId
  label: string
  apts: number[]
}

const bands: Band[] = [
  { plan: '3np', label: 'Podkroví', apts: [5, 6] },
  { plan: '2np', label: '1. patro', apts: [3, 4] },
  { plan: '1np', label: 'Přízemí', apts: [1, 2] },
  { plan: 'p2', label: 'Přístavba – patro', apts: [8] },
  { plan: 'p1', label: 'Přístavba – přízemí', apts: [7] },
]

const W = '#FFFFFF'
const LINE = '#2B2F2C'

function Win({ x, y, w = 22, h = 30, active }: { x: number; y: number; w?: number; h?: number; active?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1.5} fill={active ? '#E3F0EA' : W} stroke={LINE} strokeWidth={1.4} style={{ transition: 'fill 250ms ease' }} />
      <path d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h * 0.42} H${x + w}`} stroke={LINE} strokeWidth={0.9} />
    </g>
  )
}

export function BuildingStack() {
  const { variant, setVariant, showApartment } = useExplorer()
  const [hover, setHover] = useState<PlanId | null>(null)

  const persons = (apts: number[]) => apts.reduce((s, id) => s + (apartments.find((a) => a.id === id)?.persons[variant] ?? 0), 0)
  const is = (p: PlanId) => hover === p

  const bandRect: Record<PlanId, { x: number; y: number; w: number; h: number }> = {
    '3np': { x: 34, y: 112, w: 300, h: 92 },
    '2np': { x: 34, y: 204, w: 300, h: 86 },
    '1np': { x: 34, y: 290, w: 300, h: 88 },
    p2: { x: 334, y: 228, w: 150, h: 70 },
    p1: { x: 334, y: 298, w: 150, h: 80 },
  }

  return (
    <div className="relative rounded-[28px] border border-white/80 bg-white/65 p-4 shadow-lift backdrop-blur-md sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[13px] font-semibold tracking-wide text-brand-700 uppercase">Dům v kostce</p>
          <p className="text-sm text-muted">Najeďte na podlaží</p>
        </div>
        <SegmentedControl
          ariaLabel="Varianta obsazení"
          value={variant}
          onChange={setVariant}
          options={[
            { value: 'A', label: '16 osob' },
            { value: 'B', label: '24 osob' },
          ]}
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-[linear-gradient(180deg,#F3F7F4_0%,#FBFAF7_70%)]">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <svg viewBox="0 0 520 410" className="relative h-auto w-full" role="img" aria-label="Schéma domu – podlaží a byty">
          {/* terén */}
          <path d="M8 378 H512" stroke={LINE} strokeWidth={2} />
          <path d="M8 386 H512" stroke="#C9C3B8" strokeWidth={1} strokeDasharray="3 5" />

          {/* zvýraznění podlaží */}
          {bands.map((b) => {
            const r = bandRect[b.plan]
            return (
              <rect
                key={b.plan}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill="#0F6B4F"
                opacity={is(b.plan) ? 0.1 : 0}
                style={{ transition: 'opacity 250ms ease' }}
              />
            )
          })}

          {/* hlavní budova */}
          <path d="M40 204 L96 118 H272 L328 204 Z" fill="#E9E4DA" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
          <path d="M96 118 H272" stroke={LINE} strokeWidth={3} />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <path key={i} d={`M${60 + i * 24} 204 L${100 + i * 16.8} 118`} stroke="#CFC8BB" strokeWidth={0.8} />
          ))}
          {/* střešní okna */}
          {[108, 230].map((x) => (
            <path key={x} d={`M${x} 176 L${x + 6} 150 H${x + 30} L${x + 26} 176 Z`} fill={is('3np') ? '#E3F0EA' : W} stroke={LINE} strokeWidth={1.3} style={{ transition: 'fill 250ms ease' }} />
          ))}
          <rect x={40} y={204} width={288} height={174} fill="#FBFAF7" stroke={LINE} strokeWidth={2} />
          <path d="M40 290 H328" stroke="#BDB6A9" strokeWidth={1} />
          <path d="M34 204 H334" stroke={LINE} strokeWidth={3} strokeLinecap="round" />
          {/* okna 1. patro */}
          {[66, 120, 220, 274].map((x) => (
            <Win key={`p${x}`} x={x} y={228} active={is('2np')} />
          ))}
          {/* okna přízemí */}
          {[66, 120, 220, 274].map((x) => (
            <Win key={`g${x}`} x={x} y={312} active={is('1np')} />
          ))}
          {/* vstup */}
          <rect x={168} y={322} width={32} height={56} rx={2} fill="#1C1F1D" />
          <path d="M162 322 H206" stroke={LINE} strokeWidth={2} />
          <circle cx={194} cy={352} r={1.8} fill="#C8963E" />

          {/* přístavba */}
          <path d="M328 228 H484 V378 H328" fill="#F6F3EE" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
          <path d="M324 228 H490" stroke={LINE} strokeWidth={3} strokeLinecap="round" />
          <path d="M328 298 H484" stroke="#BDB6A9" strokeWidth={1} />
          {[344, 448].map((x) => (
            <Win key={`a2${x}`} x={x} y={246} w={26} h={30} active={is('p2')} />
          ))}
          <Win x={448} y={316} w={22} h={30} active={is('p1')} />
          <rect x={352} y={322} width={28} height={56} rx={2} fill="#1C1F1D" />
          <path d="M398 360 h36 v18" stroke="#9CB8AA" strokeWidth={1.2} fill="none" strokeDasharray="2 3" />

          {/* zeleň */}
          <circle cx={500} cy={352} r={14} fill="#CFE3D8" stroke="#94C4AC" />
          <path d="M500 366 V378" stroke="#6A8F7E" strokeWidth={2} />
          <circle cx={20} cy={356} r={11} fill="#CFE3D8" stroke="#94C4AC" />
          <path d="M20 367 V378" stroke="#6A8F7E" strokeWidth={2} />

          {/* štítky */}
          {bands.map((b) => {
            const r = bandRect[b.plan]
            const label = `${b.apts.length > 1 ? 'Byty' : 'Byt'} ${b.apts.join(' + ')}`
            const cx = r.x + r.w / 2
            const labelY: Record<PlanId, number> = { '3np': 164, '2np': 245, '1np': 305, p2: 261, p1: 311 }
            const cy = labelY[b.plan]
            const active = is(b.plan)
            const pw = label.length * 6.4 + 22
            return (
              <g key={`t${b.plan}`} style={{ transition: 'opacity 200ms ease' }} opacity={hover && !active ? 0.55 : 1}>
                <rect x={cx - pw / 2} y={cy - 10} width={pw} height={20} rx={10} fill={active ? '#0F6B4F' : '#1C1F1D'} style={{ transition: 'fill 200ms ease' }} />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill="#FFFFFF" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
                  {label}
                </text>
              </g>
            )
          })}

          {/* hit plochy */}
          {bands.map((b) => {
            const r = bandRect[b.plan]
            return (
              <rect
                key={`h${b.plan}`}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHover(b.plan)}
                onMouseLeave={() => setHover(null)}
                onClick={() => showApartment(b.apts[0], b.plan)}
              >
                <title>{`${b.label}: zobrazit půdorys`}</title>
              </rect>
            )
          })}
        </svg>
      </div>

      <ul className="mt-3 grid gap-1">
        {bands.map((b) => {
          const p = persons(b.apts)
          return (
            <li key={b.plan}>
              <button
                type="button"
                onMouseEnter={() => setHover(b.plan)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(b.plan)}
                onBlur={() => setHover(null)}
                onClick={() => showApartment(b.apts[0], b.plan)}
                className={cn(
                  'group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-all duration-200 active:scale-[0.99]',
                  is(b.plan) ? 'bg-brand-50' : 'hover:bg-stone-900/[0.03]',
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn('size-2 rounded-full transition-colors', is(b.plan) ? 'bg-brand-600' : 'bg-stone-300')} />
                  <span className="text-sm font-medium text-ink">{b.label}</span>
                  <span className="hidden text-sm text-muted sm:inline">
                    {b.apts.length > 1 ? 'byty' : 'byt'} {b.apts.join(', ')}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span key={`${variant}-${p}`} className="animate-[fade-up_400ms_ease-out_both] text-sm font-semibold text-ink tabular-nums">
                    {personsLabel(p)}
                  </span>
                  <ArrowUpRight className={cn('size-4 transition-all duration-200', is(b.plan) ? 'text-brand-600' : 'text-stone-300')} />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
