"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [productCount, setProductCount] = useState(100)

  const handleSeed = async (action: "full" | "products") => {
    setLoading(true)
    setResult(null)

    try {
      const url = new URL("/api/seed", window.location.origin)
      url.searchParams.set("action", action)
      if (action === "products" || action === "full") {
        url.searchParams.set("count", productCount.toString())
      }

      const response = await fetch(url.toString(), {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setResult(data.data)
      } else {
        setResult({ error: data.error })
      }
    } catch (error: any) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Database Seeding</h1>

          <div className="grid gap-6">
            {/* Full Seeding */}
            <Card>
              <CardHeader>
                <CardTitle>Full Database Seeding</CardTitle>
                <CardDescription>Clear all data and create fresh users, categories, and products</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="fullCount" className="text-sm font-medium">
                    Number of products:
                  </label>
                  <Input
                    id="fullCount"
                    type="number"
                    value={productCount}
                    onChange={(e) => setProductCount(Number.parseInt(e.target.value) || 100)}
                    className="w-32"
                    min="10"
                    max="1000"
                  />
                </div>
                <Button onClick={() => handleSeed("full")} disabled={loading} className="w-full">
                  {loading ? "Seeding..." : "Run Full Seeding"}
                </Button>
              </CardContent>
            </Card>

            {/* Add Products */}
            <Card>
              <CardHeader>
                <CardTitle>Add More Products</CardTitle>
                <CardDescription>Add additional products to existing categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="productCount" className="text-sm font-medium">
                    Number of products:
                  </label>
                  <Input
                    id="productCount"
                    type="number"
                    value={productCount}
                    onChange={(e) => setProductCount(Number.parseInt(e.target.value) || 100)}
                    className="w-32"
                    min="10"
                    max="500"
                  />
                </div>
                <Button onClick={() => handleSeed("products")} disabled={loading} className="w-full">
                  {loading ? "Adding Products..." : "Add Products"}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {result.error ? (
                    <div className="text-red-600">
                      <p className="font-medium">Error:</p>
                      <p>{result.error}</p>
                    </div>
                  ) : (
                    <div className="text-green-600">
                      <p className="font-medium mb-2">Success!</p>
                      {result.users && <p>Users created: {result.users}</p>}
                      {result.categories && <p>Categories created: {result.categories}</p>}
                      {result.products && <p>Products created: {result.products}</p>}
                      {result.message && <p className="mt-2 text-gray-600">{result.message}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> admin@sunfil.com
                  </p>
                  <p>
                    <strong>Password:</strong> admin123
                  </p>
                  <p>
                    <strong>Manager Email:</strong> manager@sunfil.com
                  </p>
                  <p>
                    <strong>Manager Password:</strong> manager123
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
