import { CompanyInfo } from "@/components/company-info"
import { FooterLinks } from "@/components/footer-links"
import { AppDownload } from "@/components/app-download"
import { LanguageSelector } from "@/components/language-selector"
import { BackToTop } from "@/components/back-to-top"

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <CompanyInfo />
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-1">
            <FooterLinks />
          </div>

          {/* App Download */}
          <div className="lg:col-span-1">
            <AppDownload />
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2024 Viet Hung Auto Production Trading Joint Stock Company. All rights reserved.
          </div>
          <LanguageSelector />
        </div>
      </div>

      <BackToTop />
    </footer>
  )
}
