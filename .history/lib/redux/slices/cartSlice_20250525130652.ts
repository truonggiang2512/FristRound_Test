import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/redux/store"

export interface CartProduct {
  id: string
  name: string
  image: string
  price: number
  comparePrice?: number
  quantity: number
  brand?: string
  attributes?: { name: string; value: string }[]
}

interface CartState {
  items: CartProduct[]
  showCartDropdown: boolean
}

const initialState: CartState = {
  items: [],
  showCartDropdown: false,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartProduct, "quantity">>) => {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (existingItemIndex >= 0) {
        // Item already exists, increase quantity
        state.items[existingItemIndex].quantity += 1
      } else {
        // Add new item
        state.items.push({ ...action.payload, quantity: 1 })
      }

      // Show cart dropdown
      state.showCartDropdown = true
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        state.items = state.items.filter((item) => item.id !== id)
        return
      }

      const itemIndex = state.items.findIndex((item) => item.id === id)
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    setShowCartDropdown: (state, action: PayloadAction<boolean>) => {
      state.showCartDropdown = action.payload
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, setShowCartDropdown } = cartSlice.actions

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartTotalItems = (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectShowCartDropdown = (state: RootState) => state.cart.showCartDropdown

export const cartReducer = cartSlice.reducer
