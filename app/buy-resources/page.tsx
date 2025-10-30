"use client"

import { useState, useEffect } from "react"
import BuyResourcesNavbar from "@/components/buy-resources-navbar"
import HeroSection from "@/components/buy-resources-hero"
import FilterBar from "@/components/buy-resources-filter"
import MarketplaceGrid from "@/components/buy-resources-marketplace"
import ResourceDetailModal from "@/components/buy-resources-detail-modal"
import CartDrawer from "@/components/buy-resources-cart"
import FeaturedSellers from "@/components/buy-resources-sellers"
import EcoPointsBanner from "@/components/buy-resources-eco-banner"
import EcoBotChat from "@/components/ecobot-chat"
import Footer from "@/components/footer"

export default function BuyResourcesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEcoBot, setShowEcoBot] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    sellerType: "all",
    location: "all",
    priceRange: [10, 1000],
    ecoCertified: false,
    sortBy: "newest",
  })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleAddToCart = (resource, quantity) => {
    const existingItem = cartItems.find((item) => item.id === resource.id)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) => (item.id === resource.id ? { ...item, quantity: item.quantity + quantity } : item)),
      )
    } else {
      setCartItems([...cartItems, { ...resource, quantity }])
    }
    setShowDetailModal(false)
  }

  const handleRemoveFromCart = (resourceId) => {
    setCartItems(cartItems.filter((item) => item.id !== resourceId))
  }

  const handleUpdateQuantity = (resourceId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(resourceId)
    } else {
      setCartItems(cartItems.map((item) => (item.id === resourceId ? { ...item, quantity } : item)))
    }
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <BuyResourcesNavbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        cartCount={cartItems.length}
        onCartClick={() => setShowCart(true)}
        onEcoBotClick={() => setShowEcoBot(true)}
      />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <FilterBar filters={filters} onFiltersChange={setFilters} />
        <MarketplaceGrid
          filters={filters}
          onViewDetails={(resource) => {
            setSelectedResource(resource)
            setShowDetailModal(true)
          }}
        />
        <FeaturedSellers />
        <EcoPointsBanner />
      </main>
      <Footer />

      {/* Modals and Drawers */}
      {showDetailModal && selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          onClose={() => setShowDetailModal(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {showCart && (
        <CartDrawer
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
        />
      )}

      {showEcoBot && <EcoBotChat onClose={() => setShowEcoBot(false)} />}
    </div>
  )
}
