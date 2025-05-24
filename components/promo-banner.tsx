import Image from "next/image"

export function PromoBanner() {
  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div className="bg-blue-600 relative">
        {/* Radial background */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, #1e40af 0%, #2563eb 100%)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
          }}
        />

        {/* Rays effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.1) 0deg 15deg, transparent 15deg 30deg)",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-10">
          {/* Text content */}
          <div className="text-white mb-6 md:mb-0 md:w-1/2">
            <div className="inline-block bg-yellow-300 text-yellow-800 font-bold px-4 py-1 rounded-full mb-4">
              MỚI CỰC HOT!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">TẢI APP NHẬN QUÀ</h2>
            <p className="text-xl mb-2">
              Tích điểm ngay trên app <span className="text-yellow-300 font-bold">SUNFIL1</span>
            </p>
            <p className="text-lg">*100K = 10 điểm</p>
          </div>

          {/* Image content */}
          <div className="md:w-1/2 flex justify-end">
            <div className="relative h-[200px] w-[300px] md:h-[250px] md:w-[400px]">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="Filter products"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
