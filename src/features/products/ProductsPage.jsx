import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout.jsx'
import { Button } from '../../components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover'
import { ChevronDown } from 'lucide-react'
import ProductCard from '../home/components/ProductCard.jsx'
import { fetchCategories, selectAllCategories } from '../../features/categories/categorySlice'
import { fetchProducts, selectAllProducts, getProductsPages } from '../../features/products/productSlice'

function ProductsPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const categories = useSelector(selectAllCategories)
  const allProducts = useSelector(selectAllProducts)
  const totalPages = useSelector(getProductsPages)
  const params = new URLSearchParams(location.search)
  const categoryFromUrl = params.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)
  const [pageNumber, setPageNumber] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    const params = { pageNumber }
    if (selectedCategory !== 'all') {
      params.category = selectedCategory
    }
    dispatch(fetchProducts(params))
  }, [dispatch, selectedCategory, pageNumber])

  const normalizedCategories = useMemo(
    () =>
      categories.map((cat) => ({
        key: cat._id,
        label: cat.name,
      })),
    [categories],
  )

  const filteredProducts = allProducts

  const selectedLabel =
    selectedCategory === 'all'
      ? 'All categories'
      : normalizedCategories.find((c) => c.key === selectedCategory)?.label ||
        'All categories'

  return (
    <MainLayout>
      <section className="mt-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-red-500">
              Products
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Browse wholesale lines by category
            </h1>
            <p className="max-w-xl text-xs text-slate-500 sm:text-[13px]">
              Start with a broad category and then drill down into SKUs that fit
              your menu, store or delivery model.
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Category filter
            </p>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 h-9 rounded-md border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  {selectedLabel}
                  <ChevronDown className="ml-1.5 h-3.5 w-3.5 text-slate-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[320px] max-w-[90vw] sm:w-[360px]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Filter by category
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Pick a broad storage or usage group to see matching sample
                  products.
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all')
                      setPageNumber(1)
                      setIsOpen(false)
                    }}
                    className={`rounded-full border px-2.5 py-1 text-[11px] ${
                      selectedCategory === 'all'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-700'
                    }`}
                  >
                    All categories
                  </button>
                  {normalizedCategories.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.key)
                        setPageNumber(1)
                        setIsOpen(false)
                      }}
                      className={`rounded-full border px-2.5 py-1 text-[11px] ${
                        selectedCategory === cat.key
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id || product.name} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber === 1}
              className="w-24"
            >
              Previous
            </Button>
            <span className="text-sm font-medium text-slate-600">
              Page {pageNumber} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageNumber((p) => Math.min(totalPages, p + 1))}
              disabled={pageNumber === totalPages}
              className="w-24"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </MainLayout>
  )
}

export default ProductsPage
