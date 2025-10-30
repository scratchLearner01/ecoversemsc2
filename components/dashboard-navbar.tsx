"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Search, Moon, Sun, ShoppingBag, Gift, LogOut, Settings, User } from "lucide-react"

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
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">E</div>
            <span className="hidden sm:inline">EcoVerse</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search people, industries, states..."
                className="pl-10 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/buy-resources">
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 rounded-lg hover:bg-muted">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline">Buy Resources</span>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 rounded-lg">
              <Gift className="w-4 h-4" />
              <span className="hidden md:inline">Redeem Rewards</span>
            </Button>

            <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="rounded-lg">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-primary/10">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-lg">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
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
              className="md:hidden rounded-lg"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border space-y-2">
            <Link href="/buy-resources">
              <Button variant="ghost" className="w-full justify-start gap-2 rounded-lg">
                <ShoppingBag className="w-4 h-4" />
                Buy Resources
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2 rounded-lg">
              <Gift className="w-4 h-4" />
              Redeem Rewards
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
