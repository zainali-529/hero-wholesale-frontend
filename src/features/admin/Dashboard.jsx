import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/banners" className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-red-200">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100">
            <Plus className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Manage Banners</h3>
          <p className="mt-2 text-sm text-slate-500">
            Upload and manage promotional banners for the homepage.
          </p>
        </Link>

        <Link to="/admin/categories" className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-red-200">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100">
            <Plus className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Manage Categories</h3>
          <p className="mt-2 text-sm text-slate-500">
            Create and organize product categories.
          </p>
        </Link>

        <Link to="/admin/products" className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-red-200">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100">
            <Plus className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Manage Products</h3>
          <p className="mt-2 text-sm text-slate-500">
            Add new products, update prices, and manage inventory.
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
