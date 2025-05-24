"use client"

import { ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CartSummaryProps {
  subtotal: number
  directDiscount: number
  voucherDiscount: number
  savings: number
  total: number
  onCheckout: () => void
}

export function CartSummary({
  subtotal,
  directDiscount,
  voucherDiscount,
  savings,
  total,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      {/* Discount Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
          <span className="text-blue-600 font-medium">Áp dụng ưu đãi để được giảm giá</span>
          <ChevronRight className="h-4 w-4 text-blue-600" />
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tiền</span>
          <span className="font-medium">{subtotal.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Giảm giá trực tiếp</span>
          <span className="text-red-600">-{directDiscount.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">Giảm giá voucher</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </div>
          <span className="text-gray-600">{voucherDiscount}đ</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tiết kiệm được</span>
          <span className="text-orange-600 font-medium">{savings.toLocaleString()}đ</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Thành tiền</span>
          <div className="text-right">
            <div className="text-gray-500 text-sm line-through">{subtotal.toLocaleString()}đ</div>
            <div className="text-blue-600 text-xl font-bold">{total.toLocaleString()}đ</div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium" onClick={onCheckout}>
        Mua hàng
      </Button>

      {/* Terms */}
      <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
        Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
        <Link href="/terms" className="text-blue-600 underline">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link href="/privacy" className="text-blue-600 underline">
          Chính sách xử lý dữ liệu cá nhân
        </Link>{" "}
        của Nhà thuốc FPT Long Châu
      </p>
    </div>
  )
}
