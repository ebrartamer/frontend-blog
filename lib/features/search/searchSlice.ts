import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL'ini tanımla
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

interface SearchState {
  results: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0
  }
};

export const searchBlogs = createAsyncThunk(
  'search/searchBlogs',
  async ({ query, category, page = 1, limit = 10 }: {
    query: string;
    category?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axios.get(`${API_URL}/api/search`, {
        params: { 
          query, 
          category, 
          page, 
          limit 
        }
      });

      if (!response.data) {
        throw new Error('Veri alınamadı');
      }

      return response.data;
    } catch (error: any) {
      console.error('Arama hatası:', error);
      throw new Error(error.response?.data?.message || 'Arama sırasında bir hata oluştu');
    }
  }
);



const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer; 