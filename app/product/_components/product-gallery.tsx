"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImage {
  id: string
  src: string
  alt: string
}

interface ProductGalleryProps {
  images: ProductImage[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Image
          src={images[selectedImageIndex]?.src || "/placeholder.svg"}
          alt={images[selectedImageIndex]?.alt || "Product image"}
          fill
          className="object-contain p-4"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImageIndex(index)}
            className={`aspect-square rounded-lg border-2 overflow-hidden ${index === selectedImageIndex ? "border-blue-500" : "border-gray-200"
              }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={100}
              height={100}
              className="w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center">Màu mã sản phẩm có thể thay đổi theo lô hàng</p>
    </div>
  )
}
