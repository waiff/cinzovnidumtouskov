import type { ReactNode } from 'react'

const items: { label: string; swatch: ReactNode; only?: 'attic' | 'chimney' }[] = [
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
    label: 'Sloupek krovu',
    only: 'attic',
    swatch: <span className="m-[3px] block size-2 rounded-[1px] bg-[#7A5A2E]" />,
  },
  {
    label: 'Komínový průduch',
    only: 'chimney',
    swatch: <span className="block size-full rounded-[2px] border border-ink bg-[linear-gradient(135deg,#fff_50%,#232624_50%)]" />,
  },
  {
    label: 'Věšáková lišta',
    swatch: <span className="mt-[6px] block h-[3px] w-full bg-[repeating-linear-gradient(90deg,#8A6A3B_0_4px,transparent_4px_7px)]" />,
  },
  {
    label: 'Výška pod 1,2 m',
    only: 'attic',
    swatch: <span className="block size-full rounded-[2px] bg-[repeating-linear-gradient(-45deg,#A7A196_0_1px,transparent_1px_5px)] ring-1 ring-black/5" />,
  },
]

export function Legend({ attic, chimney }: { attic: boolean; chimney: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
      {items
        .filter((i) => !i.only || (i.only === 'attic' ? attic : chimney))
        .map((i) => (
          <li key={i.label} className="flex items-center gap-2 text-[12.5px] text-muted">
            <span className="size-3.5 shrink-0">{i.swatch}</span>
            {i.label}
          </li>
        ))}
    </ul>
  )
}
