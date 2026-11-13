import { ArrowDown } from 'lucide-react'
import { announcement } from '../../data/site'

/** Úzký pruh nad navigací. Je v toku stránky, při scrollu odjede a navigace se posune nahoru. */
export function AnnouncementBar() {
  return (
    <div id="announcement" className="relative bg-ink text-white">
      <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-2 text-center text-[12.5px] leading-snug sm:px-6 sm:text-[13px] lg:px-8">
        <span className="inline-flex items-center gap-2 font-semibold">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-300 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-300" />
          </span>
          {announcement.title}
        </span>
        <a
          href={announcement.href}
          className="group inline-flex items-center gap-1 text-white/80 underline decoration-white/30 underline-offset-[3px] transition-colors duration-200 hover:text-white hover:decoration-white"
        >
          {announcement.text}
          <ArrowDown className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
        </a>
      </p>
    </div>
  )
}
