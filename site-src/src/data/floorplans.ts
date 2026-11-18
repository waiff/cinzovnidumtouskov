import type { PlanId, VariantId } from './apartments'

/** [x0, y0, x1, y1] v metrech. */
export type Rect = [number, number, number, number]

export type FurnitureKind =
  | 'bed'
  | 'daybed'
  | 'sofa'
  | 'wardrobe'
  | 'nightstand'
  | 'table'
  | 'chair'
  | 'counter'
  | 'induction'
  | 'sink'
  | 'fridge'
  | 'washer'
  | 'washerDryer'
  | 'dryer'
  | 'shoe'
  | 'bath'
  | 'shower'
  | 'wc'
  | 'basin'
  | 'shelf'
  | 'boiler'
  | 'tank'
  | 'rail'

export interface Furniture {
  k: FurnitureKind
  r: Rect
  /** Zobrazit jen v dané variantě. */
  v?: VariantId
  /** Strana čela postele / nádržky WC. */
  head?: 'l' | 'r' | 't' | 'b'
}

export type RoomKind = 'living' | 'bedroom' | 'bath' | 'hall' | 'storage' | 'common'

export interface PlanRoom {
  id: string
  name: string
  area: number
  apt: number | null
  kind: RoomKind
  rects: Rect[]
  label?: [number, number]
  /** Krátký název do půdorysu (plný název se ukáže v detailu). */
  short?: string
  /** Popisek „nad 1,2 m“ u podkrovních místností. */
  areaNote?: string
}

export interface Opening {
  r: Rect
  kind: 'window' | 'door' | 'entry' | 'gap'
  swing?: 'n' | 's' | 'e' | 'w'
  hinge?: 'start' | 'end'
  /** Popisek vně budovy u vstupních dveří. */
  label?: string
}

export interface Stair {
  r: Rect
  axis: 'x' | 'y'
  arrow?: 'up' | 'down' | 'left' | 'right'
  label: string
}

export interface FloorPlan {
  id: PlanId
  label: string
  short: string
  size: [number, number]
  apartments: number[]
  walls: Rect[]
  partitions: Rect[]
  roof?: Rect[]
  chimneys?: Rect[]
  openings: Opening[]
  rooms: PlanRoom[]
  furniture: Furniture[]
  stairs?: Stair[]
  skylights?: Rect[]
  lowCeiling?: Rect[]
  /** Sloupky krovu (překážky při zařizování). */
  posts?: Rect[]
  /** Pozice štítku „BYT n“. */
  badges: Record<number, [number, number]>
}

