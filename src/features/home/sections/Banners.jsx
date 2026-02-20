import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
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
    if (!categoryId) return
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              All categories
              <ChevronDown className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-[720px] max-w-[90vw] sm:w-[820px]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              All wholesale categories
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Scan all lines in one view. Future categories will auto-flow into
              this grid.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {categoryGroups.map((group) => (
                <div key={group.label} className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-800">
                    {group.label}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {group.items.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleCategoryClick(item.key)}
                        className="truncate rounded-md bg-slate-50 px-2 py-1 text-left text-[11px] text-slate-700 hover:bg-red-50 hover:text-red-700"
                        title={item.label}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
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
