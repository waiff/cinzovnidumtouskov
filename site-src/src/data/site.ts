export const site = {
  name: 'Činžovní dům Touškov',
  tagline: 'Ubytování pro zaměstnance firem',
  domain: 'cinzovnidumtouskov.cz',
  address: {
    street: 'Mlýnská 63',
    city: 'Město Touškov',
    region: 'Plzeň-sever',
  },
  phone: {
    display: '+420 603 105 276',
    href: 'tel:+420603105276',
  },
  email: 'petr.hejtmanek@limenventures.com',
  mapUrl: 'https://mapy.cz/zakladni?q=Ml%C3%BDnsk%C3%A1%2063%2C%20M%C4%9Bsto%20Tou%C5%A1kov',
} as const

/**
 * Kdo projekt připravuje – zobrazuje se v patičce.
 * Nevyplněné údaje (`null`) se z věty vynechají, nic se nedomýšlí.
 */
export const operator = {
  name: 'Limen Ventures s.r.o.',
  /** např. '12345678' */
  ico: null as string | null,
  /** např. 'Václavské náměstí 1, 110 00 Praha 1' */
  seat: null as string | null,
  /** soud ve 2. pádě, např. 'Městského soudu v Praze' */
  court: null as string | null,
  /** spisová značka, např. 'C 123456' */
  fileNumber: null as string | null,
  /** podmínka zahájení ubytování */
  condition: 'Zahájení ubytování je podmíněno dokončením koupě objektu.',
}

export function operatorStatement() {
  const parts = [`Projekt připravuje ${operator.name}`]
  if (operator.ico) parts.push(`IČO ${operator.ico}`)
  if (operator.seat) parts.push(`se sídlem ${operator.seat}`)
  if (operator.court && operator.fileNumber) parts.push(`zapsaná v obchodním rejstříku u ${operator.court}, sp. zn. ${operator.fileNumber}`)
  const sentence = parts.join(', ')
  return sentence.endsWith('.') ? sentence : `${sentence}.`
}

export const announcement = {
  title: 'Projekt v přípravě.',
  text: 'Předběžný zájem můžete nezávazně indikovat níže.',
  href: '#poptavka',
}

export const navLinks = [
  { id: 'varianty', label: 'Varianty' },
  { id: 'byty', label: 'Byty' },
  { id: 'pudorysy', label: 'Půdorysy' },
  { id: 'vybaveni', label: 'Vybavení' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'doprava', label: 'Doprava' },
  { id: 'cena', label: 'Cena' },
] as const
