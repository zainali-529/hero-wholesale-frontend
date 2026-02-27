import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import MainLayout from '../../components/layout/MainLayout'
import { Button } from '../../components/ui/button'
import { selectCartItems, updateQuantity, removeFromCart, clearCart } from './cartSlice'

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)

  const handleUpdateQuantity = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleRequestQuote = () => {
    if (cartItems.length === 0) return

    // Format message for WhatsApp
    const itemsList = cartItems
      .map((item, index) => {
        const name = item.title || item.name
        return `${index + 1}. ${name} (Qty: ${item.quantity})`
      })
      .join('%0A')

    const message = `Hello, I would like to request a quote for the following items:%0A%0A${itemsList}%0A%0APlease let me know the pricing and availability.`
    
    // Replace with actual phone number
    const phoneNumber = '442088035621' 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    
    // Or navigate to contact page with state
    // navigate('/contact', { state: { items: cartItems } })
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-slate-900">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-slate-300" />
            <h2 className="text-lg font-medium text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500">
              Looks like you haven't added any items yet.
            </p>
            <Button asChild className="mt-6 bg-red-600 hover:bg-red-700">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="divide-y divide-slate-100 rounded-lg border border-slate-100 bg-white shadow-sm">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 p-4 sm:gap-6">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-slate-100 bg-slate-50">
                      <img
                        src={item.image?.url || item.image}
                        alt={item.title || item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">
                          {item.title || item.name}
                        </h3>
                        {item.pack && (
                          <p className="mt-1 text-xs text-slate-500">{item.pack}</p>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-slate-200">
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium text-slate-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-medium text-slate-900">Order Summary</h2>
                <div className="mb-6 space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span className="font-medium text-slate-900">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>
                </div>
                
                <p className="mb-6 text-xs text-slate-500">
                  Since we don't offer online payments, submitting this cart will open a WhatsApp chat with our sales team to finalize your order.
                </p>

                <Button 
                  onClick={handleRequestQuote} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Proceed to Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => dispatch(clearCart())} 
                  className="mt-3 w-full text-xs text-slate-500 hover:text-red-600"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default CartPage