const plan1np: FloorPlan = {
  id: '1np',
  label: 'Přízemí',
  short: 'Byty 1 a 2',
  size: [15.4, 10.15],
  apartments: [1, 2],
  walls: [
    [0, 0, 15.4, 0.55],
    [0, 9.6, 15.4, 10.15],
    [0, 0, 0.5, 10.15],
    [14.8, 0, 15.4, 10.15],
    [5.7, 0.55, 6.2, 9.6],
    [9.15, 0.55, 9.65, 9.6],
    [0.5, 5.2, 5.7, 5.5],
    [9.65, 4.9, 14.8, 5.2],
    [9.65, 4.9, 10.7, 5.37],
    [7.65, 5.65, 7.95, 8.4],
  ],
  partitions: [
    [7.6, 0.55, 7.75, 3.75],
    [6.2, 2.7, 7.6, 2.8],
    [6.2, 3.7, 9.15, 3.85],
  ],
  chimneys: [
    [5.85, 4.95, 6.05, 5.15],
    [5.85, 5.25, 6.05, 5.45],
    [9.79, 5.02, 10.0, 5.21],
    [10.09, 5.02, 10.29, 5.21],
    [10.39, 5.02, 10.59, 5.21],
  ],
  openings: [
    { r: [2.25, 0, 3.75, 0.55], kind: 'window' },
    { r: [6.7, 0, 7.2, 0.55], kind: 'window' },
    { r: [8.2, 0, 8.7, 0.55], kind: 'window' },
    { r: [11.15, 0, 12.7, 0.55], kind: 'window' },
    { r: [2.25, 9.6, 3.9, 10.15], kind: 'window' },
    { r: [8.4, 9.6, 8.85, 10.15], kind: 'window' },
    { r: [14.8, 6.75, 15.4, 8.4], kind: 'window' },
    { r: [6.4, 9.6, 7.45, 10.15], kind: 'entry', swing: 'n', hinge: 'start', label: 'Vstup' },
    { r: [5.7, 2.85, 6.2, 3.65], kind: 'door', swing: 'w', hinge: 'start' },
    { r: [6.27, 2.7, 6.9, 2.8], kind: 'door', swing: 'n', hinge: 'start' },
    { r: [6.55, 3.7, 7.35, 3.85], kind: 'door', swing: 'n', hinge: 'start' },
    { r: [2.85, 5.2, 3.7, 5.5], kind: 'door', swing: 'n', hinge: 'end' },
    { r: [9.15, 2.9, 9.65, 3.6], kind: 'door', swing: 'w', hinge: 'end' },
    { r: [9.15, 4.0, 9.65, 4.85], kind: 'door', swing: 'e', hinge: 'start' },
    { r: [12.4, 4.9, 13.25, 5.2], kind: 'door', swing: 'n', hinge: 'end' },
  ],
  rooms: [
    { id: '1.05', name: 'Obytný pokoj + KK', area: 23.8, apt: 1, kind: 'living', rects: [[0.5, 0.55, 5.7, 5.2]], label: [2.95, 1.45] },
    { id: '1.06', name: 'Ložnice', area: 21.0, apt: 1, kind: 'bedroom', rects: [[0.5, 5.5, 5.7, 9.6]], label: [3.9, 6.5] },
    { id: '1.04', name: 'Koupelna s WC', area: 3.0, apt: 1, kind: 'bath', rects: [[6.2, 0.55, 7.6, 2.7]], label: [6.56, 1.62] },
    { id: '1.03', name: 'Zádveří', area: 1.3, apt: 1, kind: 'hall', rects: [[6.2, 2.8, 7.6, 3.7]], label: [7.05, 3.25] },
    { id: '1.08', name: 'Koupelna s WC', area: 4.4, apt: 2, kind: 'bath', rects: [[7.75, 0.55, 9.15, 3.7]], label: [8.15, 2.45] },
    { id: '1.07', name: 'Obytný pokoj + KK', area: 22.0, apt: 2, kind: 'living', rects: [[9.65, 0.55, 14.8, 4.9]], label: [12.05, 1.45] },
    { id: '1.09', name: 'Ložnice', area: 22.3, apt: 2, kind: 'bedroom', rects: [[9.65, 5.2, 14.8, 9.6]], label: [13.1, 7.6] },
    { id: '1.01', name: 'Chodba se schodištěm', short: 'Chodba', area: 12.8, apt: null, kind: 'common', rects: [[6.2, 3.85, 9.15, 9.6]], label: [7.67, 4.75] },
  ],
  furniture: [
    // Byt 1 – obytný pokoj
    { k: 'counter', r: [4.45, 0.55, 5.7, 1.15] },
    { k: 'counter', r: [5.1, 0.55, 5.7, 2.75] },
    { k: 'induction', r: [4.47, 0.57, 5.07, 1.13] },
    { k: 'sink', r: [5.12, 0.82, 5.68, 1.5] },
    { k: 'washerDryer', r: [5.12, 1.55, 5.68, 2.12] },
    { k: 'fridge', r: [5.06, 2.15, 5.7, 2.74] },
    { k: 'table', r: [2.85, 2.4, 4.0, 3.2] },
    { k: 'chair', r: [2.95, 2.0, 3.32, 2.36] },
    { k: 'chair', r: [3.53, 2.0, 3.9, 2.36] },
    { k: 'chair', r: [2.95, 3.24, 3.32, 3.6] },
    { k: 'chair', r: [3.53, 3.24, 3.9, 3.6] },
    { k: 'sofa', r: [0.6, 1.9, 1.45, 3.9], v: 'A' },
    { k: 'daybed', r: [0.6, 2.3, 1.45, 4.25], v: 'B', head: 't' },
    { k: 'daybed', r: [0.6, 4.3, 2.55, 5.15], v: 'B', head: 'l' },
    { k: 'nightstand', r: [0.6, 1.9, 0.95, 2.25], v: 'B' },
    { k: 'nightstand', r: [2.6, 4.8, 2.82, 5.15], v: 'B' },
    { k: 'wardrobe', r: [3.8, 4.65, 4.4, 5.15], v: 'B' },
    { k: 'wardrobe', r: [4.45, 4.65, 5.05, 5.15], v: 'B' },
    // Byt 1 – ložnice
    { k: 'bed', r: [0.6, 6.95, 2.55, 7.85], head: 'l' },
    { k: 'bed', r: [0.6, 8.3, 2.55, 9.15], head: 'l' },
    { k: 'nightstand', r: [0.6, 7.88, 0.95, 8.25] },
    { k: 'nightstand', r: [0.6, 9.18, 0.95, 9.55] },
    { k: 'wardrobe', r: [5.15, 7.35, 5.7, 7.95] },
    { k: 'wardrobe', r: [5.15, 8.0, 5.7, 8.6] },
    // Byt 1 – koupelna, zádveří
    { k: 'wc', r: [6.32, 0.7, 6.72, 1.28] },
    { k: 'bath', r: [6.97, 0.58, 7.55, 2.06] },
    { k: 'basin', r: [7.15, 2.17, 7.58, 2.62] },
    { k: 'shoe', r: [7.28, 2.86, 7.54, 3.62] },
    { k: 'rail', r: [7.55, 2.84, 7.6, 3.66] },
    // Byt 2 – koupelna
    { k: 'wc', r: [7.86, 0.7, 8.28, 1.2] },
    { k: 'bath', r: [8.53, 0.58, 9.1, 2.06] },
    { k: 'basin', r: [8.71, 2.19, 9.1, 2.6] },
    // Byt 2 – obytný pokoj
    { k: 'counter', r: [9.65, 0.55, 10.25, 2.85] },
    { k: 'counter', r: [9.65, 0.55, 10.8, 1.15] },
    { k: 'induction', r: [10.25, 0.57, 10.78, 1.13] },
    { k: 'sink', r: [9.67, 0.82, 10.23, 1.54] },
    { k: 'fridge', r: [9.65, 1.6, 10.27, 2.19] },
    { k: 'washerDryer', r: [9.67, 2.22, 10.23, 2.83] },
    { k: 'table', r: [11.35, 2.4, 12.5, 3.2] },
    { k: 'chair', r: [11.45, 2.0, 11.82, 2.36] },
    { k: 'chair', r: [12.03, 2.0, 12.4, 2.36] },
    { k: 'chair', r: [11.45, 3.24, 11.82, 3.6] },
    { k: 'chair', r: [12.03, 3.24, 12.4, 3.6] },
    { k: 'shoe', r: [10.28, 4.58, 11.05, 4.86] },
    { k: 'sofa', r: [13.9, 1.4, 14.75, 3.4], v: 'A' },
    { k: 'daybed', r: [13.9, 0.65, 14.75, 2.6], v: 'B', head: 't' },
    { k: 'daybed', r: [13.9, 2.75, 14.75, 4.7], v: 'B', head: 't' },
    { k: 'nightstand', r: [13.45, 0.65, 13.8, 1.0], v: 'B' },
    { k: 'nightstand', r: [13.45, 2.75, 13.8, 3.1], v: 'B' },
    { k: 'wardrobe', r: [11.12, 4.3, 11.69, 4.86], v: 'B' },
    { k: 'wardrobe', r: [11.72, 4.3, 12.29, 4.86], v: 'B' },
    // Byt 2 – ložnice
    { k: 'bed', r: [9.75, 6.95, 11.7, 7.85], head: 'l' },
    { k: 'bed', r: [9.75, 8.3, 11.7, 9.15], head: 'l' },
    { k: 'nightstand', r: [9.75, 7.88, 10.1, 8.25] },
    { k: 'nightstand', r: [9.75, 9.18, 10.1, 9.55] },
    { k: 'wardrobe', r: [13.4, 5.25, 13.97, 5.8] },
    { k: 'wardrobe', r: [14.0, 5.25, 14.57, 5.8] },
  ],
  stairs: [{ r: [7.95, 5.65, 9.15, 9.6], axis: 'y', arrow: 'up', label: 'patro' }],
  badges: { 1: [2.95, 0.95], 2: [12.05, 0.95] },
}

