import { useMemo, useState } from 'react'
import { Camera } from 'lucide-react'
import { photos } from '../../data/photos'
import { cn } from '../../lib/format'
import { Lightbox } from '../ui/Lightbox'
import { PhotoSlot } from '../ui/PhotoSlot'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const spanClass = {
  hero: 'col-span-2 aspect-[3/2] sm:row-span-2 sm:aspect-auto',
  square: 'aspect-[4/3] sm:aspect-auto',
  last: 'col-span-2 aspect-[2/1] sm:aspect-auto lg:col-span-1',
} as const

export function Gallery() {
  const viewable = useMemo(() => photos.filter((p) => p.src), [])
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="galerie" className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Galerie"
          icon={<Camera />}
          title={
            <>
              Dům a byty <em>na fotografiích</em>
            </>
          }
          description="Dům po dokončené rekonstrukci, zatím bez nábytku. Vybavení bytů doplníme podle dohody s nájemcem a prohlídku na místě rádi domluvíme."
        />

        <div className="mt-12 grid grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:grid-cols-3">
          {photos.map((p, i) => (
            <Reveal key={p.id} delay={i * 60} className={cn(spanClass[p.span])}>
              <PhotoSlot
                photo={p}
                priority={i === 0}
                className="size-full"
                onOpen={() => {
                  const vi = viewable.findIndex((v) => v.id === p.id)
                  if (vi >= 0) setIndex(vi)
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox photos={viewable} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  )
}
