const area1 = new Intl.NumberFormat('cs-CZ', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const int = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 })

export const formatArea = (m2: number) => `${area1.format(m2)} m²`
export const formatNumber = (n: number) => int.format(n)
export const formatCurrency = (n: number, currency = 'Kč') => `${int.format(Math.round(n))} ${currency}`

export function personsLabel(n: number) {
  if (n === 1) return '1 osoba'
  if (n >= 2 && n <= 4) return `${n} osoby`
  return `${n} osob`
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
