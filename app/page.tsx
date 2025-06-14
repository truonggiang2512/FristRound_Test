import { SiteHeader } from "@/components/site-header"
import { ProductSection } from "@/components/product-section"
import { ServiceFeatures } from "@/components/service-features"
import { StoreLocator } from "@/components/store-locator"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductListing } from "@/components/product-listing"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ProductSection />
      <ProductListing />
      <ServiceFeatures />
      <StoreLocator />
      <SiteFooter />
    </main>
  )
}
