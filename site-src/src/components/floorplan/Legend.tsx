import type { ReactNode } from 'react'

const items: { label: string; swatch: ReactNode; only?: 'attic' }[] = [
  { label: 'Byt', swatch: <span className="block size-full rounded-[3px] bg-[#E6F0EA] ring-1 ring-black/5" /> },
  { label: 'Sousední byt', swatch: <span className="block size-full rounded-[3px] bg-[#F2EBDE] ring-1 ring-black/5" /> },
  { label: 'Společné prostory', swatch: <span className="block size-full rounded-[3px] bg-[#EFEDE8] ring-1 ring-black/5" /> },
  { label: 'Navíc ve variantě B', swatch: <span className="block size-full rounded-[3px] border-[1.5px] border-brand-600 bg-brand-100" /> },
  {
    label: 'Střešní okno',
    only: 'attic',
    swatch: <span className="block size-full rounded-[2px] border-[1.5px] border-dashed border-[#5E9580] bg-brand-50" />,
  },
  {
    label: 'Výška pod 1,2 m',
    only: 'attic',
    swatch: <span className="block size-full rounded-[2px] bg-[repeating-linear-gradient(-45deg,#A7A196_0_1px,transparent_1px_5px)] ring-1 ring-black/5" />,
  },
]

export function Legend({ attic }: { attic: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
      {items
        .filter((i) => !i.only || attic)
        .map((i) => (
          <li key={i.label} className="flex items-center gap-2 text-[12.5px] text-muted">
            <span className="size-3.5 shrink-0">{i.swatch}</span>
            {i.label}
          </li>
        ))}
    </ul>
  )
}
