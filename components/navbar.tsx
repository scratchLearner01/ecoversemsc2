"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export default function Navbar({ isDarkMode, onToggleDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserTypeModal, setShowUserTypeModal] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer hover:scale-102 transition-transform duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-semibold text-lg text-foreground hidden sm:inline">EcoVerse</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors relative group">
                Impact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <Link
                href="/buy-resources"
                className="text-foreground hover:text-primary transition-colors relative group"
              >
                Buy Resources
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/industry" className="text-foreground hover:text-primary transition-colors relative group">
                For Industries
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search - Desktop */}
              <div className="hidden lg:flex items-center bg-muted rounded-full px-4 py-2 gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search people / city..."
                  className="bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground w-40"
                />
              </div>

              {/* Search Icon - Mobile */}
              <button className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors">
                <Search className="w-5 h-5 text-foreground" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 animate-spin-slow" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {/* Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-foreground hover:bg-muted">
                    Login
                  </Button>
                </Link>
                <Button
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:scale-103 transition-all duration-200"
                  onClick={() => setShowUserTypeModal(true)}
                >
                  Sign Up
                </Button>
              </div>

              {/* Mobile Menu */}
              <button
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-fade-in">
              <a href="/" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                Home
              </a>
              <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                Impact
              </a>
              <Link
                href="/buy-resources"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Buy Resources
              </Link>
              <Link
                href="/industry"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                For Industries
              </Link>
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Button
                  className="flex-1 bg-primary text-primary-foreground"
                  onClick={() => setShowUserTypeModal(true)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowUserTypeModal(false)}
        >
          <div
            className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl transform scale-95 hover:scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Join EcoVerse</h2>
            <div className="space-y-3">
              <Link href="/signup" className="block">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-medium hover:shadow-lg hover:scale-102 transition-all duration-200">
                  Individual
                </button>
              </Link>
              <Link href="/signup/industry" className="block">
                <button className="w-full py-3 px-4 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-colors duration-200">
                  Industry
                </button>
              </Link>
            </div>
            <button
              onClick={() => setShowUserTypeModal(false)}
              className="w-full mt-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
