import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/lib/services/auth.service';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state'i localStorage'dan al
const getInitialState = (): AuthState => {
  console.log('Getting initial state...');
  const user = authService.getCurrentUser();
  const token = authService.getToken();
 
  
  return {
    user,
    token,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (data: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('Register thunk data:', data);
      const response = await authService.register(data);
      console.log('Register thunk response:', response);
      return response;
    } catch (error: any) {
      console.error('Register thunk error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('Login thunk data:', data);
      const response = await authService.login(data);
      console.log('Login thunk response:', response);
      return response;
    } catch (error: any) {
      console.error('Login thunk error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    authService.logout();
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('Register fulfilled payload:', action.payload);
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          console.log('User state updated:', state.user);
          // LocalStorage'a kaydet
          localStorage.setItem('token', action.payload.token);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        } else {
          console.error('No user data in register response');
        }
      })
      .addCase(register.rejected, (state, action) => {
        console.error('Register rejected:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login fulfilled payload:', action.payload);
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          console.log('User state updated:', state.user);
        } else {
          console.error('Login fulfilled but no user in payload:', action.payload);
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.error('Login rejected:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;