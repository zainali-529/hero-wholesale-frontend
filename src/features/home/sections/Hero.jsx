import { Button } from '../../../components/ui/button'

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-red-50/40 to-white px-4 py-10 shadow-sm sm:px-8 sm:py-12"
    >
      <div className="pointer-events-none absolute -left-24 -top-32 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-red-400/5 blur-3xl" />

      <div className="relative grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Hero · Wholesale Food
          </span>

          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
              Every food category,
              <br />
              organised for{' '}
              <span className="text-red-600">serious wholesale buyers.</span>
            </h1>
            <p className="max-w-xl text-sm text-slate-600 sm:text-[15px]">
              Build your entire purchase list from a single hero screen. Frozen,
              dry, beverages, bakery, and packing – all grouped the way kitchens
              and stores actually think.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Browse all categories</Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-200 text-slate-800 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            >
              Talk to wholesale specialist
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Trusted by restaurants, cafés, and mini-marts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <span>Category-wise pricing, MOQ and pack sizes</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[2.2rem] bg-gradient-to-tr from-red-500/10 via-red-400/10 to-transparent blur-2xl" />
          <div className="relative h-full rounded-[2rem] bg-white p-5 text-slate-900 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-red-600">
                  Service snapshot
                </p>
                <p className="text-xs text-slate-500">
                  Built for recurring wholesale orders, not one‑off spot buying.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-700 ring-1 ring-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Live dispatch lanes</span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <p className="text-[11px] text-slate-500">On‑time deliveries</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  98.4%
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Across frozen, dry & beverages.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <p className="text-[11px] text-slate-500">Active clients</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  500+
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Restaurants, cafés & mini‑marts.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                <p className="text-[11px] text-slate-500">Core product lines</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  1,200+
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  Structured by storage & usage.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Sample weekly dispatch rhythm</span>
                <span className="text-slate-500">Karachi hub</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div
                    key={day}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <span className="rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[9px]">
                      {day}
                    </span>
                    <span
                      className={`h-1.5 w-full rounded-full ${
                        index === 1 || index === 3 || index === 5
                          ? 'bg-gradient-to-r from-red-500 via-red-400 to-red-500'
                          : 'bg-slate-200'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
