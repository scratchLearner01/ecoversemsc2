"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Moon, Sun, ShoppingBag, Gift, LogOut, Settings, User, Leaf } from "lucide-react"
import GlobalSearch from "@/components/global-search"

interface DashboardNavbarProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
  userName: string
}

export default function DashboardNavbar({ isDarkMode, onToggleDarkMode, userName }: DashboardNavbarProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  const handleBuyResources = () => {
    router.push("/buy-resources")
  }

  const handleRedeemRewards = () => {
    router.push("/dashboard/individual")
  }

  const handleProfile = () => {
    router.push("/dashboard/individual")
  }

  const handleSettings = () => {
    router.push("/dashboard/individual")
  }

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity"
          >
            <Leaf className="w-8 h-8 text-primary" />
            <span className="hidden sm:inline">EcoVerse</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md">
            <GlobalSearch />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              onClick={handleBuyResources}
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline">Buy Resources</span>
            </Button>

            <Button
              onClick={handleRedeemRewards}
              variant="ghost"
              size="sm"
              className="hidden sm:flex gap-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Gift className="w-4 h-4" />
              <span className="hidden md:inline">Redeem Rewards</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDarkMode}
              className="rounded-lg hover:bg-muted transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-10 h-10 bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-lg">
                <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border space-y-2 animate-slide-in-down">
            <Button
              onClick={handleBuyResources}
              variant="ghost"
              className="w-full justify-start gap-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Resources
            </Button>
            <Button
              onClick={handleRedeemRewards}
              variant="ghost"
              className="w-full justify-start gap-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
            >
              <Gift className="w-4 h-4" />
              Redeem Rewards
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
