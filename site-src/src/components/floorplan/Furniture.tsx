import type { Furniture as FurnitureItem } from '../../data/floorplans'

const STROKE = '#8D938F'
const SW = 0.022

interface Props {
  item: FurnitureItem
  /** Vybavení navíc ve variantě B se zvýrazní akcentem. */
  accent?: boolean
}

export function Furniture({ item, accent }: Props) {
  const [x0, y0, x1, y1] = item.r
  const w = x1 - x0
  const h = y1 - y0
  const cx = x0 + w / 2
  const cy = y0 + h / 2
  const vertical = h > w
  const stroke = accent ? '#0F6B4F' : STROKE

  switch (item.k) {
    case 'bed':
    case 'daybed': {
      const head = item.head ?? (vertical ? 't' : 'l')
      const fill = item.k === 'daybed' || accent ? '#E3F0EA' : '#FFFFFF'
      const pillowDepth = 0.26
      const pillow =
        head === 'l'
          ? [x0 + 0.06, y0 + 0.08, pillowDepth, h - 0.16]
          : head === 'r'
            ? [x1 - 0.06 - pillowDepth, y0 + 0.08, pillowDepth, h - 0.16]
            : head === 't'
              ? [x0 + 0.08, y0 + 0.06, w - 0.16, pillowDepth]
              : [x0 + 0.08, y1 - 0.06 - pillowDepth, w - 0.16, pillowDepth]
      const fold =
        head === 'l'
          ? `M${x0 + w * 0.36} ${y0} V${y1}`
          : head === 'r'
            ? `M${x1 - w * 0.36} ${y0} V${y1}`
            : head === 't'
              ? `M${x0} ${y0 + h * 0.36} H${x1}`
              : `M${x0} ${y1 - h * 0.36} H${x1}`
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} rx={0.06} fill={fill} stroke={stroke} strokeWidth={SW} />
          <rect x={pillow[0]} y={pillow[1]} width={pillow[2]} height={pillow[3]} rx={0.05} fill="#FFFFFF" stroke={stroke} strokeWidth={SW * 0.8} />
          <path d={fold} stroke={stroke} strokeWidth={SW * 0.7} strokeDasharray="0.05 0.04" />
        </g>
      )
    }
    case 'sofa': {
      const back = 0.2
      const arm = 0.18
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} rx={0.1} fill="#F4F1EA" stroke={stroke} strokeWidth={SW} />
          {vertical ? (
            <>
              <rect x={x0 + 0.02} y={y0 + arm} width={back} height={h - arm * 2} fill="#ECE7DC" stroke={stroke} strokeWidth={SW * 0.7} />
              <path d={`M${x0} ${y0 + arm} H${x1} M${x0} ${y1 - arm} H${x1} M${x0 + back} ${cy} H${x1}`} stroke={stroke} strokeWidth={SW * 0.7} />
            </>
          ) : (
            <>
              <rect x={x0 + arm} y={y0 + 0.02} width={w - arm * 2} height={back} fill="#ECE7DC" stroke={stroke} strokeWidth={SW * 0.7} />
              <path d={`M${x0 + arm} ${y0} V${y1} M${x1 - arm} ${y0} V${y1} M${cx} ${y0 + back} V${y1}`} stroke={stroke} strokeWidth={SW * 0.7} />
            </>
          )}
        </g>
      )
    }
    case 'wardrobe':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} fill={accent ? '#E3F0EA' : '#F3EDE2'} stroke={stroke} strokeWidth={SW} />
          <path d={`M${x0} ${y0} L${x1} ${y1}`} stroke={stroke} strokeWidth={SW * 0.6} opacity={0.6} />
          <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.09} fill={stroke} />
        </g>
      )
    case 'nightstand':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} fill={accent ? '#E3F0EA' : '#F7F3EC'} stroke={stroke} strokeWidth={SW} />
          <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.24} fill="none" stroke={stroke} strokeWidth={SW * 0.7} />
        </g>
      )
    case 'table':
      return <rect x={x0} y={y0} width={w} height={h} rx={0.03} fill="#FFFFFF" stroke={stroke} strokeWidth={SW * 1.1} />
    case 'chair':
      return <rect x={x0 + 0.03} y={y0 + 0.03} width={w - 0.06} height={h - 0.06} rx={0.07} fill="#FFFFFF" stroke={stroke} strokeWidth={SW * 0.8} />
    case 'counter':
      return <rect x={x0} y={y0} width={w} height={h} fill="#EEEBE4" stroke={stroke} strokeWidth={SW} />
    case 'induction': {
      const r = Math.min(w, h) * 0.16
      const dx = w * 0.25
      const dy = h * 0.25
      return (
        <g>
          <rect x={x0 + 0.03} y={y0 + 0.03} width={w - 0.06} height={h - 0.06} rx={0.03} fill="#FFFFFF" stroke={stroke} strokeWidth={SW * 0.8} />
          {[
            [cx - dx, cy - dy],
            [cx + dx, cy - dy],
            [cx - dx, cy + dy],
            [cx + dx, cy + dy],
          ].map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={r} fill="none" stroke={stroke} strokeWidth={SW * 0.7} />
          ))}
        </g>
      )
    }
    case 'sink': {
      const iw = vertical ? w * 0.62 : Math.min(w * 0.55, 0.45)
      const ih = vertical ? Math.min(h * 0.55, 0.45) : h * 0.62
      return (
        <g>
          <rect x={cx - iw / 2} y={cy - ih / 2} width={iw} height={ih} rx={0.06} fill="#FFFFFF" stroke={stroke} strokeWidth={SW * 0.9} />
          <circle cx={cx} cy={cy} r={0.025} fill={stroke} />
        </g>
      )
    }
    case 'fridge':
      return (
        <g>
          <rect x={x0 + 0.02} y={y0 + 0.02} width={w - 0.04} height={h - 0.04} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          <path d={`M${x0 + 0.02} ${y0 + 0.02} L${x1 - 0.02} ${y1 - 0.02} M${x1 - 0.02} ${y0 + 0.02} L${x0 + 0.02} ${y1 - 0.02}`} stroke={stroke} strokeWidth={SW * 0.5} opacity={0.5} />
        </g>
      )
    case 'washer':
    case 'washerDryer':
    case 'dryer': {
      const r = Math.min(w, h) * 0.3
      return (
        <g>
          <rect x={x0 + 0.02} y={y0 + 0.02} width={w - 0.04} height={h - 0.04} rx={0.03} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={SW * 0.8} />
          {item.k !== 'washer' && <circle cx={cx} cy={cy} r={r * 0.45} fill="none" stroke={stroke} strokeWidth={SW * 0.6} />}
        </g>
      )
    }
    case 'shoe':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} fill="#F3EDE2" stroke={stroke} strokeWidth={SW} />
          {vertical
            ? [0.3, 0.5, 0.7].map((t) => <path key={t} d={`M${x0} ${y0 + h * t} H${x1}`} stroke={stroke} strokeWidth={SW * 0.6} />)
            : [0.3, 0.5, 0.7].map((t) => <path key={t} d={`M${x0 + w * t} ${y0} V${y1}`} stroke={stroke} strokeWidth={SW * 0.6} />)}
        </g>
      )
    case 'bath':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} rx={0.06} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          <rect x={x0 + 0.07} y={y0 + 0.07} width={w - 0.14} height={h - 0.14} rx={Math.min(w, h) * 0.3} fill="#F4F6F5" stroke={stroke} strokeWidth={SW * 0.7} />
        </g>
      )
    case 'shower':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} fill="#F4F6F5" stroke={stroke} strokeWidth={SW} />
          <path d={`M${x0} ${y0} L${x1} ${y1} M${x1} ${y0} L${x0} ${y1}`} stroke={stroke} strokeWidth={SW * 0.5} opacity={0.55} />
          <circle cx={cx} cy={cy} r={0.05} fill="#FFFFFF" stroke={stroke} strokeWidth={SW * 0.7} />
        </g>
      )
    case 'wc': {
      if (vertical) {
        const tank = Math.min(0.18, h * 0.3)
        return (
          <g>
            <rect x={x0 + 0.02} y={y0} width={w - 0.04} height={tank} rx={0.03} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
            <ellipse cx={cx} cy={y0 + tank + (h - tank) / 2} rx={w * 0.38} ry={(h - tank) / 2 - 0.01} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          </g>
        )
      }
      const tank = Math.min(0.18, w * 0.3)
      return (
        <g>
          <rect x={x1 - tank} y={y0 + 0.02} width={tank} height={h - 0.04} rx={0.03} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          <ellipse cx={x0 + (w - tank) / 2} cy={cy} rx={(w - tank) / 2 - 0.01} ry={h * 0.38} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
        </g>
      )
    }
    case 'basin':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} rx={0.04} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          <ellipse cx={cx} cy={cy} rx={w * 0.32} ry={h * 0.3} fill="#F4F6F5" stroke={stroke} strokeWidth={SW * 0.7} />
        </g>
      )
    case 'shelf':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} fill="#F1EFEA" stroke={stroke} strokeWidth={SW} />
          {vertical
            ? [0.2, 0.4, 0.6, 0.8].map((t) => <path key={t} d={`M${x0} ${y0 + h * t} H${x1}`} stroke={stroke} strokeWidth={SW * 0.5} />)
            : [0.2, 0.4, 0.6, 0.8].map((t) => <path key={t} d={`M${x0 + w * t} ${y0} V${y1}`} stroke={stroke} strokeWidth={SW * 0.5} />)}
        </g>
      )
    case 'boiler':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} rx={0.03} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.28} fill="none" stroke={stroke} strokeWidth={SW * 0.8} />
        </g>
      )
    case 'tank':
      return (
        <g>
          <rect x={x0} y={y0} width={w} height={h} fill="#FFFFFF" stroke={stroke} strokeWidth={SW} />
          <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.42} fill="#F4F6F5" stroke={stroke} strokeWidth={SW} />
        </g>
      )
  }
}
