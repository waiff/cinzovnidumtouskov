import { CircleAlert } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/format'

const control =
  'w-full rounded-xl border bg-white px-3.5 text-[15px] text-ink shadow-sm transition-all duration-200 placeholder:text-stone-400 focus:outline-none focus:ring-4'
const ok = 'border-stone-300/80 hover:border-stone-400/80 focus:border-brand-500 focus:ring-brand-500/15'
const bad = 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/15'

interface WrapProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  children: ReactNode
  className?: string
}

export function FieldWrap({ id, label, error, hint, optional, children, className }: WrapProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="flex items-center justify-between text-[13px] font-medium text-ink-soft">
        {label}
        {optional && <span className="text-xs font-normal text-muted">nepovinné</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-[13px] text-red-600" role="alert">
          <CircleAlert className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

export function TextInput({ invalid, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return <input {...props} aria-invalid={invalid || undefined} className={cn(control, 'h-12', invalid ? bad : ok, className)} />
}

export function SelectInput({ invalid, className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select {...props} aria-invalid={invalid || undefined} className={cn(control, 'h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%236A706C%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m4 6 4 4 4-4%27/%3E%3C/svg%3E")] bg-[position:right_14px_center] bg-no-repeat pr-10', invalid ? bad : ok, className)}>
      {children}
    </select>
  )
}

export function TextArea({ invalid, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return <textarea {...props} aria-invalid={invalid || undefined} className={cn(control, 'min-h-28 resize-y py-3', invalid ? bad : ok, className)} />
}
