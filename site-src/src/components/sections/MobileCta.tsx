import { useEffect, useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { site } from '../../data/site'
import { cn } from '../../lib/format'

export function MobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById('poptavka')
      const pastHero = window.scrollY > window.innerHeight * 0.7
      const atForm = form ? form.getBoundingClientRect().top < window.innerHeight * 0.6 && form.getBoundingClientRect().bottom > 0 : false
      setVisible(pastHero && !atForm)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-40 flex gap-2 rounded-full border border-white/70 bg-white/80 p-1.5 shadow-lift backdrop-blur-md transition-all duration-300 sm:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
      aria-hidden={!visible}
    >
      <a
        href={site.phone.href}
        tabIndex={visible ? 0 : -1}
        className="flex h-12 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium text-ink transition-transform active:scale-[0.97]"
        aria-label={`Zavolat ${site.phone.display}`}
      >
        <Phone className="size-4 text-brand-600" />
        Zavolat
      </a>
      <a
        href="#poptavka"
        tabIndex={visible ? 0 : -1}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 text-sm font-medium text-white transition-transform active:scale-[0.97]"
      >
        Poptat ubytování
        <ArrowRight className="size-4" />
      </a>
    </div>
  )
}
