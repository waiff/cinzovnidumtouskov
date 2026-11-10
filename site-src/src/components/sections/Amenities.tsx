import { Home, Sparkles, Warehouse } from 'lucide-react'
import { perApartment, perHouse, type Amenity } from '../../data/amenities'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function AmenityItem({ a }: { a: Amenity }) {
  return (
    <li className="group flex items-start gap-3.5 rounded-2xl p-3 transition-all duration-200 hover:bg-paper">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-stone-200 bg-white text-brand-700 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-brand-200 group-hover:bg-brand-50">
        <a.icon className="size-[18px]" strokeWidth={1.7} />
      </span>
      <div className="pt-0.5">
        <p className="text-[14.5px] leading-snug font-semibold tracking-tight text-ink">{a.title}</p>
        {a.text && <p className="mt-0.5 text-[13px] leading-snug text-muted">{a.text}</p>}
      </div>
    </li>
  )
}

export function Amenities() {
  return (
    <section id="vybaveni" className="relative scroll-mt-20 border-t border-stone-300/50 bg-white/55 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vybavení"
          icon={<Sparkles />}
          title={
            <>
              Připraveno k nastěhování <em>od prvního dne</em>
            </>
          }
          description="Zaměstnanci přijedou s kufrem. Kuchyně, praní, úklid i bezpečnost jsou vyřešené v každém bytě i v celém domě."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="h-full rounded-[28px] border border-stone-300/60 bg-white p-4 shadow-soft sm:p-6">
              <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-3">
                <p className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink">
                  <span className="grid size-8 place-items-center rounded-lg bg-ink text-white">
                    <Home className="size-4" />
                  </span>
                  V každém bytě
                </p>
                <span className="text-xs text-muted">{perApartment.length} položek</span>
              </div>
              <ul className="grid gap-1 sm:grid-cols-2">
                {perApartment.map((a) => (
                  <AmenityItem key={a.title} a={a} />
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4" delay={100}>
            <div className="relative h-full overflow-hidden rounded-[28px] border border-stone-300/60 bg-sand/70 p-4 shadow-soft sm:p-6">
              <div aria-hidden className="bg-blueprint absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-3">
                  <p className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-ink">
                    <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
                      <Warehouse className="size-4" />
                    </span>
                    V domě
                  </p>
                </div>
                <ul className="grid gap-1">
                  {perHouse.map((a) => (
                    <AmenityItem key={a.title} a={a} />
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
