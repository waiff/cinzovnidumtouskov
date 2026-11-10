import { Car, ExternalLink, Info, MapPin, Navigation } from 'lucide-react'
import { driveTimes, locationFacts, transit } from '../../data/transport'
import { site } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const maxMinutes = Math.max(...driveTimes.map((d) => d.minutes))

function RouteMap() {
  return (
    <svg viewBox="0 0 560 400" className="h-auto w-full" role="img" aria-label="Schéma polohy: Město Touškov, Kozolupy, dálnice D5, Plzeň">
      <defs>
        <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0F6B4F" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0F6B4F" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* řeka Mže */}
      <path d="M20 176 C 90 150, 130 196, 196 182 S 300 150, 360 196 S 470 230, 540 214" fill="none" stroke="#BFD8CB" strokeWidth="6" strokeLinecap="round" />
      <text x="58" y="148" fontSize="11" fill="#6A8F7E" fontStyle="italic" fontFamily="Instrument Serif, Georgia, serif">
        Mže
      </text>

      {/* Plzeň */}
      <circle cx="430" cy="236" r="62" fill="#E9E4DA" stroke="#CFC8BB" />
      <circle cx="430" cy="236" r="34" fill="#DDD5C7" />
      <text x="430" y="232" textAnchor="middle" fontSize="16" fontWeight="650" fill="#1C1F1D" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        Plzeň
      </text>
      <text x="430" y="249" textAnchor="middle" fontSize="10.5" fill="#6A706C" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        centrum · CAN
      </text>

      {/* D5 */}
      <path d="M0 318 C 120 312, 200 300, 300 304 S 420 316, 560 300" fill="none" stroke="#1C1F1D" strokeWidth="7" strokeLinecap="round" />
      <path d="M0 318 C 120 312, 200 300, 300 304 S 420 316, 560 300" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="10 10" />
      <rect x="18" y="330" width="34" height="18" rx="4" fill="#0F6B4F" />
      <text x="35" y="343" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        D5
      </text>
      <text x="58" y="343" fontSize="10.5" fill="#6A706C" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        ← Rozvadov / SRN
      </text>
      <text x="548" y="290" textAnchor="end" fontSize="10.5" fill="#6A706C" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        Praha →
      </text>

      {/* II/180 Touškov – Kozolupy – exit 93 */}
      <path d="M112 92 C 130 130, 150 170, 160 200 S 176 270, 180 306" fill="none" stroke="#0F6B4F" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
      <path d="M112 92 C 130 130, 150 170, 160 200 S 176 270, 180 306" fill="none" stroke="#0F6B4F" strokeWidth="2" strokeLinecap="round" />
      <rect x="186" y="236" width="44" height="17" rx="4" fill="#fff" stroke="#C6E1D3" />
      <text x="208" y="248" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0B5740" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        II/180
      </text>

      {/* bus 56 */}
      <path d="M112 92 C 220 110, 320 150, 400 206" fill="none" stroke="#C8963E" strokeWidth="2" strokeDasharray="5 6" />
      <rect x="248" y="118" width="58" height="18" rx="9" fill="#fff" stroke="#E4C994" />
      <text x="277" y="131" textAnchor="middle" fontSize="10" fontWeight="600" fill="#8A6421" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        bus 56
      </text>

      {/* Kozolupy */}
      <circle cx="152" cy="178" r="5" fill="#fff" stroke="#1C1F1D" strokeWidth="2" />
      <text x="138" y="182" textAnchor="end" fontSize="11" fill="#3B403D" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        Kozolupy
      </text>

      {/* exit 93 */}
      <circle cx="180" cy="306" r="9" fill="#fff" stroke="#1C1F1D" strokeWidth="2.5" />
      <text x="166" y="292" textAnchor="end" fontSize="10.5" fontWeight="600" fill="#1C1F1D" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        exit 93
      </text>
      <text x="180" y="370" textAnchor="middle" fontSize="11" fill="#3B403D" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        Nýřany
      </text>
      <path d="M180 315 V356" stroke="#A3A8A4" strokeWidth="1.5" strokeDasharray="2 3" />

      {/* Touškov */}
      <circle cx="112" cy="92" r="34" fill="url(#pulse)">
        <animate attributeName="r" values="18;38;18" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="112" cy="92" r="10" fill="#0F6B4F" stroke="#fff" strokeWidth="3" />
      <rect x="128" y="60" width="148" height="40" rx="10" fill="#1C1F1D" />
      <text x="140" y="77" fontSize="12" fontWeight="650" fill="#fff" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        Město Touškov
      </text>
      <rect x="40" y="112" width="58" height="22" rx="6" fill="#fff" stroke="#C6E1D3" />
      <rect x="45" y="116" width="14" height="14" rx="3" fill="#0F6B4F" />
      <text x="52" y="127" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        P
      </text>
      <text x="64" y="127" fontSize="10.5" fontWeight="600" fill="#0B5740" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        10 aut
      </text>
      <text x="140" y="92" fontSize="10" fill="#C6E1D3" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        Mlýnská 63
      </text>

      <text x="548" y="388" textAnchor="end" fontSize="9.5" fill="#9AA09C" fontFamily="Inter Tight Variable, Inter Tight, ui-sans-serif, system-ui, sans-serif">
        Schéma – není v měřítku
      </text>
    </svg>
  )
}

