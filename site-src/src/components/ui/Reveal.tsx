import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { IS_ARTIFACT } from '../../lib/env'
import { cn } from '../../lib/format'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: Props) {
  const { ref, inView: observed } = useInView<HTMLElement>()
  const inView = IS_ARTIFACT || observed
  const style: CSSProperties = { transitionDelay: `${delay}ms` }
  return (
    <Tag
      ref={ref}
      style={style}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
