export type VariantId = 'A' | 'B'
export type PlanId = '1np' | '2np' | '3np' | 'p1' | 'p2'
export type FloorGroup = 'prizemi' | 'patro' | 'podkrovi' | 'pristavba'

export interface ApartmentRoom {
  name: string
  area: number
  items: string[]
  /** Extra equipment present only in variant B. */
  itemsB?: string[]
  persons: Record<VariantId, number>
}

export interface Apartment {
  id: number
  floor: string
  group: FloorGroup
  plan: PlanId
  layout: '2+kk' | '1+kk'
  area: number
  garden?: number
  rooms: ApartmentRoom[]
  persons: Record<VariantId, number>
}

const bedroomItems = ['2 lůžka', '2 skříně', '2 noční stolky']

export const apartments: Apartment[] = [
  {
    id: 1,
    floor: 'Přízemí',
    group: 'prizemi',
    plan: '1np',
    layout: '2+kk',
    area: 52.6,
    garden: 36,
    persons: { A: 2, B: 4 },
    rooms: [
      { name: 'Ložnice', area: 21.0, items: bedroomItems, persons: { A: 2, B: 2 } },
      {
        name: 'Obytný pokoj s kuchyňským koutem',
        area: 23.8,
        items: ['kuchyně', 'stůl', 'pračka + sušička'],
        itemsB: ['2 lůžka', '2 skříně'],
        persons: { A: 0, B: 2 },
      },
      { name: 'Koupelna s WC', area: 3.0, items: [], persons: { A: 0, B: 0 } },
    ],
  },
  {
    id: 2,
    floor: 'Přízemí',
    group: 'prizemi',
    plan: '1np',
    layout: '2+kk',
    area: 52.2,
    garden: 36,
    persons: { A: 2, B: 4 },
    rooms: [
      { name: 'Ložnice', area: 22.3, items: bedroomItems, persons: { A: 2, B: 2 } },
      {
        name: 'Obytný pokoj s kuchyňským koutem',
        area: 22.0,
        items: ['kuchyně', 'stůl', 'pračka + sušička'],
        itemsB: ['2 lůžka', '2 skříně'],
        persons: { A: 0, B: 2 },
      },
      { name: 'Koupelna s WC', area: 4.4, items: [], persons: { A: 0, B: 0 } },
    ],
  },
  {
    id: 3,
    floor: '1. patro',
    group: 'patro',
    plan: '2np',
    layout: '2+kk',
    area: 58.2,
    persons: { A: 2, B: 4 },
    rooms: [
      { name: 'Ložnice', area: 18.3, items: bedroomItems, persons: { A: 2, B: 2 } },
      {
        name: 'Obytný pokoj s kuchyňským koutem',
        area: 26.0,
        items: ['kuchyně', 'stůl', 'pračka + sušička'],
        itemsB: ['2 lůžka', '2 skříně'],
        persons: { A: 0, B: 2 },
      },
      { name: 'Koupelna s WC', area: 3.8, items: [], persons: { A: 0, B: 0 } },
    ],
  },
  {
    id: 4,
    floor: '1. patro',
    group: 'patro',
    plan: '2np',
    layout: '2+kk',
    area: 57.2,
    persons: { A: 2, B: 4 },
    rooms: [
      { name: 'Ložnice', area: 22.8, items: bedroomItems, persons: { A: 2, B: 2 } },
      {
        name: 'Obytný pokoj s kuchyňským koutem',
        area: 23.5,
        items: ['kuchyně', 'stůl', 'pračka + sušička'],
        itemsB: ['2 lůžka', '2 skříně'],
        persons: { A: 0, B: 2 },
      },
      { name: 'Koupelna s WC', area: 4.1, items: [], persons: { A: 0, B: 0 } },
    ],
  },
  {
    id: 5,
    floor: 'Podkroví',
    group: 'podkrovi',
    plan: '3np',
    layout: '2+kk',
    area: 51.5,
    persons: { A: 2, B: 2 },
    rooms: [
      { name: 'Ložnice', area: 13.6, items: bedroomItems, persons: { A: 2, B: 2 } },
      {
        name: 'Obytný pokoj s kuchyňským koutem',
        area: 31.3,
        items: ['kuchyně', 'stůl', 'pohovka', 'pračka + sušička'],
        persons: { A: 0, B: 0 },
      },
      { name: 'Koupelna s WC', area: 4.7, items: [], persons: { A: 0, B: 0 } },
    ],
  },
  {
    id: 6,
    floor: 'Podkroví',
    group: 'podkrovi',
    plan: '3np',
    layout: '2+kk',
    area: 58.5,
    persons: { A: 2, B: 2 },
    rooms: [
      { name: 'Ložnice', area: 13.9, items: bedroomItems, persons: { A: 2, B: 2 } },
      {
        name: 'Obytný pokoj s kuchyňským koutem',
        area: 24.7,
        items: ['kuchyně', 'stůl', 'pohovka', 'sušička'],
        persons: { A: 0, B: 0 },
      },
      { name: 'Koupelna s WC', area: 4.5, items: ['pračka'], persons: { A: 0, B: 0 } },
    ],
  },
  {
    id: 7,
    floor: 'Přístavba – přízemí',
    group: 'pristavba',
    plan: 'p1',
    layout: '1+kk',
    area: 37.6,
    garden: 32,
    persons: { A: 2, B: 2 },
    rooms: [
      {
        name: 'Pokoj s kuchyňským koutem',
        area: 25.7,
        items: ['2 lůžka', '2 skříně', '2 noční stolky', 'kuchyně', 'stůl', 'pračka'],
        persons: { A: 2, B: 2 },
      },
      { name: 'Koupelna s WC', area: 6.5, items: [], persons: { A: 0, B: 0 } },
    ],
  },
  {
    id: 8,
    floor: 'Přístavba – patro',
    group: 'pristavba',
    plan: 'p2',
    layout: '1+kk',
    area: 39.6,
    persons: { A: 2, B: 2 },
    rooms: [
      {
        name: 'Pokoj s kuchyňským koutem',
        area: 32.4,
        items: ['2 lůžka', '2 skříně', '2 noční stolky', 'kuchyně', 'stůl', 'pračka'],
        persons: { A: 2, B: 2 },
      },
      { name: 'Koupelna s WC', area: 4.0, items: [], persons: { A: 0, B: 0 } },
    ],
  },
]

