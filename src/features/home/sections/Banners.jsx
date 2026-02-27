import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../components/ui/carousel'
import { CategoryDropdown } from '../../../components/ui/category-dropdown'
import { fetchBanners, selectAllBanners } from '../../banners/bannerSlice'
import { fetchCategories, selectAllCategories } from '../../categories/categorySlice'

function Banners() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const banners = useSelector(selectAllBanners)
  const categories = useSelector(selectAllCategories)
  const [api, setApi] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    dispatch(fetchBanners())
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (!api) return

    const id = setInterval(() => {
      if (!api) return
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 4500)

    return () => clearInterval(id)
  }, [api])

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const normalizedCategories = categories.map((cat) => ({
    key: cat._id,
    label: cat.name,
  }))

  const categoryGroups = [
    {
      label: 'All Categories',
      items: normalizedCategories,
    },
  ]

  const handleCategoryChange = (value) => {
    if (value === 'all') {
      navigate('/products')
      return
    }
    navigate(`/products?category=${encodeURIComponent(value)}`)
  }

  return (
    <section className="mt-3">
      <div className="mb-3 space-y-2">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Browse categories
          </p>
          <p className="text-xs text-slate-500 sm:text-[13px]">
            Quickly scan the types of lines you plan to stock today.
          </p>
        </div>
        
        <div className="w-full sm:w-[250px]">
          <CategoryDropdown
            categories={normalizedCategories}
            selectedId="all"
            onSelect={handleCategoryChange}
          />
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-slate-900/90">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl sm:aspect-[2.5/1]">
                  <img
                    src={banner.image?.url}
                    alt={`Banner ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-center gap-1.5 py-3">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-slate-700 hover:bg-slate-600'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Banners
