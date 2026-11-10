import { memo } from 'react'
import type { VariantId } from '../../data/apartments'
import type { FloorPlan, Opening, PlanRoom, Rect, Stair } from '../../data/floorplans'
import { Furniture } from './Furniture'

const INK = '#232624'
const FLOOR = '#FAF9F6'
const COMMON = '#EFEDE8'
const TINTS = [
  { base: '#E6F0EA', active: '#CBE3D6' },
  { base: '#F2EBDE', active: '#E9D9BD' },
]
const PAD = 0.75

interface Props {
  plan: FloorPlan
  variant: VariantId
  activeApt: number | null
  hoveredRoom: string | null
  onHoverRoom: (id: string | null) => void
  onSelectRoom: (room: PlanRoom) => void
  title: string
}

function tintFor(plan: FloorPlan, apt: number | null) {
  if (apt === null) return null
  const idx = plan.apartments.indexOf(apt)
  return TINTS[Math.max(0, idx) % TINTS.length]
}

function doorGeometry(o: Opening) {
  const [x0, y0, x1, y1] = o.r
  const horizontal = x1 - x0 >= y1 - y0
  const swing = o.swing ?? (horizontal ? 's' : 'e')
  const atStart = (o.hinge ?? 'start') === 'start'
  let H: [number, number]
  let C: [number, number]
  let O: [number, number]
  if (horizontal) {
    const face = swing === 's' ? y1 : y0
    const dir = swing === 's' ? 1 : -1
    const w = x1 - x0
    H = [atStart ? x0 : x1, face]
    C = [atStart ? x1 : x0, face]
    O = [H[0], face + dir * w]
  } else {
    const face = swing === 'e' ? x1 : x0
    const dir = swing === 'e' ? 1 : -1
    const w = y1 - y0
    H = [face, atStart ? y0 : y1]
    C = [face, atStart ? y1 : y0]
    O = [face + dir * w, H[1]]
  }
  const r = Math.hypot(C[0] - H[0], C[1] - H[1])
  const cross = (C[0] - H[0]) * (O[1] - H[1]) - (C[1] - H[1]) * (O[0] - H[0])
  const sweep = cross > 0 ? 1 : 0
  return { H, C, O, r, sweep, horizontal, swing }
}

function wrapLabel(text: string, maxWidth: number, fontSize: number) {
  const charW = fontSize * 0.54
  if (text.length * charW <= maxWidth) return [text]
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length * charW > maxWidth && line) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

function containingRect(room: PlanRoom, p: [number, number]): Rect {
  return room.rects.find(([a, b, c, d]) => p[0] >= a && p[0] <= c && p[1] >= b && p[1] <= d) ?? room.rects[0]
}

function roomLabelPoint(room: PlanRoom): [number, number] {
  if (room.label) return room.label
  const [a, b, c, d] = room.rects[0]
  return [(a + c) / 2, (b + d) / 2]
}

function StairGlyph({ s }: { s: Stair }) {
  const [x0, y0, x1, y1] = s.r
  const step = 0.28
  const lines: string[] = []
  if (s.axis === 'y') {
    for (let y = y0 + step; y < y1 - 0.05; y += step) lines.push(`M${x0} ${y} H${x1}`)
  } else {
    for (let x = x0 + step; x < x1 - 0.05; x += step) lines.push(`M${x} ${y0} V${y1}`)
  }
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  let arrow = ''
  let head = ''
  if (s.arrow === 'up') {
    arrow = `M${cx} ${y1 - 0.25} V${y0 + 0.3}`
    head = `M${cx - 0.12} ${y0 + 0.48} L${cx} ${y0 + 0.28} L${cx + 0.12} ${y0 + 0.48}`
  } else if (s.arrow === 'down') {
    arrow = `M${cx} ${y0 + 0.25} V${y1 - 0.3}`
    head = `M${cx - 0.12} ${y1 - 0.48} L${cx} ${y1 - 0.28} L${cx + 0.12} ${y1 - 0.48}`
  } else if (s.arrow === 'left') {
    arrow = `M${x1 - 0.25} ${cy} H${x0 + 0.3}`
    head = `M${x0 + 0.48} ${cy - 0.12} L${x0 + 0.28} ${cy} L${x0 + 0.48} ${cy + 0.12}`
  } else if (s.arrow === 'right') {
    arrow = `M${x0 + 0.25} ${cy} H${x1 - 0.3}`
    head = `M${x1 - 0.48} ${cy - 0.12} L${x1 - 0.28} ${cy} L${x1 - 0.48} ${cy + 0.12}`
  }
  const labelPos: [number, number] = s.axis === 'y' ? [cx, s.arrow === 'up' ? y1 - 0.12 : y0 + 0.25] : [x1 - 0.55, y0 + 0.24]
  return (
    <g pointerEvents="none">
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#F5F3EF" stroke="#A3A8A4" strokeWidth={0.02} />
      <path d={lines.join(' ')} stroke="#B7BBB7" strokeWidth={0.018} />
      <path d={arrow} stroke={INK} strokeWidth={0.03} fill="none" />
      <path d={head} stroke={INK} strokeWidth={0.03} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <text x={labelPos[0]} y={labelPos[1]} fontSize={0.17} textAnchor="middle" fill="#5B615D" fontWeight={500} style={{ paintOrder: 'stroke' }} stroke="#F5F3EF" strokeWidth={0.06}>
        {s.arrow === 'down' || s.arrow === 'left' ? '↓' : '↑'} {s.label}
      </text>
    </g>
  )
}

