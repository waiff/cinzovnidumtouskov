import type { ReactNode } from 'react'
import { cn } from '../../lib/format'

type Tone = 'neutral' | 'brand' | 'outline' | 'dark' | 'sand'

const tones: Record<Tone, string> = {
  neutral: 'bg-stone-900/[0.05] text-ink-soft',
  brand: 'bg-brand-100 text-brand-800 ring-1 ring-inset ring-brand-200',
  outline: 'bg-white/70 text-ink-soft ring-1 ring-inset ring-stone-300/70 backdrop-blur-md',
  dark: 'bg-ink text-white',
  sand: 'bg-sand text-ink-soft ring-1 ring-inset ring-sand-deep',
}

export function Badge({ children, tone = 'neutral', icon, className }: { children: ReactNode; tone?: Tone; icon?: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium leading-none', tones[tone], className)}>
      {icon}
      {children}
    </span>
  )
}
