import { MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function StoreLocator() {
  return (
    <div className="bg-blue-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-full p-2">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-medium text-gray-900">Xem hệ thống 99 cửa hàng trên toàn quốc</span>
          </div>
          <Link href="/stores" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
            <span>Xem ngay</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