function PlanSvgInner({ plan, variant, activeApt, hoveredRoom, onHoverRoom, onSelectRoom, title }: Props) {
  const [W, H] = plan.size
  const vb = `${-PAD} ${-PAD} ${W + PAD * 2} ${H + PAD * 2}`
  const hatchId = `hatch-${plan.id}`
  const lowId = `low-${plan.id}`

  return (
    <svg viewBox={vb} className="h-auto w-full select-none" role="img" aria-label={title} fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
      <defs>
        <pattern id={hatchId} width={0.14} height={0.14} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={0.14} height={0.14} fill="#D8D2C6" />
          <path d="M0 0 V0.14" stroke={INK} strokeWidth={0.03} opacity={0.55} />
        </pattern>
        <pattern id={lowId} width={0.16} height={0.16} patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <path d="M0 0 V0.16" stroke="#A7A196" strokeWidth={0.018} opacity={0.6} />
        </pattern>
      </defs>

      {/* Podlahy místností */}
      <g>
        {plan.rooms.map((room) => {
          const tint = tintFor(plan, room.apt)
          const isActive = room.apt !== null && room.apt === activeApt
          const dimmed = activeApt !== null && room.apt !== activeApt
          const fill = tint ? (isActive ? tint.active : tint.base) : COMMON
          const hovered = hoveredRoom === room.id
          return (
            <g
              key={room.id}
              data-room={room.id}
              data-apt={room.apt ?? 'common'}
              onMouseEnter={() => onHoverRoom(room.id)}
              onMouseLeave={() => onHoverRoom(null)}
              onClick={() => onSelectRoom(room)}
              style={{ cursor: room.apt !== null ? 'pointer' : 'default' }}
            >
              {room.rects.map(([a, b, c, d], i) => (
                <rect
                  key={i}
                  x={a}
                  y={b}
                  width={c - a}
                  height={d - b}
                  fill={fill}
                  style={{ transition: 'fill 200ms ease, opacity 200ms ease' }}
                  opacity={dimmed ? 0.45 : 1}
                />
              ))}
              {hovered &&
                room.rects.map(([a, b, c, d], i) => (
                  <rect key={`h${i}`} x={a} y={b} width={c - a} height={d - b} fill="#0F6B4F" opacity={0.07} pointerEvents="none" />
                ))}
            </g>
          )
        })}
      </g>

      {/* Zóny pod 1,2 m */}
      {plan.lowCeiling?.map(([a, b, c, d], i) => (
        <rect key={`low${i}`} x={a} y={b} width={c - a} height={d - b} fill={`url(#${lowId})`} pointerEvents="none" />
      ))}

      {/* Schodiště */}
      {plan.stairs?.map((s, i) => <StairGlyph key={`st${i}`} s={s} />)}

      {/* Vybavení */}
      <g pointerEvents="none">
        {plan.furniture.map((f, i) => {
          const visible = !f.v || f.v === variant
          return (
            <g key={i} style={{ transition: 'opacity 260ms ease' }} opacity={visible ? 1 : 0}>
              <Furniture item={f} accent={f.v === 'B'} />
            </g>
          )
        })}
      </g>

      {/* Střešní okna */}
      {plan.skylights?.map(([a, b, c, d], i) => (
        <rect
          key={`sk${i}`}
          x={a}
          y={b}
          width={c - a}
          height={d - b}
          fill="#0F6B4F"
          fillOpacity={0.05}
          stroke="#5E9580"
          strokeWidth={0.022}
          strokeDasharray="0.09 0.06"
          pointerEvents="none"
        />
      ))}

      {/* Střecha a zdivo */}
      <g pointerEvents="none">
        {plan.roof?.map(([a, b, c, d], i) => (
          <rect key={`rf${i}`} x={a} y={b} width={c - a} height={d - b} fill="#C9C3B8" />
        ))}
        {plan.walls.map(([a, b, c, d], i) => (
          <rect key={`w${i}`} x={a} y={b} width={c - a} height={d - b} fill={INK} />
        ))}
        {plan.partitions.map(([a, b, c, d], i) => (
          <rect key={`p${i}`} x={a} y={b} width={c - a} height={d - b} fill={INK} />
        ))}
        {plan.chimneys?.map(([a, b, c, d], i) => (
          <rect key={`ch${i}`} x={a} y={b} width={c - a} height={d - b} fill={`url(#${hatchId})`} stroke={INK} strokeWidth={0.02} />
        ))}
      </g>

      {/* Okna a dveře */}
      <g pointerEvents="none">
        {plan.openings.map((o, i) => {
          const [x0, y0, x1, y1] = o.r
          const w = x1 - x0
          const h = y1 - y0
          if (o.kind === 'window') {
            const horizontal = w >= h
            const lines = horizontal
              ? `M${x0} ${y0 + h * 0.38} H${x1} M${x0} ${y0 + h * 0.62} H${x1}`
              : `M${x0 + w * 0.38} ${y0} V${y1} M${x0 + w * 0.62} ${y0} V${y1}`
            return (
              <g key={i}>
                <rect x={x0} y={y0} width={w} height={h} fill="#FFFFFF" stroke={INK} strokeWidth={0.02} />
                <path d={lines} stroke="#7D8480" strokeWidth={0.018} />
              </g>
            )
          }
          const g = doorGeometry(o)
          const isEntry = o.kind === 'entry'
          const outward = isEntry ? labelOutside(o, plan.size) : null
          return (
            <g key={i}>
              <rect x={x0} y={y0} width={w} height={h} fill={FLOOR} />
              {o.kind !== 'gap' && (
                <>
                  <path d={`M${g.H[0]} ${g.H[1]} L${g.O[0]} ${g.O[1]}`} stroke={INK} strokeWidth={0.035} strokeLinecap="round" />
                  <path
                    d={`M${g.C[0]} ${g.C[1]} A${g.r} ${g.r} 0 0 ${g.sweep} ${g.O[0]} ${g.O[1]}`}
                    stroke="#8D938F"
                    strokeWidth={0.018}
                    fill="none"
                  />
                </>
              )}
              {outward && (
                <g>
                  <path d={outward.arrow} stroke="#0F6B4F" strokeWidth={0.04} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <text
                    x={outward.text[0]}
                    y={outward.text[1]}
                    fontSize={0.2}
                    fontWeight={600}
                    fill="#0F6B4F"
                    textAnchor={outward.anchor}
                    dominantBaseline="middle"
                    transform={outward.rotate ? `rotate(${outward.rotate} ${outward.text[0]} ${outward.text[1]})` : undefined}
                  >
                    {o.label}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </g>

      {/* Popisky místností */}
      <g pointerEvents="none">
        {plan.rooms.map((room) => {
          const p = roomLabelPoint(room)
          const [a, , c] = containingRect(room, p)
          const small = room.area < 5 || room.kind === 'bath' || room.kind === 'hall' || room.kind === 'storage'
          const nameSize = small ? 0.16 : 0.2
          const areaSize = small ? 0.19 : 0.25
          const maxW = Math.max(0.6, (c - a) - 0.2)
          const shortName = room.short ?? (room.kind === 'bath' ? 'Koupelna' : room.name)
          const lines = room.area < 1.5 ? [] : wrapLabel(shortName, maxW, nameSize)
          const dimmed = activeApt !== null && room.apt !== activeApt
          const areaText = `${room.area.toLocaleString('cs-CZ', { minimumFractionDigits: 1 })} m²`
          const totalH = lines.length * nameSize * 1.2 + areaSize
          const startY = p[1] - totalH / 2 + nameSize
          return (
            <g key={`l${room.id}`} opacity={dimmed ? 0.45 : 1} style={{ transition: 'opacity 200ms ease' }}>
              {lines.map((line, i) => (
                <text
                  key={i}
                  x={p[0]}
                  y={startY + i * nameSize * 1.2}
                  fontSize={nameSize}
                  textAnchor="middle"
                  fill="#4B514D"
                  fontWeight={500}
                  stroke="#FFFFFF"
                  strokeWidth={0.05}
                  strokeOpacity={0.7}
                  style={{ paintOrder: 'stroke' }}
                >
                  {line}
                </text>
              ))}
              <text
                x={p[0]}
                y={startY + lines.length * nameSize * 1.2 + (lines.length ? areaSize * 0.15 : 0)}
                fontSize={areaSize}
                textAnchor="middle"
                fill="#1C1F1D"
                fontWeight={650}
                stroke="#FFFFFF"
                strokeWidth={0.05}
                strokeOpacity={0.7}
                style={{ paintOrder: 'stroke' }}
              >
                {areaText}
              </text>
              {room.areaNote && (
                <text x={p[0]} y={startY + lines.length * nameSize * 1.2 + areaSize * 0.9} fontSize={0.14} textAnchor="middle" fill="#6B716D">
                  {room.areaNote}
                </text>
              )}
            </g>
          )
        })}
      </g>

      {/* Štítky bytů */}
      <g>
        {plan.apartments.map((apt) => {
          const living = plan.rooms.find((r) => r.apt === apt && r.kind === 'living')
          if (!living) return null
          const p = plan.badges[apt] ?? roomLabelPoint(living)
          const isActive = activeApt === apt
          const bw = 1.05
          const bh = 0.4
          const y = p[1]
          return (
            <g key={`b${apt}`} style={{ cursor: 'pointer' }} onClick={() => onSelectRoom(living)}>
              <rect
                x={p[0] - bw / 2}
                y={y - bh / 2}
                width={bw}
                height={bh}
                rx={bh / 2}
                fill={isActive ? '#0F6B4F' : '#1C1F1D'}
                style={{ transition: 'fill 200ms ease' }}
              />
              <text x={p[0]} y={y + 0.005} fontSize={0.2} fontWeight={650} fill="#FFFFFF" textAnchor="middle" dominantBaseline="middle" letterSpacing={0.02}>
                BYT {apt}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

function labelOutside(o: Opening, size: [number, number]) {
  const [x0, y0, x1, y1] = o.r
  const [W, H] = size
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  if (y1 >= H - 0.01) {
    const yb = H + 0.12
    return {
      arrow: `M${cx} ${yb + 0.42} V${yb} M${cx - 0.1} ${yb + 0.12} L${cx} ${yb} L${cx + 0.1} ${yb + 0.12}`,
      text: [cx + 0.18, yb + 0.3] as [number, number],
      anchor: 'start' as const,
      rotate: 0,
    }
  }
  if (x1 >= W - 0.01) {
    const xb = W + 0.1
    return {
      arrow: `M${xb + 0.4} ${cy} H${xb} M${xb + 0.12} ${cy - 0.1} L${xb} ${cy} L${xb + 0.12} ${cy + 0.1}`,
      text: [xb + 0.56, cy] as [number, number],
      anchor: 'middle' as const,
      rotate: 90,
    }
  }
  if (y0 <= 0.01) {
    const yb = -0.12
    return {
      arrow: `M${cx} ${yb - 0.42} V${yb} M${cx - 0.1} ${yb - 0.12} L${cx} ${yb} L${cx + 0.1} ${yb - 0.12}`,
      text: [cx + 0.18, yb - 0.3] as [number, number],
      anchor: 'start' as const,
      rotate: 0,
    }
  }
  return null
}

export const PlanSvg = memo(PlanSvgInner)
