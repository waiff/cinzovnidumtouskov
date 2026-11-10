import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/format'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_8px_20px_-8px_rgb(15_107_79/0.6)] hover:bg-brand-700 focus-visible:outline-brand-600',
  secondary:
    'border border-stone-300/80 bg-white/80 text-ink shadow-sm backdrop-blur-md hover:border-stone-400/80 hover:bg-white focus-visible:outline-brand-600',
  ghost: 'text-ink-soft hover:bg-stone-900/5 hover:text-ink focus-visible:outline-brand-600',
  dark: 'bg-ink text-white shadow-sm hover:bg-black focus-visible:outline-ink',
  light: 'bg-white text-ink shadow-sm hover:bg-stone-50 focus-visible:outline-white',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 px-7 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', icon, iconRight, className, children, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{iconRight}</span>}
    </>
  )
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
