interface Specification {
  label: string
  value: string
  link?: string
}

interface ProductSpecificationsProps {
  specifications: Specification[]
}

export function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      {specifications.map((spec, index) => (
        <div key={index} className="flex justify-between items-center py-1">
          <span className="text-gray-600 text-sm">{spec.label}</span>
          <div className="text-right">
            {spec.link ? (
              <a href={spec.link} className="text-blue-600 hover:underline text-sm">
                {spec.value}
              </a>
            ) : (
              <span className="text-gray-900 text-sm font-medium">{spec.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
