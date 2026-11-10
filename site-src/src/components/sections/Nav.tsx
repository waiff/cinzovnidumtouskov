import { useEffect, useState, type MouseEvent } from 'react'
import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react'
import { navLinks, site } from '../../data/site'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { useScrolled } from '../../hooks/useScrolled'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { cn } from '../../lib/format'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

const ids = navLinks.map((l) => l.id)

export function Nav() {
  const scrolled = useScrolled()
  const active = useScrollSpy(ids)
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  /** Menu nejdřív zavře (uvolní zámek scrollu), teprve pak posune na sekci. */
  const navigateFromMenu = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setOpen(false)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.replaceState(null, '', `#${id}`)
      }),
    )
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 transition-all duration-300',
          scrolled || open ? 'border-b border-stone-300/50 bg-paper/75 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset] backdrop-blur-md' : 'border-b border-transparent',
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8" aria-label="Hlavní navigace">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-all duration-200 hover:bg-stone-900/[0.04] active:scale-[0.98]',
                    active === l.id ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-brand-600 transition-transform duration-300',
                      active === l.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="hidden size-11 place-items-center rounded-full border border-stone-300/70 bg-white/70 text-ink-soft shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-[1.04] hover:text-brand-700 active:scale-[0.97] sm:grid"
              aria-label={`Zavolat ${site.phone.display}`}
            >
              <Phone className="size-[18px]" />
            </a>
            <div className="hidden sm:block">
              <Button href="#poptavka" size="md" iconRight={<ArrowRight className="size-4" />}>
                Poptat ubytování
              </Button>
            </div>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-stone-300/70 bg-white/80 text-ink shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-[calc(72px+env(safe-area-inset-top,0px))] bottom-0 z-40 flex flex-col bg-paper/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-4 pt-6 sm:px-6">
          {navLinks.map((l, i) => (
            <li
              key={l.id}
              className={cn('transition-all duration-500', open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0')}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : '0ms' }}
            >
              <a
                href={`#${l.id}`}
                tabIndex={open ? 0 : -1}
                onClick={(e) => navigateFromMenu(e, l.id)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[22px] font-semibold tracking-tight text-ink transition-colors hover:bg-white active:scale-[0.99]"
              >
                {l.label}
                <ArrowRight className={cn('size-5', active === l.id ? 'text-brand-600' : 'text-stone-300')} />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3 border-t border-stone-300/60 px-4 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:px-6">
          <Button href="#poptavka" size="lg" tabIndex={open ? 0 : -1} onClick={(e) => navigateFromMenu(e, 'poptavka')} iconRight={<ArrowRight className="size-4" />}>
            Poptat ubytování
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button href={site.phone.href} variant="secondary" tabIndex={open ? 0 : -1} icon={<Phone className="size-4" />}>
              Zavolat
            </Button>
            <Button href={`mailto:${site.email}`} variant="secondary" tabIndex={open ? 0 : -1} icon={<Mail className="size-4" />}>
              E-mail
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