export const floorGroups: { id: FloorGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'Všechny' },
  { id: 'prizemi', label: 'Přízemí' },
  { id: 'patro', label: '1. patro' },
  { id: 'podkrovi', label: 'Podkroví' },
  { id: 'pristavba', label: 'Přístavba' },
]

export const totals = {
  apartments: apartments.length,
  area: Math.round(apartments.reduce((s, a) => s + a.area, 0) * 10) / 10,
  gardens: apartments.filter((a) => a.garden).length,
  persons: {
    A: apartments.reduce((s, a) => s + a.persons.A, 0),
    B: apartments.reduce((s, a) => s + a.persons.B, 0),
  } as Record<VariantId, number>,
}

export const variants: Record<
  VariantId,
  { id: VariantId; title: string; persons: number; summary: string; detail: string }
> = {
  A: {
    id: 'A',
    title: 'Varianta A',
    persons: 16,
    summary: '2 osoby v každém bytě',
    detail:
      'Ve 2+kk spí obě osoby v ložnici a obytný pokoj s kuchyní zůstává společný, s pohovkou. Klidnější režim s vlastním obývacím prostorem.',
  },
  B: {
    id: 'B',
    title: 'Varianta B',
    persons: 24,
    summary: 'Byty 1–4 po 4 osobách, ostatní po 2',
    detail:
      'V bytech 1–4 bydlí 2 osoby v ložnici a 2 v obytném pokoji (navíc 2 lůžka a 2 skříně). V ostatních bytech po 2 osobách. Na pokoji vždy nejvýše 2 lidé.',
  },
}
