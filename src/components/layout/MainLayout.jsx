import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default MainLayout
