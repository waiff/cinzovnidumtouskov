import { perPerson } from '../../data/amenities'
import { Reveal } from '../ui/Reveal'

export function Standard() {
  return (
    <section aria-labelledby="standard-title" className="relative border-y border-stone-300/50 bg-white/55">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <Reveal className="lg:w-64 lg:shrink-0">
            <p className="text-[13px] font-semibold tracking-wide text-brand-700 uppercase">Standard</p>
            <h2 id="standard-title" className="mt-2 text-[22px] leading-tight font-semibold tracking-tight text-ink">
              Pro každého nájemníka <em className="font-serif font-normal text-brand-700">stejně</em>
            </h2>
          </Reveal>
          <ul className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-3">
            {perPerson.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 50}>
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-stone-300/60 bg-paper/70 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white hover:shadow-soft sm:flex-row sm:items-start sm:gap-3.5 sm:p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700 shadow-sm ring-1 ring-stone-200 transition-transform duration-300 group-hover:scale-105">
                    <a.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-[14px] leading-snug font-semibold tracking-tight text-ink sm:text-[14.5px]">{a.title}</p>
                    {a.text && <p className="mt-1 text-[13px] leading-snug text-muted">{a.text}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
