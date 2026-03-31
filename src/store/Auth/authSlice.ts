import { createSlice} from '@reduxjs/toolkit'
import { loginAsync } from './AuthAthyncThunk'
import type { SupplierDTO } from '../../DTO/LoginDTO'

interface AuthState {
  user: SupplierDTO | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}






const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    checkAuth: (state) => {
      const token = localStorage.getItem('token')
      if (token) {
        state.token = token
        state.isAuthenticated = true
      }
    },
    logout :(state)=>{
      state.token=null
      state.isLoading=false
      state.isAuthenticated=false
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action ) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.data
        state.token = action.payload.token??""
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
    
  },
})

export const { checkAuth, clearError,logout } = authSlice.actions
export default authSlice.reducer
