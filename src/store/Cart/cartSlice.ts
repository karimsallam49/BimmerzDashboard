import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: number
  name: string
  sku: string
  image_url: string | null
  price: number
  quantity: number
  category_id?: number
  category_name?: string
}

interface CartState {
  items: CartItem[]
  totalQuantity: number
  totalAmount: number
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter(item => item.id !== action.payload)
        }
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
