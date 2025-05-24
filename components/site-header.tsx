"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Camera, ShoppingCart, User, Clock, Truck, RotateCcw, Menu, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { selectCartTotalItems, setShowCartDropdown } from "@/lib/redux/slices/cartSlice"
import { MegaMenu } from "@/components/mega-menu"
import { CartDropdown } from "@/components/cart-dropdown"
import { MobileMenu } from "./mobile-menu"

export function SiteHeader() {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const totalItems = useAppSelector(selectCartTotalItems)

  return (
    <header className="w-full relative">
      {/* Top banner with gradient - Hidden on mobile */}
      <div className="hidden md:block w-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm">Nhập mã NEWBIE giảm ngay 10% cho lần đầu mua hàng</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-sm">Hotline: 0283 760 7687</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">Tải ứng dụng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden bg-gradient-to-r from-blue-600 to-cyan-400 text-white">
        <div className="flex items-center justify-between p-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Mobile Logo */}
          <Link href="/" className="flex-1 flex justify-center">
            <div className="text-center">
              <div className="text-lg font-bold">NHÀ THUỐC</div>
              <div className="text-xs">FPT Retail</div>
              <div className="text-sm font-semibold">LONG CHÂU</div>
            </div>
          </Link>

          {/* Mobile Cart */}
          <div className="relative" onTouchStart={() => dispatch(setShowCartDropdown(true))}>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Freeship qua ứng dụng"
              className="w-full rounded-full border-0 bg-white pl-4 pr-20 py-3 text-gray-900 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-2 flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                <Mic className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                <Camera className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-[180px] h-[60px]">
              <Image
                src="/logo_sunfil1.png"
                alt="SUNFIL Logo"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Tìm sản phẩm"
                className="w-full rounded-full border border-gray-300 pl-4 pr-12 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" size="icon" className="absolute right-12">
                <Camera className="h-5 w-5 text-gray-500" />
              </Button>
              <Button className="absolute right-0 rounded-r-full bg-blue-500 hover:bg-blue-600">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6">
            {/* Language */}
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src="/ico-country-c-vietnam.png"
                  alt="Vietnam Flag"
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">VI</span>
            </div>

            {/* Cart */}
            <div
              className="relative"
              onMouseEnter={() => dispatch(setShowCartDropdown(true))}
              onMouseLeave={() => dispatch(setShowCartDropdown(false))}
            >
              <Link href="/cart" className="flex gap-1 items-center">
                <ShoppingCart className="h-6 w-6" />
                <span className="text-sm">Giỏ hàng</span>
                {totalItems > 0 && (
                  <div className="absolute -top-4 right-14 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </div>
                )}
              </Link>
              <CartDropdown
                onMouseEnter={() => dispatch(setShowCartDropdown(true))}
                onMouseLeave={() => dispatch(setShowCartDropdown(false))}
              />
            </div>

            {/* Account */}
            <div>
              <Link href="/account" className="flex gap-1 items-center">
                <User className="h-6 w-6" />
                <span className="text-sm">Tài khoản</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-b border-gray-200 relative">
          <div className="mx-auto flex flex-col md:flex-row flex-wrap md:items-center px-4 py-2 gap-y-4">
            {/* Navigation Links + MegaMenu */}
            <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 flex-1">
              <div
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <Button variant="ghost" className="flex items-center gap-2 py-2 px-4 text-base font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                  Danh Mục Sản Phẩm
                </Button>
              </div>
              <Link href="/about" className="py-2 text-base px-4">
                Về Chúng Tôi
              </Link>
              <Link href="/blog" className="py-2 text-base px-4">
                Bài Viết
              </Link>
              <Link href="/catalog" className="py-2 text-base px-4">
                Catalog
              </Link>
              <Link href="/contact" className="py-2 text-base px-4">
                Liên Hệ
              </Link>
            </div>

            {/* Support Info Items */}
            <div className="flex flex-col md:flex-row md:space-x-6 gap-y-2 md:gap-y-0 md:justify-end mt-2 md:mt-0">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Hỗ trợ 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Miễn Phí Vận Chuyển</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Giao Hàng Nhanh 2h</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <span className="text-sm">30 Ngày Đổi Trả</span>
              </div>
            </div>
          </div>

          {/* Mega Menu */}
          <MegaMenu
            isVisible={showMegaMenu}
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          />
        </nav>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </header>
  )
}