const plan2np: FloorPlan = {
  id: '2np',
  label: '1. patro',
  short: 'Byty 3 a 4',
  size: [15.4, 10.15],
  apartments: [3, 4],
  walls: [
    [0, 0, 15.4, 0.4],
    [0, 9.75, 15.4, 10.15],
    [0, 0, 0.5, 10.15],
    [14.85, 0, 15.4, 10.15],
    [5.9, 0.4, 6.2, 9.75],
    [9.25, 0.4, 9.55, 9.75],
    [9.55, 4.95, 14.85, 5.35],
    [7.65, 6.5, 7.95, 8.4],
    [7.4, 0.4, 7.8, 0.7],
  ],
  partitions: [
    [0.5, 5.3, 5.9, 5.45],
    [4.85, 5.45, 4.95, 9.75],
    [4.95, 8.12, 5.9, 8.24],
    [6.2, 3.05, 7.7, 3.18],
    [7.7, 0.4, 7.8, 5.45],
    [7.8, 3.35, 9.25, 3.45],
    [6.2, 5.32, 9.25, 5.45],
  ],
  chimneys: [
    [5.87, 4.95, 6.05, 5.15],
    [5.87, 5.25, 6.05, 5.44],
    [9.79, 5.02, 10.0, 5.21],
    [10.09, 5.02, 10.29, 5.21],
    [10.39, 5.02, 10.59, 5.21],
  ],
  openings: [
    { r: [2.3, 0, 4.0, 0.4], kind: 'window' },
    { r: [6.7, 0, 7.2, 0.4], kind: 'window' },
    { r: [8.2, 0, 8.7, 0.4], kind: 'window' },
    { r: [10.75, 0, 12.45, 0.4], kind: 'window' },
    { r: [2.25, 9.75, 3.9, 10.15], kind: 'window' },
    { r: [5.25, 9.75, 5.7, 10.15], kind: 'window' },
    { r: [6.65, 9.75, 7.3, 10.15], kind: 'window' },
    { r: [9.95, 9.75, 10.4, 10.15], kind: 'window' },
    { r: [14.85, 6.7, 15.4, 8.35], kind: 'window' },
    { r: [5.9, 4.05, 6.2, 4.85], kind: 'door', swing: 'w', hinge: 'end' },
    { r: [6.95, 3.05, 7.55, 3.18], kind: 'door', swing: 'n', hinge: 'end' },
    { r: [6.6, 5.32, 7.38, 5.45], kind: 'door', swing: 'n', hinge: 'start' },
    { r: [8.45, 3.35, 9.05, 3.45], kind: 'door', swing: 'n', hinge: 'end' },
    { r: [8.25, 5.32, 9.05, 5.45], kind: 'door', swing: 'n', hinge: 'start' },
    { r: [9.25, 4.0, 9.55, 4.8], kind: 'door', swing: 'e', hinge: 'end' },
    { r: [2.9, 5.3, 3.7, 5.45], kind: 'door', swing: 'n', hinge: 'end' },
    { r: [4.85, 6.95, 4.95, 7.72], kind: 'door', swing: 'w', hinge: 'start' },
    { r: [5.2, 8.12, 5.62, 8.24], kind: 'door', swing: 'n', hinge: 'end' },
    { r: [12.25, 4.95, 13.05, 5.35], kind: 'door', swing: 'n', hinge: 'end' },
  ],
  rooms: [
    { id: '2.04', name: 'Obytný pokoj + KK', area: 25.9, apt: 3, kind: 'living', rects: [[0.5, 0.4, 5.9, 5.3]], label: [3.2, 1.3] },
    { id: '2.05', name: 'Ložnice', area: 18.3, apt: 3, kind: 'bedroom', rects: [[0.5, 5.45, 4.85, 9.75]], label: [3.4, 6.4] },
    { id: '2.06', name: 'Komora', area: 2.7, apt: 3, kind: 'storage', rects: [[4.95, 5.45, 5.9, 8.12]], label: [5.55, 7.3] },
    { id: '2.07', name: 'Komora', area: 1.5, apt: 3, kind: 'storage', rects: [[4.95, 8.24, 5.9, 9.75]], label: [5.6, 9.0] },
    { id: '2.03', name: 'Koupelna s WC', area: 3.8, apt: 3, kind: 'bath', rects: [[6.2, 0.4, 7.7, 3.05]], label: [6.6, 2.55] },
    { id: '2.02', name: 'Předsíň', area: 3.0, apt: 3, kind: 'hall', rects: [[6.2, 3.18, 7.7, 5.32]], label: [7.1, 3.9] },
    { id: '2.09', name: 'Koupelna s WC', area: 4.1, apt: 4, kind: 'bath', rects: [[7.8, 0.4, 9.25, 3.35]], label: [8.15, 2.0] },
    { id: '2.08', name: 'Předsíň', area: 2.5, apt: 4, kind: 'hall', rects: [[7.8, 3.45, 9.25, 5.32]], label: [8.75, 3.95] },
    { id: '2.10', name: 'Obytný pokoj + KK', area: 23.5, apt: 4, kind: 'living', rects: [[9.55, 0.4, 14.85, 4.95]], label: [12.05, 1.3] },
    { id: '2.11', name: 'Ložnice', area: 22.8, apt: 4, kind: 'bedroom', rects: [[9.55, 5.35, 14.85, 9.75]], label: [13.1, 7.6] },
    { id: '2.01', name: 'Chodba se schodištěm', short: 'Chodba', area: 12.6, apt: null, kind: 'common', rects: [[6.2, 5.45, 9.25, 9.75]], label: [7.72, 5.95] },
  ],
  furniture: [
    // Byt 3 – obytný pokoj
    { k: 'counter', r: [5.3, 0.4, 5.9, 4.0] },
    { k: 'induction', r: [5.32, 0.62, 5.88, 1.2] },
    { k: 'sink', r: [5.32, 1.55, 5.88, 2.3] },
    { k: 'washerDryer', r: [5.32, 2.75, 5.88, 3.35] },
    { k: 'fridge', r: [5.28, 3.36, 5.9, 3.98] },
    { k: 'table', r: [2.65, 2.35, 3.8, 3.15] },
    { k: 'chair', r: [2.72, 1.94, 3.1, 2.31] },
    { k: 'chair', r: [3.32, 1.94, 3.7, 2.31] },
    { k: 'chair', r: [2.72, 3.2, 3.1, 3.57] },
    { k: 'chair', r: [3.32, 3.2, 3.7, 3.57] },
    { k: 'sofa', r: [0.6, 1.6, 1.45, 3.6], v: 'A' },
    { k: 'daybed', r: [0.6, 1.1, 1.45, 3.05], v: 'B', head: 'b' },
    { k: 'daybed', r: [0.6, 3.2, 1.45, 5.15], v: 'B', head: 'b' },
    { k: 'nightstand', r: [0.6, 0.65, 0.95, 1.0], v: 'B' },
    { k: 'nightstand', r: [1.5, 2.9, 1.85, 3.3], v: 'B' },
    { k: 'wardrobe', r: [1.65, 4.72, 2.25, 5.25], v: 'B' },
    { k: 'wardrobe', r: [2.28, 4.72, 2.88, 5.25], v: 'B' },
    // Byt 3 – ložnice a komory
    { k: 'bed', r: [0.6, 7.15, 2.55, 8.0], head: 'l' },
    { k: 'bed', r: [0.6, 8.45, 2.55, 9.3], head: 'l' },
    { k: 'nightstand', r: [0.6, 8.04, 0.95, 8.4] },
    { k: 'nightstand', r: [0.6, 9.34, 0.95, 9.7] },
    { k: 'wardrobe', r: [4.27, 8.5, 4.82, 9.07] },
    { k: 'wardrobe', r: [4.27, 9.1, 4.82, 9.67] },
    { k: 'shelf', r: [5.0, 5.6, 5.35, 6.85] },
    { k: 'shelf', r: [5.0, 8.3, 5.35, 9.7] },
    // Byt 3 – koupelna a předsíň
    { k: 'bath', r: [6.25, 0.48, 6.86, 2.12] },
    { k: 'wc', r: [6.96, 0.42, 7.37, 1.04] },
    { k: 'basin', r: [7.24, 1.76, 7.66, 2.32] },
    { k: 'shoe', r: [6.22, 3.2, 6.5, 3.98] },
    { k: 'rail', r: [7.62, 3.96, 7.67, 4.95] },
    // Byt 4 – koupelna a předsíň
    { k: 'wc', r: [7.95, 0.42, 8.34, 1.03] },
    { k: 'bath', r: [8.59, 0.42, 9.21, 2.12] },
    { k: 'basin', r: [7.84, 2.47, 8.27, 3.04] },
    { k: 'shoe', r: [7.87, 3.56, 8.16, 4.34] },
    { k: 'rail', r: [9.19, 3.48, 9.24, 3.92] },
    // Byt 4 – obytný pokoj
    { k: 'counter', r: [9.55, 0.4, 10.15, 2.9] },
    { k: 'counter', r: [9.55, 0.4, 10.6, 1.0] },
    { k: 'induction', r: [10.02, 0.42, 10.58, 0.98] },
    { k: 'sink', r: [9.57, 0.8, 10.13, 1.6] },
    { k: 'fridge', r: [9.55, 1.63, 10.15, 2.25] },
    { k: 'washerDryer', r: [9.57, 2.27, 10.13, 2.88] },
    { k: 'table', r: [11.45, 2.35, 12.6, 3.1] },
    { k: 'chair', r: [11.5, 1.88, 11.9, 2.27] },
    { k: 'chair', r: [12.12, 1.88, 12.5, 2.27] },
    { k: 'chair', r: [11.5, 3.17, 11.9, 3.55] },
    { k: 'chair', r: [12.12, 3.17, 12.5, 3.55] },
    { k: 'sofa', r: [13.95, 1.4, 14.8, 3.4], v: 'A' },
    { k: 'daybed', r: [13.95, 0.6, 14.8, 2.55], v: 'B', head: 't' },
    { k: 'daybed', r: [13.95, 2.75, 14.8, 4.7], v: 'B', head: 't' },
    { k: 'nightstand', r: [13.5, 0.6, 13.9, 0.95], v: 'B' },
    { k: 'nightstand', r: [13.5, 2.75, 13.9, 3.1], v: 'B' },
    { k: 'wardrobe', r: [10.9, 4.35, 11.48, 4.92], v: 'B' },
    { k: 'wardrobe', r: [11.52, 4.35, 12.1, 4.92], v: 'B' },
    // Byt 4 – ložnice
    { k: 'bed', r: [9.65, 7.15, 11.6, 8.0], head: 'l' },
    { k: 'bed', r: [9.65, 8.45, 11.6, 9.3], head: 'l' },
    { k: 'nightstand', r: [9.65, 8.04, 10.0, 8.4] },
    { k: 'nightstand', r: [9.65, 9.34, 10.0, 9.7] },
    { k: 'wardrobe', r: [13.25, 5.4, 13.82, 5.95] },
    { k: 'wardrobe', r: [13.85, 5.4, 14.42, 5.95] },
  ],
  stairs: [{ r: [7.95, 6.5, 9.25, 9.75], axis: 'y', arrow: 'up', label: 'podkroví' }],
  badges: { 3: [3.2, 0.82], 4: [12.05, 0.82] },
}

