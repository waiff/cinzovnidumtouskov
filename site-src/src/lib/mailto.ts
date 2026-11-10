import type { VariantId } from '../data/apartments'

export interface InquiryData {
  company: string
  name: string
  email: string
  phone: string
  variant: VariantId
  start: string
  term: string
  note: string
}

export type InquiryErrors = Partial<Record<keyof InquiryData, string>>

export const termOptions = ['3–6 měsíců', '6–12 měsíců', '1 rok a déle', 'Zatím nevím'] as const

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneRe = /^\+?[0-9\s()-]{9,}$/

export function validateInquiry(d: InquiryData): InquiryErrors {
  const e: InquiryErrors = {}
  if (d.company.trim().length < 2) e.company = 'Vyplňte název firmy.'
  if (d.name.trim().length < 3) e.name = 'Vyplňte jméno kontaktní osoby.'
  if (!emailRe.test(d.email.trim())) e.email = 'Zadejte platný e-mail, např. jmeno@firma.cz.'
  if (d.phone.trim() && !phoneRe.test(d.phone.trim())) e.phone = 'Telefon zadejte ve tvaru +420 123 456 789.'
  if (d.start) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (new Date(d.start) < today) e.start = 'Datum nástupu nemůže být v minulosti.'
  }
  return e
}

function formatDate(iso: string) {
  if (!iso) return 'neuvedeno'
  const [y, m, d] = iso.split('-')
  return `${Number(d)}. ${Number(m)}. ${y}`
}

export function inquiryBody(d: InquiryData) {
  const persons = d.variant === 'A' ? 16 : 24
  return [
    'Dobrý den,',
    '',
    `máme zájem o pronájem domu Činžovní dům Touškov pro naše zaměstnance – varianta ${d.variant} (${persons} osob).`,
    '',
    `Firma: ${d.company.trim()}`,
    `Kontaktní osoba: ${d.name.trim()}`,
    `E-mail: ${d.email.trim()}`,
    `Telefon: ${d.phone.trim() || 'neuvedeno'}`,
    `Požadovaný nástup: ${formatDate(d.start)}`,
    `Délka pronájmu: ${d.term || 'neuvedeno'}`,
    '',
    d.note.trim() ? `Poznámka:\n${d.note.trim()}\n` : '',
    'Děkujeme a těšíme se na odpověď.',
  ]
    .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
    .join('\n')
}

export function inquirySubject(d: InquiryData) {
  return `Poptávka ubytování – ${d.company.trim()} – varianta ${d.variant} (${d.variant === 'A' ? 16 : 24} osob)`
}

export function buildMailto(to: string, d: InquiryData) {
  return `mailto:${to}?subject=${encodeURIComponent(inquirySubject(d))}&body=${encodeURIComponent(inquiryBody(d))}`
}
