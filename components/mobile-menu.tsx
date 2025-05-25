"use client"
import Link from "next/link"
import { X, ChevronRight, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/contexts/auth-context"
import { useState } from "react"
import { AuthModal } from "@/components/auth/auth-modal"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")

  const handleLogin = () => {
    setAuthModalTab("login")
    setShowAuthModal(true)
    onClose()
  }

  const handleRegister = () => {
    setAuthModalTab("register")
    setShowAuthModal(true)
    onClose()
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

        {/* Menu Panel */}
        <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="p-4">
            {/* Auth Section */}
            {!user ? (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Đăng nhập để trải nghiệm tốt hơn</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleLogin} className="flex-1">
                    <LogIn className="h-4 w-4 mr-2" />
                    Đăng nhập
                  </Button>
                  <Button size="sm" onClick={handleRegister} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Đăng ký
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  Đăng xuất
                </Button>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="space-y-2">
              <Link
                href="/categories"
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={onClose}
              >
                <span>Danh Mục Sản Phẩm</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={onClose}
              >
                <span>Về Chúng Tôi</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/blog"
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={onClose}
              >
                <span>Bài Viết</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/catalog"
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={onClose}
              >
                <span>Catalog</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
                onClick={onClose}
              >
                <span>Liên Hệ</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              {user && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <Link
                      href="/account"
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
                      onClick={onClose}
                    >
                      <span>Tài Khoản</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
                      onClick={onClose}
                    >
                      <span>Đơn Hàng</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} defaultTab={authModalTab} />
    </>
  )
}
