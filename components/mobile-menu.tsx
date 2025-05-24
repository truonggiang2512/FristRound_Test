"use client"
import Link from "next/link"
import { X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
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

        <nav className="p-4">
          <div className="space-y-2">
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
          </div>

          <div className="mt-8 pt-8 border-t">
            <Link
              href="/account"
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <span>Tài Khoản</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
