import { ShoppingCart } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../cart/cartSlice'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const name = product.title || product.name
  const price = product.rate || product.price
  const image = product.image?.url || product.image

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, _id: product._id || product.id }))
    toast.success('Added to cart')
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      
      {/* Top Section: Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50 p-6">
        {/* Ribbons */}
        {product.ribbon && (
          <div className="absolute left-0 top-4 z-20 rounded-r-md bg-red-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {product.ribbon}
          </div>
        )}
        
        {/* Product Image */}
        <div className="relative h-full w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Section: Details */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="mb-1 text-sm font-semibold text-slate-900 line-clamp-2" title={name}>
            {name}
          </h3>
          {/* Add Unit/Pack info if available in product data */}
          {product.pack && (
            <p className="text-xs text-slate-500">{product.pack}</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
           {/* Price if needed, otherwise hidden */}
           {/* <div className="text-sm font-bold text-slate-900">
             Rs. {price}
           </div> */}
           
           <Button 
             onClick={handleAddToCart}
             className="w-full bg-red-600 hover:bg-red-700 text-white gap-2 text-xs h-9"
             size="sm"
           >
             <ShoppingCart className="h-3.5 w-3.5" />
             Add to Cart
           </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
