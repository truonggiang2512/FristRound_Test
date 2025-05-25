import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/lib/redux/providers"
import { AuthProvider } from "@/lib/contexts/auth-context"
import { QueryProvider } from "@/lib/providers/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SUNFIL - Genuine Filter",
  description: "Quality filters for all your needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <Providers>
              <AuthProvider>{children}</AuthProvider>
            </Providers>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
