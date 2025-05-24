"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"

interface Product {
  id: string
  name: string
  image: string
  currentPrice: number
  originalPrice: number
  discount: number
  badge?: string
}

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return

    const { scrollWidth, clientWidth } = carouselRef.current
    const scrollAmount = clientWidth
    const maxScroll = scrollWidth - clientWidth

    const newPosition =
      direction === "left"
        ? Math.max(scrollPosition - scrollAmount, 0)
        : Math.min(scrollPosition + scrollAmount, maxScroll)

    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide snap-x scroll-smooth gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[220px] snap-start">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-md z-10"
        onClick={() => scroll("left")}
        disabled={scrollPosition <= 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full shadow-md z-10"
        onClick={() => scroll("right")}
        disabled={
          carouselRef.current
            ? scrollPosition >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth
            : false
        }
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
