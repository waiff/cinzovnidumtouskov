import { ExplorerProvider } from './context/VariantContext'
import { AnnouncementBar } from './components/sections/AnnouncementBar'
import { Amenities } from './components/sections/Amenities'
import { Apartments } from './components/sections/Apartments'
import { FloorPlans } from './components/sections/FloorPlans'
import { Footer } from './components/sections/Footer'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Inquiry } from './components/sections/Inquiry'
import { Location } from './components/sections/Location'
import { MobileCta } from './components/sections/MobileCta'
import { Nav } from './components/sections/Nav'
import { Pricing } from './components/sections/Pricing'
import { Standard } from './components/sections/Standard'
import { Variants } from './components/sections/Variants'

export default function App() {
  return (
    <ExplorerProvider>
      <a href="#varianty" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Přeskočit na obsah
      </a>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <Standard />
        <Variants />
        <Apartments />
        <FloorPlans />
        <Amenities />
        <Gallery />
        <Location />
        <Pricing />
        <Inquiry />
      </main>
      <Footer />
      <MobileCta />
    </ExplorerProvider>
  )
}
