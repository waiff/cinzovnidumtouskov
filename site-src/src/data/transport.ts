import type { LucideIcon } from 'lucide-react'
import { Building2, Bus, Factory, Landmark, Milestone, Moon, Route, SquareParking, Ticket, Warehouse } from 'lucide-react'

export interface Destination {
  icon: LucideIcon
  place: string
  detail: string
  minutes: number
  km: number
}

/**
 * Orientační hodnoty jízdy autem z Mlýnské 63. Ověřeno: poloha 9 km SZ od Plzně,
 * napojení přes Kozolupy po silnici II/180 na dálnici D5 (exit 93 Nýřany).
 */
export const driveTimes: Destination[] = [
  { icon: Route, place: 'Dálnice D5', detail: 'exit 93 Nýřany, po II/180 přes Kozolupy', minutes: 10, km: 8 },
  { icon: Factory, place: 'Nýřany', detail: 'průmyslové areály', minutes: 12, km: 9 },
  { icon: Warehouse, place: 'Plzeň – Myslinka', detail: 'průmyslová zóna u D5', minutes: 15, km: 12 },
  { icon: Building2, place: 'Plzeň – centrum', detail: 'náměstí Republiky', minutes: 20, km: 14 },
  { icon: Factory, place: 'Plzeň – Borská pole', detail: 'průmyslová zóna', minutes: 25, km: 20 },
  { icon: Milestone, place: 'Rozvadov / hranice SRN', detail: 'po D5 na západ', minutes: 45, km: 60 },
  { icon: Landmark, place: 'Praha', detail: 'po D5 na východ', minutes: 75, km: 105 },
]

export interface TransitFact {
  icon: LucideIcon
  title: string
  text: string
}

export const transit: TransitFact[] = [
  {
    icon: SquareParking,
    title: 'Parkování u domu',
    text: 'Parkování přímo u domu pro 10 vozidel – pro auta zaměstnanců i firemní vozy.',
  },
  {
    icon: Bus,
    title: 'Autobus 56 (PMDP)',
    text: 'Město Touškov – Plzeň, CAN – Vinice. Na centrální autobusové nádraží zhruba 35 minut, v pracovní dny.',
  },
  {
    icon: Moon,
    title: 'Noční linka N5',
    text: 'Noční spojení Město Touškov – Plzeň pro směnný provoz.',
  },
  {
    icon: Ticket,
    title: 'Integrovaná doprava IDPK',
    text: 'Tarifní zóna 121 – jedna jízdenka pro autobusy i vlaky v Plzeňském kraji.',
  },
]

export const locationFacts = [
  { value: '9 km', label: 'od Plzně, severozápadním směrem' },
  { value: '≈ 10 min', label: 'na dálnici D5' },
  { value: '35 min', label: 'autobusem na plzeňské CAN' },
  { value: '10 aut', label: 'parkování přímo u domu' },
]
