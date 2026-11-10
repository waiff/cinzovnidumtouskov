import { useState } from 'react'
import { ImageOff, Maximize2 } from 'lucide-react'
import type { PhotoSlot as PhotoSlotData } from '../../data/photos'
import { cn } from '../../lib/format'

type Status = 'loading' | 'loaded' | 'error'

interface Props {
  photo: PhotoSlotData
  className?: string
  onOpen?: () => void
  priority?: boolean
}

export function PhotoSlot({ photo, className, onOpen, priority }: Props) {
  const [status, setStatus] = useState<Status>('loading')
  const Icon = photo.icon

  if (!photo.src) {
    return (
      <figure className={cn('group relative overflow-hidden rounded-3xl border border-stone-300/60 bg-sand/60', className)}>
        <div className="bg-blueprint absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgb(255_255_255/0.75),transparent_60%)]" />
        <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4 pt-10 text-center sm:p-6">
          <span className="grid size-14 place-items-center rounded-2xl border border-white/80 bg-white/80 text-brand-700 shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2">
            <Icon className="size-6" strokeWidth={1.6} />
          </span>
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-ink">{photo.label}</p>
            <p className="mt-1 hidden text-[13px] text-muted sm:block">{photo.caption}</p>
          </div>
        </div>
        <figcaption className="absolute top-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] truncate sm:top-4 sm:left-4 items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-muted backdrop-blur-md">
          <span className="size-1.5 shrink-0 rounded-full bg-brand-400" />
          Foto připravujeme
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className={cn('group relative overflow-hidden rounded-3xl border border-stone-300/60 bg-sand', className)}>
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#E9E4DA_8%,#F3EFE8_18%,#E9E4DA_33%)] bg-[length:200%_100%]" aria-hidden />
      )}
      {status === 'error' ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="grid size-12 place-items-center rounded-2xl bg-white text-muted shadow-sm">
            <ImageOff className="size-5" strokeWidth={1.6} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Fotografii se nepodařilo načíst</p>
            <p className="mt-1 text-[13px] text-muted">{photo.label}</p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className="block size-full cursor-zoom-in"
          aria-label={`Zvětšit fotografii: ${photo.label}`}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={cn(
              'size-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]',
              status === 'loaded' ? 'scale-100 opacity-100 blur-0' : 'scale-[1.02] opacity-0 blur-sm',
            )}
          />
          <span className="pointer-events-none absolute top-3 left-3 rounded-full border border-white/60 bg-white/75 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur-md sm:top-4 sm:left-4">
            {photo.label}
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/45 to-transparent p-4 pt-12 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-sm font-medium">{photo.caption}</span>
            <Maximize2 className="size-4" />
          </span>
        </button>
      )}
    </figure>
  )
}

