import { ShoppingCart, Eye, Heart, Star } from 'lucide-react'

function ProductCard({ product }) {
  const name = product.title || product.name
  const price = product.rate || product.price
  const image = product.image?.url || product.image
  const rating = product.rating || 0

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/60">
      
      {/* Top Section: Image */}
      <div className="relative flex h-[240px] w-full items-center justify-center bg-white p-8">
        {/* Ribbons */}
        {product.ribbon && (
          <div className="absolute left-0 top-6 z-20 rounded-r-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.ribbon}
          </div>
        )}
        
        {/* Product Image */}
        <div className="relative h-full w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain drop-shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Floating Action Bar */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 rounded-full bg-white p-1.5 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600">
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600">
              <Eye className="h-4 w-4" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Details */}
      <div className="flex flex-1 flex-col items-center bg-slate-50/50 px-6 py-6 text-center transition-colors group-hover:bg-slate-50">
        
        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-red-600">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star 
              key={index} 
              className={`h-4 w-4 ${index < rating ? "fill-lime-400 text-lime-400" : "fill-slate-200 text-slate-200"}`} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
