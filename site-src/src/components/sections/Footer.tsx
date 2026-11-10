import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, site } from '../../data/site'
import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -top-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 lg:px-8 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-white/60">
              8 vybavených bytů v Městě Touškově pro ubytování 16 nebo 24 zaměstnanců. Pronájem celého domu jedné firmě.
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-white/45 uppercase">Kontakt</p>
            <ul className="mt-4 grid gap-3">
              <li>
                <a href={site.phone.href} className="group inline-flex items-center gap-3 text-lg font-semibold tracking-tight transition-colors hover:text-brand-200">
                  <span className="grid size-9 place-items-center rounded-xl bg-white/10 transition-colors group-hover:bg-brand-600">
                    <Phone className="size-4" />
                  </span>
                  <span className="tabular-nums">tel: {site.phone.display}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="group inline-flex min-w-0 items-center gap-3 text-[15px] transition-colors hover:text-brand-200">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 transition-colors group-hover:bg-brand-600">
                    <Mail className="size-4" />
                  </span>
                  <span className="break-all">email: {site.email}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-[15px] text-white/70">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10">
                  <MapPin className="size-4" />
                </span>
                {site.address.street}, {site.address.city}
              </li>
            </ul>
          </div>

          <nav className="lg:col-span-3" aria-label="Odkazy v patičce">
            <p className="text-xs font-semibold tracking-wide text-white/45 uppercase">Na stránce</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="group inline-flex items-center gap-1 text-[14.5px] text-white/70 transition-colors hover:text-white">
                    {l.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a href="#poptavka" className="group inline-flex items-center gap-1 text-[14.5px] text-white/70 transition-colors hover:text-white">
                  Poptávka
                  <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name} · {site.domain}</p>
          <p>Půdorysy a časy dojezdu jsou orientační.</p>
        </div>
      </div>
    </footer>
  )
}
