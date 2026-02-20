import MainLayout from '../../components/layout/MainLayout.jsx'

function PartnerPage() {
  return (
    <MainLayout>
      <section className="mt-4">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-red-500">
            Become a partner
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Onboard as a wholesale customer
          </h1>
          <p className="text-sm text-slate-600 sm:text-[15px]">
            This page can hold your onboarding steps, credit application
            process, required documents and territory coverage. For now it is a
            clean placeholder connected to the header button.
          </p>
        </div>
      </section>
    </MainLayout>
  )
}

export default PartnerPage

