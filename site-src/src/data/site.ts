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

export const navLinks = [
  { id: 'varianty', label: 'Varianty' },
  { id: 'byty', label: 'Byty' },
  { id: 'pudorysy', label: 'Půdorysy' },
  { id: 'vybaveni', label: 'Vybavení' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'doprava', label: 'Doprava' },
  { id: 'cena', label: 'Cena' },
] as const
