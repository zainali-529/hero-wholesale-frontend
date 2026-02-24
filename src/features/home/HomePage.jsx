import MainLayout from '../../components/layout/MainLayout.jsx'
import Banners from './sections/Banners.jsx'
import Hero from './sections/Hero.jsx'
import FeaturedProducts from './sections/FeaturedProducts.jsx'
import OfferOfTheDay from './sections/OfferOfTheDay.jsx'
import HowItWorks from './sections/HowItWorks.jsx'

function HomePage() {
  return (
    <MainLayout>
      <Banners />
      <FeaturedProducts />
      <OfferOfTheDay />
      <Hero />
      {/* <HowItWorks /> */}
    </MainLayout>
  )
}

export default HomePage
