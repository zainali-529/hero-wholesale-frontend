import { Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import ProductsPage from '../features/products/ProductsPage.jsx'
import AboutPage from '../features/about/AboutPage.jsx'
import ContactPage from '../features/contact/ContactPage.jsx'
import PartnerPage from '../features/partner/PartnerPage.jsx'
import LoginPage from '../features/auth/LoginPage.jsx'
import ProtectedRoute from '../components/layout/ProtectedRoute.jsx'

// Admin Components
import AdminLayout from '../features/admin/AdminLayout.jsx'
import Dashboard from '../features/admin/Dashboard.jsx'
import BannersManager from '../features/admin/BannersManager.jsx'
import CategoriesManager from '../features/admin/CategoriesManager.jsx'
import ProductsManager from '../features/admin/ProductsManager.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="banners" element={<BannersManager />} />
          <Route path="categories" element={<CategoriesManager />} />
          <Route path="products" element={<ProductsManager />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
