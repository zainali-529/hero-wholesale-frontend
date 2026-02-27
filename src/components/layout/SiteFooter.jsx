import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: 'https://www.instagram.com/herocateringsupplies?igsh=MTRudzdhN2k2eW1pcQ%3D%3D&utm_source=qr' },
  { icon: Linkedin, href: '#' },
]

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-red-400 shadow-sm ring-2 ring-red-500/15">
              <span className="text-lg font-black tracking-tight text-white">
                H
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
                Hero
              </span>
              <span className="text-xs text-slate-400">Catering Supplies</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" />
              <span>2 Stacey Avenue, London N18 3PL, United Kingdom</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-500" />
              <span>020 8803 5621</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-red-500" />
              <span>sales@herocateringltd.com</span>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-slate-400 transition-colors hover:text-red-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-6 md:justify-end">
             {socialLinks.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  className="text-slate-400 hover:text-red-500 transition-colors transform hover:scale-110 duration-200"
                >
                  <item.icon className="h-5 w-5" />
                </a>
             ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                 <p>© {year} Hero Catering Supplies. All rights reserved.</p>
                 <span className="hidden text-slate-700 sm:inline">|</span>
                 <p className="font-medium text-slate-400">Powered by Orca Business Solutions</p>
            </div>
          
          <div className="flex justify-center gap-6 sm:justify-end">
            <Link
              to="/terms"
              className="transition-colors hover:text-slate-300"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="transition-colors hover:text-slate-300"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
