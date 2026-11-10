# cinzovnidumtouskov.cz

One-page prezentace domu **Činžovní dům Touškov** – 8 vybavených bytů pro ubytování 16 nebo 24 zaměstnanců.

React 18 + Vite + Tailwind CSS v4 + Lucide. Bez backendu – výsledkem je statický web ve složce `dist/`.

## Spuštění

```bash
npm install
npm run dev       # vývoj na http://localhost:5173
npm run build     # produkční build do dist/
npm run preview   # náhled buildu
```

## Kde se co mění

Veškerý obsah je v `src/data/` – komponent se není třeba dotýkat.

| Co | Soubor |
| --- | --- |
| **Ceny** (celý dům / měsíc pro A a B) | `src/data/pricing.ts` – `monthly: null` zobrazí „Cena na dotaz“; po zadání čísla se dopočítá cena za lůžko |
| **Fotky** | nahrát do `public/photos/` a v `src/data/photos.ts` doplnit `src: '/photos/nazev.webp'` |
| Kontakty, adresa, odkaz na mapu | `src/data/site.ts` |
| Byty, místnosti, plochy, obsazenost | `src/data/apartments.ts` |
| Vybavení | `src/data/amenities.ts` |
| Doprava (časy jsou orientační) | `src/data/transport.ts` |
| Půdorysy (geometrie v metrech) | `src/data/floorplans.ts` |

## Nasazení (Hostinger)

Hostinger nasazuje každý push do větve `main` přímo do `public_html` – **bez buildu na serveru**.
Proto v kořeni repozitáře leží hotový web a zdrojáky jsou v této složce (`site-src/`, z webu nepřístupná).

Postup při změně:

```bash
cd site-src
npm install          # jen poprvé
# … úpravy v src/ …
npm run release      # build + zkopírování hotového webu do kořene repozitáře
cd ..
git add -A && git commit -m "Popis změny" && git push
```

## Struktura

```
src/
  data/         obsah webu (byty, půdorysy, ceny, fotky, doprava…)
  context/      sdílený stav – zvolená varianta A/B, podlaží a zvýrazněný byt
  hooks/        scroll-spy, reveal animace, zámek scrollu
  lib/          formátování (cs-CZ), sestavení poptávkového e-mailu
  components/
    ui/         tlačítka, badge, přepínač, pole formuláře, galerie, lightbox
    floorplan/  SVG renderer půdorysů a legenda
    sections/   jednotlivé sekce stránky
```

Poptávkový formulář nic neukládá – po validaci otevře e-mailového klienta s předvyplněnou zprávou na `petr.hejtmanek@limenventures.com`.
