import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"

// Hook to get all products with optional filters/sorting/pagination
export function useProducts(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await apiClient.get("/products", params)
      return response.data || response
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to get a single product by ID
export function useProduct(id?: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await apiClient.get(`/products/${id}`)
      return response.data || response
    },
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  })
}
