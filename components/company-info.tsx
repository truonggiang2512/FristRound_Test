import Image from "next/image"

export function CompanyInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 uppercase">
        VIET HUNG AUTO PRODUCTION TRADING JOINT STOCK COMPANY
      </h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">Tax code:</span> 0305094228
        </p>
        <p>
          <span className="font-medium">Address:</span> 13 Nghia Thuc, Ward 05, District 5, Ho Chi Minh City, Viet Nam.
        </p>
        <p>
          <span className="font-medium">Phone number:</span> 0283 760 7607
        </p>
        <p>
          <span className="font-medium">Opening hour:</span> 09:00 - 22:00 from Mon - Fri
        </p>
      </div>
      <div className="pt-4">
        <Image
          src="/bo cong thuong.png"
          alt="Certification Badge"
          width={220}
          height={120}
          className="object-contain"
        />
      </div>
    </div>
  )
}
