import type React from "react"

interface Offer {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  type: "discount" | "flash"
}

interface PromotionalOffersProps {
  offers: Offer[]
}

export function PromotionalOffers({ offers }: PromotionalOffersProps) {
  return (
    <div className="bg-orange-50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-orange-600">🎁</span>
        <span className="font-medium text-orange-800">Khuyến mại được áp dụng</span>
      </div>

      <p className="text-sm text-gray-600 mb-3">Áp dụng 1 trong các khuyến mại:</p>

      <div className="space-y-2">
        {offers.map((offer) => (
          <div key={offer.id} className="flex items-center space-x-3 p-2 bg-white rounded border">
            <div className={`p-1 rounded ${offer.type === "flash" ? "bg-red-100" : "bg-blue-100"}`}>{offer.icon}</div>
            <div>
              <div className="font-medium text-sm">{offer.title}</div>
              <div className="text-xs text-gray-600">{offer.description}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-3">
        Lưu ý: đơn hàng sau 21:00 sẽ kiểm sẽ giao từ 8:00 sáng mai. Hoặc Quý khách có thể{" "}
        <a href="#" className="text-blue-600 underline">
          Tìm nhà thuốc có hàng gần nhất
        </a>
      </p>
    </div>
  )
}
