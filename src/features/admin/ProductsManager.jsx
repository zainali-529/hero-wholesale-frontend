import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  selectAllProducts,
  bulkUploadProducts,
  getBulkUploadStatus,
  getBulkUploadError,
  getLastBulkResult,
} from '../../features/products/productSlice'
import {
  fetchCategories,
  selectAllCategories,
} from '../../features/categories/categorySlice'
import { Button } from '../../components/ui/button'
import { Trash2, Upload, Plus, Edit, X } from 'lucide-react'

function ProductsManager() {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const categories = useSelector(selectAllCategories)
  const bulkUploadStatus = useSelector(getBulkUploadStatus)
  const bulkUploadError = useSelector(getBulkUploadError)
  const lastBulkResult = useSelector(getLastBulkResult)
  
  const [editingId, setEditingId] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [csvFile, setCsvFile] = useState(null)
  const [bulkImages, setBulkImages] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    rate: '',
    rating: 5,
    description: '',
    stock: 0,
    minOrderQuantity: 1,
    image: null,
    isActive: true,
    isOfferOfDay: false,
    isFeatured: false,
  })

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  // Cleanup object URL on unmount or when imagePreview changes
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }))
      const objectUrl = URL.createObjectURL(file)
      setImagePreview(objectUrl)
    }
  }

  const handleEditClick = (product) => {
    setEditingId(product._id)
    setFormData({
      title: product.title,
      category: product.category?._id || '',
      rate: product.rate,
      rating: product.rating || 5,
      description: product.description || '',
      stock: product.stock || 0,
      minOrderQuantity: product.minOrderQuantity || 1,
      image: null,
      isActive: product.isActive,
      isOfferOfDay: product.isOfferOfDay || false,
      isFeatured: product.isFeatured || false,
    })
    setImagePreview(product.image?.url)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({
      title: '',
      category: '',
      rate: '',
      rating: 5,
      description: '',
      stock: 0,
      minOrderQuantity: 1,
      image: null,
      isActive: true,
      isOfferOfDay: false,
      isFeatured: false,
    })
    setImagePreview(null)
    const fileInput = document.getElementById('product-image')
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editingId && !formData.image) return alert('Please select an image')
    if (!formData.category) return alert('Please select a category')

    const data = new FormData()
    Object.keys(formData).forEach((key) => {
      if (key === 'image' && !formData.image) return
      data.append(key, formData[key])
    })

    if (editingId) {
      await dispatch(updateProduct({ id: editingId, productData: data }))
    } else {
      await dispatch(createProduct(data))
    }
    
    handleCancelEdit()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
      if (editingId === id) {
        handleCancelEdit()
      }
    }
  }

  const handleCsvChange = (e) => {
    const file = e.target.files[0]
    setCsvFile(file || null)
  }

  const handleBulkImagesChange = (e) => {
    const files = Array.from(e.target.files || [])
    setBulkImages(files)
  }

  const handleBulkUpload = async (e) => {
    e.preventDefault()
    if (!csvFile) {
      alert('Please select a CSV file')
      return
    }

    const data = new FormData()
    data.append('csvFile', csvFile)
    bulkImages.forEach((file) => {
      data.append('images', file)
    })

    await dispatch(bulkUploadProducts(data))
    await dispatch(fetchProducts())

    setCsvFile(null)
    setBulkImages([])

    const csvInput = document.getElementById('bulk-csv-file')
    const imagesInput = document.getElementById('bulk-images')
    if (csvInput) csvInput.value = ''
    if (imagesInput) imagesInput.value = ''
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manage Products</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_400px]">
        {/* Products List */}
        <div className="order-2 lg:order-1 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Product Inventory
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className={`group relative flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all ${
                  editingId === product._id 
                    ? 'border-red-500 ring-1 ring-red-500 bg-red-50' 
                    : 'border-slate-200 bg-white hover:shadow-md'
                }`}
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.image?.url}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-slate-400 hover:text-slate-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-slate-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">
                    {product.category?.name || 'Uncategorized'}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      ${product.rate}
                    </span>
                    <span className="text-xs text-slate-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              {editingId && (
                <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Min Order
                  </label>
                  <input
                    type="number"
                    name="minOrderQuantity"
                    value={formData.minOrderQuantity}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isOfferOfDay"
                    checked={formData.isOfferOfDay}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Offer of the Day</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-slate-700">Featured Product</span>
                </label>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Product Image
                </label>
                <input
                  id="product-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-red-700 hover:file:bg-red-100"
                  required={!editingId}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <p className="mb-1 text-xs text-slate-500">Preview:</p>
                    <div className="overflow-hidden rounded-md border border-slate-200">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-32 w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
                <label className="text-sm text-slate-700">Active Product</label>
              </div>

              <Button type="submit" className="w-full">
                {editingId ? (
                  <>
                    <Edit className="mr-2 h-4 w-4" /> Update Product
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Create Product
                  </>
                )}
              </Button>
            </form>
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">
                Bulk upload products from CSV
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Upload a CSV file and related images to create many products at once.
              </p>
              <form className="space-y-4" onSubmit={handleBulkUpload}>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700">
                    CSV file
                  </label>
                  <input
                    id="bulk-csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleCsvChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-700">
                    Product images
                  </label>
                  <input
                    id="bulk-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleBulkImagesChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                  />
                  {bulkImages.length > 0 && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      {bulkImages.length} image files selected
                    </p>
                  )}
                </div>
                {lastBulkResult && (
                  <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">
                    <p>Processed {lastBulkResult.successCount} products.</p>
                    {lastBulkResult.errorCount > 0 && (
                      <p className="text-red-600">
                        {lastBulkResult.errorCount} rows had errors.
                      </p>
                    )}
                  </div>
                )}
                {bulkUploadError && (
                  <p className="text-[11px] text-red-600">{bulkUploadError}</p>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={bulkUploadStatus === 'loading'}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {bulkUploadStatus === 'loading' ? 'Uploading...' : 'Bulk upload'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsManager
