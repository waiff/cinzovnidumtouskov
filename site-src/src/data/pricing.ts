import type { VariantId } from './apartments'

export interface PriceConfig {
  /** Měsíční nájem za celý dům v Kč. `null` = zobrazí se „Cena na dotaz“. */
  monthly: number | null
  beds: number
}

export const pricing: {
  currency: string
  /** Poznámka pod cenou, např. „bez DPH, energie zálohově“. `null` = nezobrazí se. */
  note: string | null
  variants: Record<VariantId, PriceConfig>
} = {
  currency: 'Kč',
  note: null,
  variants: {
    A: { monthly: null, beds: 16 },
    B: { monthly: null, beds: 24 },
  },
}

export const pricingIncludes = [
  'Pronájem celého domu – 8 bytů, 407,4 m²',
  'Kompletní vybavení bytů dle seznamu',
  'Lůžko, skříň a noční stolek pro každého',
  'Společný dvorek se zázemím',
]
