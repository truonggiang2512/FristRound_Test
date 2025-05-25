"use client"

import { useState } from "react"
import { User, LogOut, Settings, ShoppingBag, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/contexts/auth-context"
import { AuthModal } from "./auth-modal"

export function UserMenu() {
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogin = () => {
    setAuthModalTab("login")
    setShowAuthModal(true)
    setShowDropdown(false) // Close dropdown if open
  }

  const handleRegister = () => {
    setAuthModalTab("register")
    setShowAuthModal(true)
    setShowDropdown(false) // Close dropdown if open
  }

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
  }

  const handleModalClose = () => {
    setShowAuthModal(false)
  }

  if (!user) {
    return (
      <>
        {/* Desktop buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" onClick={handleLogin} className="text-sm">
            Đăng nhập
          </Button>
          <Button onClick={handleRegister} className="bg-blue-600 hover:bg-blue-700 text-sm">
            Đăng ký
          </Button>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={handleLogin} className="text-xs px-2 py-1">
            Đăng nhập
          </Button>
          <Button size="sm" onClick={handleRegister} className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1">
            Đăng ký
          </Button>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={handleModalClose} defaultTab={authModalTab} />
      </>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-sm hover:text-blue-600 transition-colors"
      >
        <User className="h-5 w-5" />
        <span className="hidden md:block max-w-24 truncate">{user.name || user.email}</span>
        <span className="block md:hidden text-xs">Tài khoản</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-3 border-b border-gray-100">
              <p className="font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>

            <div className="py-2">
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50">
                <User className="h-4 w-4" />
                <span>Thông tin cá nhân</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50">
                <ShoppingBag className="h-4 w-4" />
                <span>Đơn hàng của tôi</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50">
                <Settings className="h-4 w-4" />
                <span>Cài đặt</span>
              </button>
            </div>

            <div className="border-t border-gray-100 py-2">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50 text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