const plan3np: FloorPlan = {
  id: '3np',
  label: 'Podkroví',
  short: 'Byty 5 a 6',
  size: [15.4, 10.15],
  apartments: [5, 6],
  walls: [
    [0, 0, 0.5, 10.15],
    [14.9, 0, 15.4, 10.15],
    [5.95, 3.65, 6.05, 9.65],
    [7.8, 0.5, 7.95, 8.05],
    [5.95, 3.65, 7.95, 3.75],
    [7.85, 7.95, 9.35, 8.05],
    [9.25, 7.95, 9.35, 9.65],
  ],
  roof: [
    [0, 0, 15.4, 0.5],
    [0, 9.65, 15.4, 10.15],
  ],
  partitions: [
    [5.4, 0.5, 5.5, 2.83],
    [5.4, 2.75, 7.8, 2.83],
    [7.95, 2.95, 9.83, 3.02],
    [9.75, 0.5, 9.83, 3.65],
    [8.85, 3.0, 8.92, 3.65],
    [8.85, 3.58, 9.83, 3.65],
    [7.95, 4.42, 9.35, 4.5],
    [9.27, 4.42, 9.35, 8.0],
    [7.95, 5.72, 9.35, 5.8],
    [11.33, 0.5, 11.42, 2.83],
    [11.33, 2.75, 14.9, 2.83],
    [0.5, 6.82, 5.95, 6.92],
    [9.35, 6.82, 14.9, 6.92],
  ],
  openings: [
    { r: [0, 3.55, 0.5, 4.7], kind: 'window' },
    { r: [0, 5.6, 0.5, 6.75], kind: 'window' },
    { r: [14.9, 3.55, 15.4, 4.7], kind: 'window' },
    { r: [14.9, 5.6, 15.4, 6.75], kind: 'window' },
    { r: [6.95, 2.75, 7.6, 2.83], kind: 'door', swing: 'n', hinge: 'end' },
    { r: [6.4, 3.65, 7.2, 3.75], kind: 'door', swing: 'n', hinge: 'start' },
    { r: [7.8, 6.65, 7.95, 7.45], kind: 'door', swing: 'e', hinge: 'end' },
    { r: [8.0, 2.95, 8.75, 3.02], kind: 'door', swing: 'n', hinge: 'start' },
    { r: [9.27, 4.7, 9.35, 5.4], kind: 'door', swing: 'w', hinge: 'start' },
    { r: [9.27, 5.92, 9.35, 6.7], kind: 'door', swing: 'e', hinge: 'start' },
    { r: [9.27, 7.05, 9.35, 7.85], kind: 'door', swing: 'e', hinge: 'end' },
    { r: [11.33, 1.78, 11.42, 2.5], kind: 'door', swing: 'e', hinge: 'end' },
    { r: [4.45, 6.82, 5.25, 6.92], kind: 'door', swing: 'n', hinge: 'end' },
  ],
  rooms: [
    {
      id: '3.08b',
      name: 'Obytný pokoj + KK',
      area: 31.3,
      apt: 5,
      kind: 'living',
      rects: [
        [0.5, 0.5, 5.4, 6.82],
        [5.4, 2.83, 6.4, 3.65],
        [5.4, 3.65, 5.95, 6.82],
      ],
      label: [3.4, 5.85],
      areaNote: 'nad 1,2 m',
    },
    { id: '3.08a', name: 'Ložnice', area: 13.6, apt: 5, kind: 'bedroom', rects: [[0.5, 6.92, 5.95, 9.65]], label: [4.6, 8.3], areaNote: 'nad 1,2 m' },
    { id: '3.07', name: 'Koupelna s WC', area: 4.7, apt: 5, kind: 'bath', rects: [[5.5, 0.5, 7.8, 2.75]], label: [6.25, 2.35] },
    { id: '3.09', name: 'Předsíň', area: 1.4, apt: 5, kind: 'hall', rects: [[6.4, 2.83, 7.8, 3.65]], label: [7.25, 3.25] },
    { id: '3.04', name: 'Koupelna s WC', area: 4.5, apt: 6, kind: 'bath', rects: [[7.95, 0.5, 9.75, 2.95]], label: [8.42, 1.75] },
    { id: '3.05', name: 'Chodbička', area: 1.2, apt: 6, kind: 'hall', rects: [[7.95, 3.02, 8.85, 3.65], [8.92, 3.02, 9.75, 3.58]] },
    { id: '3.06', name: 'Šatna', area: 1.6, apt: 6, kind: 'storage', rects: [[7.95, 4.5, 9.27, 5.72]], label: [8.95, 5.0] },
    { id: '3.01', name: 'Předsíň', area: 2.9, apt: 6, kind: 'hall', rects: [[7.95, 5.8, 9.27, 7.95]], label: [8.75, 6.3] },
    {
      id: '3.02b',
      name: 'Obytný pokoj + KK',
      area: 24.7,
      apt: 6,
      kind: 'living',
      rects: [
        [9.35, 2.83, 14.9, 6.82],
        [9.83, 0.5, 11.33, 2.83],
        [7.95, 3.65, 9.35, 4.42],
      ],
      label: [12.9, 6.3],
      areaNote: 'nad 1,2 m',
    },
    { id: '3.03', name: 'Komora', area: 6.7, apt: 6, kind: 'storage', rects: [[11.42, 0.5, 14.9, 2.75]], label: [13.2, 2.05] },
    { id: '3.02a', name: 'Ložnice', area: 13.9, apt: 6, kind: 'bedroom', rects: [[9.35, 6.92, 14.9, 9.65]], label: [13.4, 8.3], areaNote: 'nad 1,2 m' },
    {
      id: 'podesta',
      name: 'Podesta se schodištěm',
      short: 'Podesta',
      area: 12.9,
      apt: null,
      kind: 'common',
      rects: [
        [6.05, 3.75, 7.8, 7.95],
        [6.05, 7.95, 9.25, 9.65],
      ],
      label: [6.93, 5.6],
    },
  ],
  furniture: [
    // Byt 5 – obytný pokoj
    { k: 'counter', r: [2.55, 1.0, 4.8, 1.6] },
    { k: 'sink', r: [2.85, 1.02, 3.55, 1.58] },
    { k: 'induction', r: [3.9, 1.02, 4.5, 1.58] },
    { k: 'fridge', r: [4.75, 1.7, 5.4, 2.3] },
    { k: 'washerDryer', r: [4.8, 2.33, 5.4, 2.9] },
    { k: 'table', r: [2.55, 3.3, 3.7, 4.1] },
    { k: 'chair', r: [2.62, 2.88, 3.0, 3.25] },
    { k: 'chair', r: [3.22, 2.88, 3.6, 3.25] },
    { k: 'chair', r: [2.62, 4.15, 3.0, 4.52] },
    { k: 'chair', r: [3.22, 4.15, 3.6, 4.52] },
    { k: 'sofa', r: [0.55, 3.2, 1.4, 5.2] },
    { k: 'shoe', r: [5.63, 3.76, 5.93, 4.53] },
    // Byt 5 – ložnice
    { k: 'bed', r: [0.95, 6.97, 1.8, 8.9], head: 't' },
    { k: 'bed', r: [2.25, 6.97, 3.1, 8.9], head: 't' },
    { k: 'nightstand', r: [0.52, 6.97, 0.88, 7.32] },
    { k: 'nightstand', r: [1.85, 6.97, 2.2, 7.32] },
    { k: 'wardrobe', r: [3.2, 6.95, 3.75, 7.45] },
    { k: 'wardrobe', r: [3.78, 6.95, 4.33, 7.45] },
    // Byt 5 – koupelna
    { k: 'shower', r: [5.5, 0.8, 6.28, 1.93] },
    { k: 'wc', r: [7.28, 0.52, 7.67, 1.13] },
    { k: 'basin', r: [7.35, 1.61, 7.78, 2.16] },
    { k: 'rail', r: [7.72, 2.98, 7.77, 3.62] },
    // Byt 6 – koupelna, chodbička
    { k: 'shower', r: [8.95, 0.8, 9.74, 1.93] },
    { k: 'wc', r: [8.21, 0.52, 8.6, 1.13] },
    { k: 'basin', r: [9.3, 1.95, 9.74, 2.42] },
    { k: 'washer', r: [8.98, 3.06, 9.6, 3.52] },
    // Byt 6 – šatna, předsíň
    { k: 'wardrobe', r: [7.98, 4.55, 8.5, 5.12] },
    { k: 'wardrobe', r: [7.98, 5.15, 8.5, 5.7] },
    { k: 'shoe', r: [7.99, 5.84, 8.27, 6.62] },
    // Byt 6 – obytný pokoj
    { k: 'counter', r: [9.85, 1.62, 10.45, 3.65] },
    { k: 'sink', r: [9.87, 1.65, 10.43, 2.4] },
    { k: 'dryer', r: [9.87, 2.45, 10.43, 3.03] },
    { k: 'fridge', r: [9.85, 3.05, 10.45, 3.65] },
    { k: 'counter', r: [11.45, 2.83, 12.65, 3.45] },
    { k: 'induction', r: [11.47, 2.85, 12.05, 3.43] },
    { k: 'table', r: [11.1, 4.75, 12.25, 5.55] },
    { k: 'chair', r: [11.17, 4.32, 11.55, 4.7] },
    { k: 'chair', r: [11.78, 4.32, 12.16, 4.7] },
    { k: 'chair', r: [11.17, 5.6, 11.55, 5.98] },
    { k: 'chair', r: [11.78, 5.6, 12.16, 5.98] },
    { k: 'sofa', r: [14.0, 3.6, 14.85, 5.6] },
    { k: 'shelf', r: [11.65, 0.95, 14.75, 1.35] },
    // Byt 6 – ložnice
    { k: 'bed', r: [10.65, 6.97, 11.5, 8.9], head: 't' },
    { k: 'bed', r: [11.95, 6.97, 12.8, 8.9], head: 't' },
    { k: 'nightstand', r: [10.25, 6.97, 10.6, 7.32] },
    { k: 'nightstand', r: [11.55, 6.97, 11.9, 7.32] },
    { k: 'wardrobe', r: [13.75, 6.95, 14.3, 7.45] },
    { k: 'wardrobe', r: [14.33, 6.95, 14.88, 7.45] },
  ],
  stairs: [{ r: [6.15, 8.15, 9.15, 9.55], axis: 'x', arrow: 'left', label: '1. patro' }],
  skylights: [
    [2.75, 0.55, 3.65, 1.5],
    [5.84, 0.55, 6.74, 1.5],
    [7.98, 0.55, 8.85, 1.5],
    [9.94, 0.55, 10.84, 1.5],
    [12.99, 0.55, 13.89, 1.5],
    [2.73, 8.6, 3.63, 9.55],
    [12.0, 8.6, 12.9, 9.55],
  ],
  lowCeiling: [
    [0.5, 0.5, 14.9, 0.82],
    [0.5, 9.33, 14.9, 9.65],
  ],
  posts: [
    [0.54, 2.68, 0.67, 2.83],
    [4.66, 2.68, 4.8, 2.83],
    [0.54, 7.37, 0.67, 7.52],
    [4.66, 7.37, 4.8, 7.52],
  ],
  badges: { 5: [3.4, 5.0], 6: [13.4, 3.35] },
}

