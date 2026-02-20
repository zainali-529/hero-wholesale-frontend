import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  selectAllCategories,
} from '../../features/categories/categorySlice'
import { Button } from '../../components/ui/button'
import { Trash2, Plus, Edit, X } from 'lucide-react'

function CategoriesManager() {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    isActive: true,
  })

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleEditClick = (category) => {
    setEditingId(category._id)
    setFormData({
      name: category.name,
      isActive: category.isActive,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', isActive: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    if (editingId) {
      await dispatch(updateCategory({ id: editingId, categoryData: formData }))
    } else {
      await dispatch(createCategory(formData))
    }
    
    handleCancelEdit()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id))
      if (editingId === id) {
        handleCancelEdit()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manage Categories</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Create/Edit Form */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? 'Edit Category' : 'Add New Category'}
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
                Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="e.g. Dairy, Produce, Bakery"
                required
              />
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
                  <Edit className="mr-2 h-4 w-4" /> Update Category
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Existing Categories
          </h2>
          <div className="grid gap-2">
            {categories.map((category) => (
              <div
                key={category._id}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 shadow-sm transition-all ${
                  editingId === category._id 
                    ? 'border-red-500 ring-1 ring-red-500 bg-red-50' 
                    : 'border-slate-200 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-900">
                    {category.name}
                  </span>
                  {category.isActive ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    title="Edit Category"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-sm text-slate-500">No categories found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesManager
