"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut, Settings, User } from "lucide-react"

interface NavbarProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export default function IndustryDashboardNavbar({ isDarkMode, onToggleDarkMode }: NavbarProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("industryName")
    localStorage.removeItem("industryData")
    router.push("/")
  }

  return (
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
            <span className="font-semibold text-lg text-foreground hidden sm:inline">Industry Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard/industry"
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/dashboard/industry/green-audit"
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              Green Audit Center
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="#" className="text-foreground hover:text-primary transition-colors relative group">
              Reports
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link href="/buy-resources" className="text-foreground hover:text-primary transition-colors relative group">
              Buy Resources
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="#" className="text-foreground hover:text-primary transition-colors relative group">
              AI Advisor
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-110 active:scale-95"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-yellow-400 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 1.414l2.12 2.12a1 1 0 001.414-1.414zM2.05 6.464l2.12 2.12a1 1 0 001.414-1.414L3.464 5.05a1 1 0 00-1.414 1.414zM17.95 13.536l-2.12-2.12a1 1 0 00-1.414 1.414l2.12 2.12a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all"
              >
                G
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg animate-fade-in">
                  <Link
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
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
            <Link
              href="/dashboard/industry"
              className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/industry/green-audit"
              className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Green Audit Center
            </Link>
            <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
              Reports
            </a>
            <Link
              href="/buy-resources"
              className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Buy Resources
            </Link>
            <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
              AI Advisor
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
