import type { ReactNode } from 'react'
import { cn } from '../../lib/format'
import { Reveal } from './Reveal'

interface Props {
  eyebrow: string
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  action?: ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, icon, title, description, align = 'left', action, className }: Props) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        <p className={cn('mb-4 inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-brand-700 uppercase', align === 'center' && 'justify-center')}>
          {icon && <span className="grid size-6 place-items-center rounded-full bg-brand-100 text-brand-700 [&>svg]:size-3.5">{icon}</span>}
          {eyebrow}
        </p>
        <h2 className="text-balance text-[32px] leading-[1.08] font-semibold tracking-[-0.025em] text-ink sm:text-[42px] lg:text-[48px] [&_em]:font-serif [&_em]:font-normal [&_em]:tracking-[-0.01em] [&_em]:text-brand-700">
          {title}
        </h2>
        {description && <p className="mt-5 text-pretty text-[17px] leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  )
}
