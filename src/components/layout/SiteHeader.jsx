import { Menu, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { selectCartTotalItems } from '../../features/cart/cartSlice'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
]

function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/hero-logo.jpeg"
        alt="Hero Wholesale Foods"
        className="h-10 w-auto object-contain"
      />
    </Link>
  )
}

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="group/nav-link relative text-slate-700 transition-colors hover:text-red-600"
        >
          <span>{item.label}</span>
          <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-red-500 via-red-400 to-red-500 transition-transform duration-300 group-hover/nav-link:scale-x-100" />
        </Link>
      ))}
    </nav>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-red-200 bg-white text-slate-800 hover:bg-red-50 hover:text-red-600 md:hidden"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-l border-slate-200 bg-white px-0 py-6"
      >
        <div className="px-4">
          <BrandMark />
        </div>
        <div className="mt-6 flex flex-col gap-2 px-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-between rounded-md px-4 py-2 text-sm font-medium text-slate-800 hover:bg-red-50 hover:text-red-600"
            >
              <span>{item.label}</span>
              <span className="h-px w-8 bg-gradient-to-r from-red-400 to-red-600" />
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SiteHeader() {
  const cartTotal = useSelector(selectCartTotalItems)

  return (
    <header className="sticky top-0 z-40 border-b border-red-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark />
        <div className="hidden items-center gap-6 md:flex">
          {/* <div className="flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-red-600">
            <span>B2B</span>
            <span className="h-3 w-px bg-red-200" />
            <span>Food Service</span>
          </div> */}
          <DesktopNav />
        </div>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-50 hover:text-red-600">
            <ShoppingCart className="h-5 w-5" />
            {cartTotal > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {cartTotal}
              </span>
            )}
          </Link>
          <Button asChild className="hidden rounded-full bg-red-600 px-5 text-white shadow-sm hover:bg-red-500 sm:inline-flex">
            <Link to="/contact">Contact Us</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>

  )
}

export default SiteHeader
