import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"

// Hook to get all products
export function useProducts(params?: any) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await apiClient.get("/products", params)
      // Handle both our API format and direct data
      return response.data || response
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to get a single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const response = await apiClient.get(`/products/${id}`)
      return response.data || response
    },
    enabled: !!id,
    retry: 1,
  })
}

// Hook to get featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const response = await apiClient.get("/products", { featured: "true" })
      return response.data || response
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Hook to search products
export function useSearchProducts(searchTerm: string) {
  return useQuery({
    queryKey: ["products", "search", searchTerm],
    queryFn: async () => {
      const response = await apiClient.get("/products", { search: searchTerm })
      return response.data || response
    },
    enabled: searchTerm.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Hook to create a new product
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProduct: any) => {
      const response = await apiClient.post("/products", newProduct)
      return response.data || response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      console.error("Create product error:", error)
    },
  })
}

// Hook to update a product
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/products/${id}`, data)
      return response.data || response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      console.error("Update product error:", error)
    },
  })
}

// Hook to delete a product
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/products/${id}`)
      return response.data || response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      console.error("Delete product error:", error)
    },
  })
}
