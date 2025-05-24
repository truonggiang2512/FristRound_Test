"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart-item"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import {
  selectCartItems,
  selectCartTotalItems,
  selectShowCartDropdown,
  removeFromCart,
  setShowCartDropdown,
} from "@/lib/redux/slices/cartSlice"

interface CartDropdownProps {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function CartDropdown({ onMouseEnter, onMouseLeave }: CartDropdownProps) {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const totalItems = useAppSelector(selectCartTotalItems)
  const showCartDropdown = useAppSelector(selectShowCartDropdown)

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  if (!showCartDropdown) return null

  return (
    <div
      className="absolute top-full right-0 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 mt-2 animate-fadeIn"
      onMouseEnter={onMouseEnter || (() => dispatch(setShowCartDropdown(true)))}
      onMouseLeave={onMouseLeave || (() => dispatch(setShowCartDropdown(false)))}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Giỏ hàng</h3>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {items.length > 0 ? (
          <div className="px-4 py-2">
            {items.map((item) => (
              <CartItem key={item.id} {...item} onRemove={handleRemoveItem} />
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500">
            <p>Giỏ hàng của bạn đang trống</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{totalItems} sản phẩm</span>
            <Link href="/cart">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">Xem giỏ hàng</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
