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
import { ChevronDown, MoreHorizontal } from 'lucide-react'
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

  return (
    <MainLayout>
      <section className="mt-6">
        <div className="mb-4 space-y-3">
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

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCategory('all')
                setPageNumber(1)
              }}
              className={`shrink-0 h-8 rounded-full px-4 text-xs font-medium ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              All
            </Button>
            
            {normalizedCategories.slice(0, 8).map((cat) => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedCategory(cat.key)
                  setPageNumber(1)
                }}
                className={`shrink-0 h-8 rounded-full px-4 text-xs font-medium ${
                  selectedCategory === cat.key
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
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
                        onClick={() => {
                          setSelectedCategory(cat.key)
                          setPageNumber(1)
                        }}
                        className={`truncate rounded-md px-2 py-1.5 text-left text-xs ${
                          selectedCategory === cat.key
                            ? 'bg-red-50 text-red-700 font-medium'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
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
