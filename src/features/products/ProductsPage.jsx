import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout.jsx'
import { CategoryDropdown } from '../../components/ui/category-dropdown'
import { Spinner } from '../../components/ui/spinner'
import ProductCard from '../home/components/ProductCard.jsx'
import { fetchCategories, selectAllCategories, getCategoriesStatus } from '../../features/categories/categorySlice'
import { fetchProducts, selectAllProducts, getProductsPages, getProductsStatus } from '../../features/products/productSlice'
import { Button } from '../../components/ui/button.js'

function ProductsPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const categories = useSelector(selectAllCategories)
  const allProducts = useSelector(selectAllProducts)
  const totalPages = useSelector(getProductsPages)
  const productsStatus = useSelector(getProductsStatus)
  const categoriesStatus = useSelector(getCategoriesStatus)
  const isLoading = productsStatus === 'loading' || categoriesStatus === 'loading'

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

          <div className="w-full sm:w-[250px]">
            <CategoryDropdown
              categories={normalizedCategories}
              selectedId={selectedCategory}
              onSelect={(id) => {
                setSelectedCategory(id)
                setPageNumber(1)
              }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Spinner className="h-8 w-8 text-red-600" />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id || product.name} product={product} />
            ))}
          </div>
        )}

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
