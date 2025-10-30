"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu, X, Sun, Moon, MessageCircle } from "lucide-react"

export default function BuyResourcesNavbar({ isDarkMode, onToggleDarkMode, cartCount, onCartClick, onEcoBotClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
              E
            </div>
            <span className="font-bold text-lg hidden sm:inline">EcoVerse</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search materials or sellers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/dashboard/individual" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/buy-resources" className="text-sm font-medium text-primary border-b-2 border-primary">
              Buy Resources
            </Link>
            <Link
              href="/dashboard/industry/green-audit"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Green Audit Center
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Rewards
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button onClick={onCartClick} className="relative p-2 hover:bg-muted rounded-lg transition-colors group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-pop">
                  {cartCount}
                </span>
              )}
            </button>

            {/* AI Bot Icon */}
            <button onClick={onEcoBotClick} className="p-2 hover:bg-muted rounded-lg transition-colors group">
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Dark Mode Toggle */}
            <button onClick={onToggleDarkMode} className="p-2 hover:bg-muted rounded-lg transition-colors group">
              {isDarkMode ? (
                <Sun className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold hover:scale-110 transition-transform"
              >
                G
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg animate-slide-in-right">
                  <Link href="#" className="block px-4 py-2 hover:bg-muted transition-colors">
                    My Account
                  </Link>
                  <button className="w-full text-left px-4 py-2 hover:bg-muted transition-colors">Logout</button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-slide-in-left">
            <Link href="/dashboard/individual" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Dashboard
            </Link>
            <Link href="/buy-resources" className="block px-4 py-2 bg-primary/10 text-primary rounded-lg">
              Buy Resources
            </Link>
            <Link
              href="/dashboard/industry/green-audit"
              className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors"
            >
              Green Audit Center
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              Rewards
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
