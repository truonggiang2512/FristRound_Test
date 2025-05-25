"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CartPageItem, CartPageItemProps } from "./_components/cart-page-item"
import { CartSummary } from "./_components/cart-summary"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { selectCartItems, removeFromCart, updateQuantity } from "@/lib/redux/slices/cartSlice"

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(selectCartItems)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(cartItems.map((item) => item.id)))

  // Sample cart items with additional properties for the cart page
  const cartPageItems: CartPageItemProps[] = [
    {
      id: "1",
      name: "Nước Yến Sào Cao Cấp Cho Trẻ Em Nunest Kid Lốc 3+1 (70ml)",
      image: "/placeholder.svg?height=80&width=80",
      price: 105600,
      comparePrice: 132000,
      quantity: 1,
      unit: "Lốc",
      discountInfo: "Giảm ngay 20% áp dụng đến 24/05",
    },
    {
      id: "2",
      name: "Sữa bột Fohepta Vitadairy dinh dưỡng dành cho bệnh nhân gan (400g)",
      image: "/placeholder.svg?height=80&width=80",
      price: 205600,
      comparePrice: 257000,
      quantity: 1,
      unit: "Hộp",
      badge: "Flash sale giá sốc",
      discountInfo: "Giảm ngay 20% khi mua Online áp dụng đến 25/05",
    },
    {
      id: "3",
      name: "Sữa ColosIgG 24h Vitadairy hỗ trợ tăng cường miễn dịch và tiêu hóa (60 gói x 1.5g)",
      image: "/placeholder.svg?height=80&width=80",
      price: 367200,
      comparePrice: 459000,
      quantity: 1,
      unit: "Hộp",
      badge: "Flash sale giá sốc",
      discountInfo: "Giảm ngay 20% khi mua Online áp dụng đến 25/05",
    },
  ]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(cartPageItems.map((item) => item.id)))
    } else {
      setSelectedItems(new Set())
    }
  }

  const handleSelectItem = (id: string, selected: boolean) => {
    const newSelectedItems = new Set(selectedItems)
    if (selected) {
      newSelectedItems.add(id)
    } else {
      newSelectedItems.delete(id)
    }
    setSelectedItems(newSelectedItems)
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleUnitChange = (id: string, unit: string) => {
    // Handle unit change logic here
    console.log(`Unit changed for ${id}: ${unit}`)
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }

  const handleCheckout = () => {
    // Handle checkout logic
    console.log("Proceeding to checkout...")
  }

  // Calculate totals
  const selectedCartItems = cartPageItems.filter((item) => selectedItems.has(item.id))
  const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.comparePrice || item.price) * item.quantity, 0)
  const directDiscount = selectedCartItems.reduce(
    (sum, item) => sum + ((item.comparePrice ? item.comparePrice - item.price : 0) * item.quantity),
    0,
  )
  const voucherDiscount = 0
  const savings = directDiscount + voucherDiscount
  const total = subtotal - savings

  const allSelected = selectedItems.size === cartPageItems.length && cartPageItems.length > 0
  const someSelected = selectedItems.size > 0 && selectedItems.size < cartPageItems.length

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span className="font-medium">Tiếp tục mua sắm</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Select All Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={allSelected}
                    ref={(el: any) => {
                      if (el) el.indeterminate = someSelected
                    }}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="font-medium">Chọn tất cả ({cartPageItems.length})</span>
                </div>
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                  <span>Giá thành</span>
                  <span>Số lượng</span>
                  <span>Đơn vị</span>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            {cartPageItems.map((item) => (
              <CartPageItem
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                comparePrice={item.comparePrice}
                quantity={item.quantity}
                unit={item.unit}
                discount={item.discount}
                badge={item.badge}
                discountInfo={item.discountInfo}
                isSelected={selectedItems.has(item.id)}
                onSelect={handleSelectItem}
                onQuantityChange={handleQuantityChange}
                onUnitChange={handleUnitChange}
                onRemove={handleRemoveItem}
              />
            ))}

            {cartPageItems.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
                <Link href="/">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Tiếp tục mua sắm</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              directDiscount={directDiscount}
              voucherDiscount={voucherDiscount}
              savings={savings}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
