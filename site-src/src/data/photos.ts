import type { LucideIcon } from 'lucide-react'
import { Bath, BedDouble, Building, Sofa } from 'lucide-react'

export interface PhotoSlot {
  id: string
  label: string
  caption: string
  icon: LucideIcon
  /** Cesta k fotce ve složce /public/photos, např. '/photos/fasada.webp'. Bez `src` se zobrazí designový placeholder. */
  src?: string
  /** Rozložení v mřížce galerie: hero = velká dlaždice, last = poslední dlaždice (na mobilu přes celou šířku). */
  span: 'hero' | 'square' | 'last'
}

export const photos: PhotoSlot[] = [
  {
    id: 'dum',
    label: 'Dům',
    caption: 'Hlavní budova a přístavba po rekonstrukci',
    icon: Building,
    src: '/photos/dum-pohled-shora.webp',
    span: 'hero',
  },
  {
    id: 'podkrovi',
    label: 'Podkroví',
    caption: 'Obytný prostor v podkroví s trámy',
    icon: Sofa,
    src: '/photos/podkrovi-obytny-prostor.webp',
    span: 'square',
  },
  {
    id: 'koupelna',
    label: 'Koupelna',
    caption: 'Koupelna se sprchovým koutem a WC',
    icon: Bath,
    src: '/photos/koupelna.webp',
    span: 'square',
  },
  {
    id: 'pokoj',
    label: 'Pokoj',
    caption: 'Světlý pokoj po rekonstrukci',
    icon: BedDouble,
    src: '/photos/pokoj.webp',
    span: 'square',
  },
  {
    id: 'podkrovi-okna',
    label: 'Podkroví',
    caption: 'Podkroví – štítová a střešní okna',
    icon: Sofa,
    src: '/photos/podkrovi-okna.webp',
    span: 'square',
  },
  {
    id: 'koupelna-podkrovi',
    label: 'Koupelna',
    caption: 'Koupelna v podkroví',
    icon: Bath,
    src: '/photos/koupelna-podkrovi.webp',
    span: 'last',
  },
]
