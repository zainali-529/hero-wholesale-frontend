import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  selectAllBanners,
} from '../../features/banners/bannerSlice'
import { Button } from '../../components/ui/button'
import { Trash2, Upload, Edit, X } from 'lucide-react'

function BannersManager() {
  const dispatch = useDispatch()
  const banners = useSelector(selectAllBanners)
  const [editingId, setEditingId] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    image: null,
    isActive: true,
  })

  useEffect(() => {
    dispatch(fetchBanners())
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

  const handleEditClick = (banner) => {
    setEditingId(banner._id)
    setFormData({
      title: banner.title,
      link: banner.link || '',
      image: null, // Don't pre-fill file input
      isActive: banner.isActive,
    })
    setImagePreview(banner.image?.url)
    // Scroll to top to see the form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ title: '', link: '', image: null, isActive: true })
    setImagePreview(null)
    const fileInput = document.getElementById('banner-image')
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation: Require image only for create mode
    if (!editingId && !formData.image) return alert('Please select an image')

    const data = new FormData()
    data.append('title', formData.title)
    data.append('link', formData.link)
    data.append('isActive', formData.isActive)
    
    if (formData.image) {
      data.append('image', formData.image)
    }

    if (editingId) {
      await dispatch(updateBanner({ id: editingId, bannerData: data }))
    } else {
      await dispatch(createBanner(data))
    }

    handleCancelEdit()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      dispatch(deleteBanner(id))
      if (editingId === id) {
        handleCancelEdit()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manage Banners</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload/Edit Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? 'Edit Banner' : 'Upload New Banner'}
            </h2>
            {editingId && (
              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                <X className="mr-2 h-4 w-4" /> Cancel Edit
              </Button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Summer Sale"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Link (Optional)
              </label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="/products"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Banner Image
              </label>
              <input
                id="banner-image"
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
              <label className="text-sm text-slate-700">Active</label>
            </div>

            <Button type="submit" className="w-full">
              {editingId ? (
                <>
                  <Edit className="mr-2 h-4 w-4" /> Update Banner
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload Banner
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Banners List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Existing Banners
          </h2>
          <div className="grid gap-4">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className={`flex items-center gap-4 rounded-lg border p-4 shadow-sm transition-all ${
                  editingId === banner._id 
                    ? 'border-red-500 ring-1 ring-red-500 bg-red-50' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                  <img
                    src={banner.image?.url}
                    alt={banner.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">{banner.title}</h3>
                  <p className="text-sm text-slate-500">
                    {banner.isActive ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-slate-400">Inactive</span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditClick(banner)}
                    className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    title="Edit"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            {banners.length === 0 && (
              <p className="text-sm text-slate-500">No banners found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannersManager
