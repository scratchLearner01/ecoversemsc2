"use client"

import { useState } from "react"
import { X, CheckCircle } from "lucide-react"

export default function ResourceDetailModal({ resource, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAddToCart = () => {
    setIsProcessing(true)
    setTimeout(() => {
      onAddToCart(resource, quantity)
      setIsProcessing(false)
    }, 800)
  }

  const totalPrice = resource.price * quantity
  const ecoPointsEarned = Math.floor(totalPrice / 10)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-bounce-pop">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{resource.title}</h2>
            <p className="text-muted-foreground">{resource.seller}</p>
          </div>

          {/* Image */}
          <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-6xl">
            {resource.icon}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-bold">{resource.location}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-bold capitalize">{resource.category}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Available Stock</p>
              <p className="font-bold">{resource.stock} kg</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Price per kg</p>
              <p className="font-bold text-primary">₹{resource.price}</p>
            </div>
          </div>

          {/* Certifications */}
          {resource.certified && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-primary">Eco Certified</p>
                <p className="text-sm text-muted-foreground">Verified by CPCB</p>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="font-medium">Quantity (kg)</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-20 px-4 py-2 border border-border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={() => setQuantity(Math.min(resource.stock, quantity + 1))}
                className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Eco Points Earned</span>
              <span className="text-primary font-bold">+{ecoPointsEarned}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice}</span>
            </div>
          </div>

          {/* Processing Bar */}
          {isProcessing && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Processing your purchase...</p>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse" style={{ width: "100%" }} />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 button-pulse"
            >
              {isProcessing ? "Processing..." : "Add to Cart"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