export function Location() {
  return (
    <section id="doprava" className="relative scroll-mt-20 border-t border-stone-300/50 bg-sand/45 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Doprava a lokalita"
          icon={<Navigation />}
          title={
            <>
              Klidné městečko, <em>blízko práce</em>
            </>
          }
          description="Město Touškov leží 9 km severozápadně od Plzně. Silnice II/180 vede přes Kozolupy na dálnici D5 a do plzeňských průmyslových zón; do centra Plzně jezdí městský autobus."
          action={
            <Button href={site.mapUrl} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<MapPin className="size-4 text-brand-600" />} iconRight={<ExternalLink className="size-3.5" />}>
              Otevřít v Mapy.cz
            </Button>
          }
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-stone-300/60 bg-white shadow-soft">
              <div className="relative bg-[linear-gradient(180deg,#F3F7F4,#FBFAF7)]">
                <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
                <div className="relative p-3 sm:p-5">
                  <RouteMap />
                </div>
              </div>
              <dl className="grid grid-cols-2 border-t border-stone-200/80 sm:grid-cols-4">
                {locationFacts.map((f, i) => (
                  <div
                    key={f.label}
                    className={[
                      'px-4 py-4 sm:px-5',
                      i % 2 === 1 ? 'border-l border-stone-200/80' : '',
                      i >= 2 ? 'border-t border-stone-200/80 sm:border-t-0' : '',
                      i === 2 ? 'sm:border-l' : '',
                    ].join(' ')}
                  >
                    <dd className="text-xl font-semibold tracking-tight text-ink tabular-nums sm:text-2xl">{f.value}</dd>
                    <dt className="mt-0.5 text-[12px] leading-snug text-muted sm:text-[13px]">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={100}>
            <div className="h-full rounded-[28px] border border-stone-300/60 bg-white p-5 shadow-soft sm:p-6">
              <p className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink">
                <Car className="size-4 text-brand-600" />
                Autem z Mlýnské 63
              </p>
              <ul className="mt-4 grid gap-1">
                {driveTimes.map((d) => (
                  <li key={d.place} className="group grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-paper">
                    <span className="grid size-9 place-items-center rounded-lg bg-paper text-ink-soft transition-colors group-hover:bg-white group-hover:text-brand-700">
                      <d.icon className="size-4" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{d.place}</p>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-stone-100">
                        <div className="h-full rounded-full bg-brand-500/70" style={{ width: `${Math.max(8, (d.minutes / maxMinutes) * 100)}%` }} />
                      </div>
                    </div>
                    <p className="text-right">
                      <span className="block text-sm font-semibold text-ink tabular-nums">≈ {d.minutes >= 60 ? `${Math.floor(d.minutes / 60)} h ${d.minutes % 60} min` : `${d.minutes} min`}</span>
                      <span className="block text-xs text-muted tabular-nums">{d.km} km</span>
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-paper px-3 py-2.5 text-xs leading-relaxed text-muted">
                <Info className="mt-0.5 size-3.5 shrink-0" />
                Časy a vzdálenosti jsou orientační a závisí na dopravní situaci.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {transit.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 70}>
              <div className="flex h-full gap-4 rounded-[24px] border border-stone-300/60 bg-white/80 p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-white">
                  <t.icon className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold tracking-tight text-ink">{t.title}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
