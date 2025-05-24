import type React from "react"
import { Truck, Headphones, RotateCcw } from "lucide-react"

interface ServiceFeature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: ServiceFeature[] = [
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: "Miễn phí vận chuyển",
    description: "Với hóa đơn từ 1 triệu",
  },
  {
    icon: <Headphones className="h-8 w-8 text-blue-600" />,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ CSKH tận tình sẵn sàng lắng nghe và phục vụ tận tâm",
  },
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: "Giao hàng nhanh 2h",
    description: "Trong vòng bán kính 10km nội thành TP HCM",
  },
  {
    icon: <RotateCcw className="h-8 w-8 text-blue-600" />,
    title: "30 ngày đổi trả",
    description: "Hoàn tiền 100% nếu phát sinh lỗi từ NSX hoặc đơn vị vận chuyển",
  },
]

export function ServiceFeatures() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
