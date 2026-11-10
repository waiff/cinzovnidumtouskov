import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/format'

export interface SegmentOption<T extends string> {
  value: T
  label: ReactNode
  hint?: ReactNode
}

interface Props<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
  size?: 'md' | 'lg'
  tone?: 'brand' | 'ink'
  className?: string
  fullWidth?: boolean
}

export function SegmentedControl<T extends string>({ options, value, onChange, ariaLabel, size = 'md', tone = 'brand', className, fullWidth }: Props<T>) {
  const listRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const update = () => {
      const active = list.querySelector<HTMLButtonElement>(`[data-value="${CSS.escape(value)}"]`)
      if (active) setIndicator({ left: active.offsetLeft, width: active.offsetWidth })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(list)
    return () => ro.disconnect()
  }, [value, options.length])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = options.findIndex((o) => o.value === value)
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const next = options[(idx + (e.key === 'ArrowRight' ? 1 : options.length - 1)) % options.length]
      onChange(next.value)
      listRef.current?.querySelector<HTMLButtonElement>(`[data-value="${CSS.escape(next.value)}"]`)?.focus()
    }
  }

  return (
    <div
      ref={listRef}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        'relative inline-flex items-center rounded-full border border-stone-300/70 bg-white/80 p-1 shadow-sm backdrop-blur-md',
        fullWidth && 'flex w-full',
        className,
      )}
    >
      {indicator && (
        <span
          aria-hidden
          className={cn(
            'absolute top-1 bottom-1 rounded-full shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            tone === 'brand' ? 'bg-brand-600' : 'bg-ink',
          )}
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            data-value={o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'relative z-10 inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200 active:scale-[0.98]',
              size === 'lg' ? 'h-11 px-5 text-[15px]' : 'h-9 px-4 text-sm',
              fullWidth && 'flex-1',
              active ? 'text-white' : 'text-ink-soft hover:text-ink',
            )}
          >
            {o.label}
            {o.hint && <span className={cn('text-xs font-normal', active ? 'text-white/75' : 'text-muted')}>{o.hint}</span>}
          </button>
        )
      })}
    </div>
  )
}
