import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { PhotoSlot } from '../../data/photos'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

interface Props {
  photos: PhotoSlot[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

export function Lightbox({ photos, index, onClose, onIndex }: Props) {
  const open = index !== null
  useLockBodyScroll(open)
  const touchX = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      onIndex((index + dir + photos.length) % photos.length)
    },
    [index, onIndex, photos.length],
  )

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, go])

  if (index === null) return null
  const photo = photos[index]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-[80] flex animate-[fade-up_300ms_ease-out_both] flex-col bg-ink/92 backdrop-blur-md"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 text-white sm:px-6">
        <p className="text-sm text-white/70">
          <span className="font-semibold text-white">{photo.label}</span> · {index + 1} / {photos.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid size-10 place-items-center rounded-full bg-white/10 transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95"
          aria-label="Zavřít"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-16" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.caption} className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl" />
        {photos.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Předchozí fotografie" className="absolute left-2 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95 sm:left-6">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Další fotografie" className="absolute right-2 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95 sm:right-6">
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center text-sm text-white/80">{photo.caption}</p>
      </div>
    </div>,
    document.body,
  )
}
