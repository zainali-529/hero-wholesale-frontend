const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Product', href: '#product' },
  { label: 'Contact us', href: '#contact' },
]

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-100 bg-white text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-red-400 shadow-sm ring-2 ring-red-500/15">
              <span className="text-sm font-black tracking-tight text-white">
                H
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600">
                Hero
              </span>
              <span className="text-[11px] text-slate-600">Wholesale Foods</span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-600 transition-colors hover:text-red-600"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="text-xs text-slate-600 sm:text-sm">
            <p className="font-medium text-slate-800">Karachi, Pakistan</p>
            <p className="text-[11px] text-slate-500">Mon–Sat · 9:00am – 9:00pm</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-4 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Hero Wholesale Foods. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="#terms"
              className="transition-colors hover:text-slate-900"
            >
              Terms
            </a>
            <a
              href="#privacy"
              className="transition-colors hover:text-slate-900"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
