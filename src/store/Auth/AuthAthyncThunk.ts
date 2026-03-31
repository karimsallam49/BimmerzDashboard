import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginEndpoint } from "../../Endpoints/AppEndpoints";
import axios from "axios";
import type { SupplierLoginResponseDTO } from "../../DTO/LoginDTO";

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      
  const response = await axios.post(LoginEndpoint, credentials)
        
        return response.data as SupplierLoginResponseDTO
  
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed')
    }
  }
)

