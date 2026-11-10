import type { LucideIcon } from 'lucide-react'
import {
  AlarmSmoke,
  Armchair,
  BedSingle,
  Bike,
  Blinds,
  CookingPot,
  FireExtinguisher,
  Footprints,
  LampCeiling,
  LampDesk,
  Lightbulb,
  Lock,
  LockKeyhole,
  Microwave,
  Recycle,
  Refrigerator,
  Shirt,
  SprayCan,
  Users,
  UtensilsCrossed,
  WashingMachine,
  Wifi,
  Wind,
} from 'lucide-react'

export interface Amenity {
  icon: LucideIcon
  title: string
  text?: string
}

export const perPerson: Amenity[] = [
  { icon: BedSingle, title: 'Vlastní lůžko 90 × 200 cm', text: 'S matrací, pro každého nájemníka.' },
  { icon: Lock, title: 'Uzamykatelná skříň', text: 'Šatní skříň 60 × 55 cm se zámkem.' },
  { icon: LampDesk, title: 'Noční stolek s lampičkou', text: 'U každého lůžka.' },
  { icon: Armchair, title: 'Vlastní židle', text: 'U jídelního stolu je místo pro všechny.' },
  { icon: LockKeyhole, title: 'Přihrádka v kuchyni', text: 'Uzamykatelná, v kuchyňské lince.' },
  { icon: Users, title: 'Nejvýše 2 osoby na pokoji', text: 'Platí pro obě varianty obsazení.' },
]

export const perApartment: Amenity[] = [
  { icon: CookingPot, title: 'Indukční deska a digestoř', text: 'Kuchyňská linka v každém bytě.' },
  { icon: Microwave, title: 'Mikrovlnná trouba s grilem' },
  { icon: Refrigerator, title: 'Lednice s mrazákem' },
  { icon: UtensilsCrossed, title: 'Základní nádobí' },
  { icon: Armchair, title: 'Jídelní stůl a židle', text: 'Místo u stolu pro všechny.' },
  { icon: WashingMachine, title: 'Pračka', text: 'Ve 2+kk navíc sušička.' },
  { icon: Footprints, title: 'Botník, věšák a rohož', text: 'Na pracovní obuv a oblečení.' },
  { icon: Blinds, title: 'Zatemnění oken', text: 'Pro klidný spánek i po noční směně.' },
  { icon: Wifi, title: 'Wi-Fi' },
  { icon: AlarmSmoke, title: 'Hlásič kouře' },
  { icon: SprayCan, title: 'Úklidová sada', text: 'Vysavač a mop.' },
  { icon: Wind, title: 'Sušák na prádlo' },
]

export const perHouse: Amenity[] = [
  { icon: Recycle, title: 'Společný dvorek', text: 'S kontejnery na odpad.' },
  { icon: Bike, title: 'Stojan na kola' },
  { icon: Shirt, title: 'Sušáky na prádlo', text: 'Na dvorku.' },
  { icon: Lightbulb, title: 'Osvětlené vstupy' },
  { icon: FireExtinguisher, title: 'Hasicí přístroje', text: 'Na chodbách.' },
  { icon: LampCeiling, title: 'Nouzové osvětlení', text: 'Na chodbách.' },
]
