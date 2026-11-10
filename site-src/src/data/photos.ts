import type { LucideIcon } from 'lucide-react'
import { Bath, BedDouble, Building, ChefHat, Sofa, Trees } from 'lucide-react'

export interface PhotoSlot {
  id: string
  label: string
  caption: string
  icon: LucideIcon
  /** Cesta k fotce ve složce /public/photos, např. '/photos/fasada.webp'. Bez `src` se zobrazí designový placeholder. */
  src?: string
  /** Rozložení v mřížce galerie. */
  span: 'hero' | 'wide' | 'wideSm' | 'tall' | 'square'
}

export const photos: PhotoSlot[] = [
  { id: 'fasada', label: 'Fasáda', caption: 'Činžovní dům, Mlýnská 63', icon: Building, span: 'hero' },
  { id: 'obytny', label: 'Obytný pokoj', caption: 'Obytný pokoj s jídelním stolem', icon: Sofa, span: 'tall' },
  { id: 'kuchyne', label: 'Kuchyňský kout', caption: 'Kuchyňská linka s indukcí a lednicí', icon: ChefHat, span: 'square' },
  { id: 'loznice', label: 'Ložnice', caption: 'Ložnice pro 2 osoby', icon: BedDouble, span: 'square' },
  { id: 'koupelna', label: 'Koupelna', caption: 'Koupelna s WC v každém bytě', icon: Bath, span: 'wideSm' },
  { id: 'dvorek', label: 'Dvorek', caption: 'Společný dvorek a zahrádky', icon: Trees, span: 'wide' },
]
