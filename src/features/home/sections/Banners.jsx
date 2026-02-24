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
import { Button } from '../../../components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'
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

  const handleCategoryClick = (categoryId) => {
    if (!categoryId) {
      navigate('/products')
      return
    }
    navigate(`/products?category=${encodeURIComponent(categoryId)}`)
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
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCategoryClick(null)}
            className="shrink-0 h-8 rounded-full border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            All
          </Button>
          
          {normalizedCategories.slice(0, 8).map((cat) => (
            <Button
              key={cat.key}
              variant="outline"
              size="sm"
              onClick={() => handleCategoryClick(cat.key)}
              className="shrink-0 h-8 rounded-full border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              {cat.label}
            </Button>
          ))}

          {normalizedCategories.length > 8 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 h-8 w-8 rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[300px] p-2"
              >
                <div className="grid grid-cols-2 gap-1">
                  {normalizedCategories.slice(8).map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => handleCategoryClick(cat.key)}
                      className="truncate rounded-md px-2 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-100"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
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
