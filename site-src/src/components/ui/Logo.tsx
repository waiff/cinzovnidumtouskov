import { cn } from '../../lib/format'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn('size-9 shrink-0', className)}>
      <rect width="64" height="64" rx="16" fill="#0F6B4F" />
      <path d="M14 50V27L32 14l18 13v23" fill="none" stroke="#F6F3EE" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M22 50V33h20v17M22 41.5h20M32 33v17" fill="none" stroke="#F6F3EE" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <a href="#top" className={cn('group flex items-center gap-3 rounded-xl transition-transform duration-200 active:scale-[0.98]', className)} aria-label="Činžovní dům Touškov – na začátek stránky">
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-3" />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className={cn('text-[15px] font-semibold tracking-tight', inverted ? 'text-white' : 'text-ink')}>Činžovní dům Touškov</span>
        <span className={cn('mt-1 text-[11.5px] font-medium tracking-wide', inverted ? 'text-white/55' : 'text-muted')}>Ubytování pro zaměstnance</span>
      </span>
    </a>
  )
}
