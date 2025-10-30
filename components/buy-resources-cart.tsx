"use client"

import { useState } from "react"
import { X, Trash2, ShoppingBag } from "lucide-react"

export default function CartDrawer({ items, onClose, onUpdateQuantity, onRemove }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const ecoPointsEarned = Math.floor(subtotal / 10)
  const shipping = items.length > 0 ? 50 : 0
  const total = subtotal + shipping

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setShowConfirmation(true)
      setIsCheckingOut(false)
    }, 1500)
  }

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center space-y-6 animate-bounce-pop">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Purchase Confirmed!</h3>
            <p className="text-muted-foreground">
              Your sustainable purchase earned{" "}
              <span className="text-primary font-bold">+{ecoPointsEarned} Eco Points</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Drawer */}
      <div className="relative ml-auto bg-card border-l border-border w-full max-w-md h-full flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">₹{item.price}/kg</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 hover:bg-background rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-background rounded hover:bg-background/80 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                    className="w-12 px-2 py-1 border border-border rounded text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-background rounded hover:bg-background/80 transition-colors"
                  >
                    +
                  </button>
                  <span className="ml-auto font-bold">₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between text-sm text-primary font-bold">
                <span>Eco Points</span>
                <span>+{ecoPointsEarned}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>

            {isCheckingOut && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">Processing payment...</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-pulse" style={{ width: "100%" }} />
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 button-pulse"
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