const planP1: FloorPlan = {
  id: 'p1',
  label: 'Přístavba – přízemí',
  short: 'Byt 7',
  size: [9.9, 6.15],
  apartments: [7],
  walls: [
    [0, 0, 9.9, 0.3],
    [0, 5.85, 9.9, 6.15],
    [0, 0, 0.3, 6.15],
    [9.6, 0, 9.9, 6.15],
    [2.5, 0.3, 2.75, 5.85],
  ],
  partitions: [
    [1.45, 0.3, 1.52, 3.68],
    [1.45, 3.58, 2.5, 3.68],
    [2.75, 3.58, 4.9, 3.7],
    [4.78, 0.3, 4.9, 5.85],
  ],
  openings: [
    { r: [1.5, 0, 1.95, 0.3], kind: 'window' },
    { r: [3.5, 0, 4.15, 0.3], kind: 'window' },
    { r: [5.7, 0, 6.55, 0.3], kind: 'window' },
    { r: [6.4, 5.85, 7.2, 6.15], kind: 'window' },
    { r: [1.45, 5.85, 2.45, 6.15], kind: 'entry', swing: 'n', hinge: 'start', label: 'Vstup' },
    { r: [9.6, 1.6, 9.9, 2.6], kind: 'entry', swing: 'w', hinge: 'start', label: 'Zahrádka' },
    { r: [1.6, 3.58, 2.4, 3.68], kind: 'door', swing: 's', hinge: 'start' },
    { r: [2.5, 3.8, 2.75, 4.6], kind: 'door', swing: 'e', hinge: 'start' },
    { r: [3.05, 3.58, 3.75, 3.7], kind: 'door', swing: 'n', hinge: 'start' },
    { r: [4.78, 3.92, 4.9, 4.72], kind: 'door', swing: 'w', hinge: 'start' },
  ],
  rooms: [
    {
      id: '1.10',
      name: 'Chodba se schodištěm',
      short: 'Chodba',
      area: 8.4,
      apt: null,
      kind: 'common',
      rects: [
        [0.3, 0.3, 1.45, 3.68],
        [0.3, 3.68, 2.5, 5.85],
      ],
      label: [0.88, 5.4],
    },
    { id: '1.11', name: 'Kotelna', area: 3.4, apt: null, kind: 'storage', rects: [[1.52, 0.3, 2.5, 3.58]], label: [2.0, 3.2] },
    { id: '1.13', name: 'Koupelna s WC', area: 6.5, apt: 7, kind: 'bath', rects: [[2.75, 0.3, 4.78, 3.58]], label: [3.85, 1.75] },
    { id: '1.12', name: 'Zádveří', area: 4.6, apt: 7, kind: 'hall', rects: [[2.75, 3.7, 4.78, 5.85]], label: [3.75, 4.85] },
    {
      id: '1.15',
      name: 'Pokoj s kuchyňským koutem',
      short: 'Pokoj + KK',
      area: 25.6,
      apt: 7,
      kind: 'living',
      rects: [[4.9, 0.3, 9.6, 5.85]],
      label: [6.5, 4.5],
    },
  ],
  furniture: [
    { k: 'boiler', r: [2.14, 0.71, 2.48, 1.13] },
    { k: 'tank', r: [1.75, 1.47, 2.48, 2.22] },
    { k: 'bath', r: [2.95, 0.33, 4.74, 1.06] },
    { k: 'wc', r: [2.78, 1.63, 3.34, 2.02], head: 'l' },
    { k: 'basin', r: [4.31, 2.31, 4.74, 2.87] },
    { k: 'washer', r: [4.15, 2.98, 4.74, 3.56] },
    { k: 'rail', r: [4.71, 4.83, 4.76, 5.46] },
    { k: 'wardrobe', r: [2.8, 5.3, 3.37, 5.82] },
    { k: 'wardrobe', r: [3.4, 5.3, 3.97, 5.82] },
    { k: 'shoe', r: [4.05, 5.52, 4.76, 5.82] },
    { k: 'counter', r: [4.9, 0.3, 5.5, 3.55] },
    { k: 'induction', r: [4.92, 0.52, 5.48, 1.11] },
    { k: 'sink', r: [4.95, 1.83, 5.52, 2.62] },
    { k: 'fridge', r: [4.9, 2.92, 5.55, 3.55] },
    { k: 'table', r: [7.55, 1.45, 8.3, 2.2] },
    { k: 'chair', r: [7.74, 1.02, 8.12, 1.4] },
    { k: 'chair', r: [7.74, 2.25, 8.12, 2.63] },
    { k: 'bed', r: [7.6, 3.95, 9.55, 4.8], head: 'r' },
    { k: 'bed', r: [7.6, 4.9, 9.55, 5.75], head: 'r' },
    { k: 'nightstand', r: [9.2, 3.52, 9.55, 3.88] },
    { k: 'nightstand', r: [7.15, 5.4, 7.52, 5.77] },
  ],
  stairs: [{ r: [0.36, 0.37, 1.42, 4.9], axis: 'y', arrow: 'up', label: 'patro' }],
  badges: { 7: [6.5, 3.75] },
}

