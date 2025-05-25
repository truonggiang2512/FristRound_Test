const API_BASE_URL = "/api"

type Params = Record<string, any>

const buildQueryString = (params?: Params) => {
  if (!params) return ""
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value))
    }
  })
  return `?${query.toString()}`
}

export const apiClient = {
  get: async (url: string, params?: Params) => {
    const queryString = buildQueryString(params)
    const response = await fetch(`${API_BASE_URL}${url}${queryString}`, {
      credentials: "include",
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      throw new Error(errorBody?.message || `API Error: ${response.status}`)
    }
    return response.json()
  },

  post: async (url: string, data?: any) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      throw new Error(errorBody?.message || `API Error: ${response.status}`)
    }

    return response.json()
  },
}
