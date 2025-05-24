import Link from "next/link"

interface FooterSection {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

const footerSections: FooterSection[] = [
  {
    title: "Sitemap",
    links: [
      { label: "About", href: "/about" },
      { label: "Article", href: "/articles" },
      { label: "Cart", href: "/cart" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Delivery policy", href: "/delivery" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
]

export function FooterLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-gray-600 hover:text-gray-900 text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