const planP2: FloorPlan = {
  id: 'p2',
  label: 'Přístavba – patro',
  short: 'Byt 8',
  size: [9.9, 6.15],
  apartments: [8],
  walls: [
    [0, 0, 9.9, 0.3],
    [0, 5.85, 9.9, 6.15],
    [0, 0, 0.3, 6.15],
    [9.6, 0, 9.9, 6.15],
    [3.1, 0.3, 3.35, 2.7],
    [1.4, 2.55, 4.05, 2.7],
    [1.4, 2.7, 1.65, 5.85],
  ],
  partitions: [
    [3.95, 2.7, 4.05, 5.85],
    [1.65, 3.9, 3.95, 4.0],
  ],
  openings: [
    { r: [1.45, 0, 1.95, 0.3], kind: 'window' },
    { r: [5.65, 0, 6.55, 0.3], kind: 'window' },
    { r: [2.55, 5.85, 3.3, 6.15], kind: 'window' },
    { r: [6.35, 5.85, 7.25, 6.15], kind: 'window' },
    { r: [9.6, 1.3, 9.9, 2.75], kind: 'window' },
    { r: [2.15, 2.55, 2.95, 2.7], kind: 'door', swing: 's', hinge: 'end' },
    { r: [3.95, 3.0, 4.05, 3.8], kind: 'door', swing: 'e', hinge: 'start' },
    { r: [2.5, 3.9, 3.2, 4.0], kind: 'door', swing: 's', hinge: 'end' },
  ],
  rooms: [
    {
      id: '2.10',
      name: 'Chodba se schodištěm',
      short: 'Chodba',
      area: 9.6,
      apt: null,
      kind: 'common',
      rects: [
        [0.3, 0.3, 3.1, 2.55],
        [0.3, 2.55, 1.4, 5.85],
      ],
      label: [2.25, 1.5],
    },
    { id: '2.11', name: 'Zádveří', area: 2.6, apt: 8, kind: 'hall', rects: [[1.65, 2.7, 3.95, 3.9]], label: [2.95, 3.4] },
    { id: '2.12', name: 'Koupelna s WC', area: 4.0, apt: 8, kind: 'bath', rects: [[1.65, 4.0, 3.95, 5.85]], label: [2.95, 5.05] },
    {
      id: '2.14',
      name: 'Pokoj s kuchyňským koutem',
      short: 'Pokoj + KK',
      area: 32.4,
      apt: 8,
      kind: 'living',
      rects: [
        [3.35, 0.3, 9.6, 2.7],
        [4.05, 2.7, 9.6, 5.85],
      ],
      label: [6.0, 3.9],
    },
  ],
  furniture: [
    { k: 'counter', r: [3.35, 0.3, 6.6, 0.9] },
    { k: 'counter', r: [3.35, 0.9, 3.95, 2.55] },
    { k: 'induction', r: [4.6, 0.32, 5.2, 0.88] },
    { k: 'washer', r: [5.38, 0.32, 5.98, 0.88] },
    { k: 'sink', r: [3.37, 0.95, 3.93, 1.65] },
    { k: 'fridge', r: [3.35, 1.88, 4.0, 2.55] },
    { k: 'table', r: [7.05, 1.75, 7.8, 2.5] },
    { k: 'chair', r: [7.25, 1.3, 7.62, 1.68] },
    { k: 'chair', r: [7.25, 2.57, 7.62, 2.95] },
    { k: 'bed', r: [7.6, 3.95, 9.55, 4.8], head: 'r' },
    { k: 'bed', r: [7.6, 4.9, 9.55, 5.75], head: 'r' },
    { k: 'nightstand', r: [9.2, 3.52, 9.55, 3.88] },
    { k: 'nightstand', r: [7.15, 5.4, 7.52, 5.77] },
    { k: 'wardrobe', r: [1.7, 2.75, 2.22, 3.31] },
    { k: 'wardrobe', r: [1.7, 3.33, 2.22, 3.88] },
    { k: 'shoe', r: [3.05, 2.75, 3.85, 3.05] },
    { k: 'shower', r: [1.68, 5.03, 2.45, 5.81] },
    { k: 'basin', r: [3.44, 4.24, 3.89, 4.8] },
    { k: 'wc', r: [3.31, 5.24, 3.89, 5.62] },
    { k: 'rail', r: [3.27, 3.82, 3.83, 3.87] },
  ],
  stairs: [{ r: [0.36, 0.37, 1.36, 5.75], axis: 'y', arrow: 'down', label: 'přízemí' }],
  badges: { 8: [6.0, 3.15] },
}

export const floorPlans: FloorPlan[] = [plan1np, plan2np, plan3np, planP1, planP2]

export const planById = Object.fromEntries(floorPlans.map((p) => [p.id, p])) as Record<PlanId, FloorPlan>
