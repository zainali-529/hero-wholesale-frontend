import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel'
import ProductCard from '../components/ProductCard.jsx'
import { fetchProducts, selectAllOffers } from '../../products/productSlice'

function OfferOfTheDay() {
  const dispatch = useDispatch()
  const offers = useSelector(selectAllOffers)

  useEffect(() => {
    dispatch(fetchProducts({ isOfferOfDay: true }))
  }, [dispatch])

  if (!offers || offers.length === 0) return null

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-red-500">
            Special Offers
          </p>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Offer of the Day
          </h2>
        </div>
      </div>
      <div className="relative rounded-3xl px-3">
        <Carousel opts={{ align: 'start' }} className="relative">
          <CarouselContent>
            {offers.map((product) => (
              <CarouselItem
                key={product._id}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4 py-5"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-[-2.5rem] left-auto right-11 h-8 w-8 border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-red-300 hover:text-red-600" />
          <CarouselNext className="top-[-2.5rem] right-0 h-8 w-8 border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-red-300 hover:text-red-600" />
        </Carousel>
      </div>
    </section>
  )
}

export default OfferOfTheDay
