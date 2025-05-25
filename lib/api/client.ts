const API_BASE_URL = "/api"

export const apiClient = {
  post: async (url: string, data?: any) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // send cookies (optional, if you use cookies)
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      throw new Error(errorBody?.message || `API Error: ${response.status}`)
    }

    return response.json()
  },

  get: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  },
}