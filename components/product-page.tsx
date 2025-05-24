import { SiteHeader } from "@/components/site-header"
import { ProductListing } from "@/components/product-listing"
import { ServiceFeatures } from "@/components/service-features"
import { StoreLocator } from "@/components/store-locator"
import { SiteFooter } from "@/components/site-footer"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProductListing />
    </main>
  )
}
