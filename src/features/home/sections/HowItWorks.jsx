import { CheckCircle2, ClipboardList, Headphones, Truck } from 'lucide-react'

const steps = [
  {
    title: 'Share your requirement',
    description:
      'Tell us which categories you need, expected volumes and delivery areas.',
    icon: ClipboardList,
    meta: '1–2 quick conversations',
  },
  {
    title: 'Get curated catalogue & pricing',
    description:
      'We map your needs to our frozen, dry, beverage and packing lines with clear MOQs.',
    icon: CheckCircle2,
    meta: 'Transparent slabs & packs',
  },
  {
    title: 'Confirm and schedule deliveries',
    description:
      'Lock in your days and timing windows – we align routes around your kitchen or store.',
    icon: Truck,
    meta: 'Planned & on-time',
  },
  {
    title: 'Ongoing support & promos',
    description:
      'Stay updated on new lines, stock-outs and bulk deals through a dedicated contact.',
    icon: Headphones,
    meta: 'WhatsApp-first support',
  },
]

function HowItWorks() {
  return (
    <section className="mt-12 rounded-3xl border border-slate-100 bg-white/90 px-4 py-8 shadow-sm sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
            How it works
          </h2>
          <p className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            From first inquiry to scheduled wholesale deliveries.
          </p>
          <p className="max-w-xl text-xs text-slate-600 sm:text-sm">
            A simple, repeatable flow designed for restaurants, cafés, caterers and
            retail buyers who need reliable partners instead of one-off suppliers.
          </p>
        </div>
        <div className="text-xs text-slate-500 sm:text-sm">
          <p className="font-medium text-slate-700">
            Built around real kitchen and store rhythms.
          </p>
          <p>We tune this flow to your city, volumes and lines.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
            >
              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute right-[-14px] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-gradient-to-r from-slate-200 to-red-200 md:block" />
              )}
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-600">{step.description}</p>
              <div className="mt-3 inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500">
                {step.meta}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorks

