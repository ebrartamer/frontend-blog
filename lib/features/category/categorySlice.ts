import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Category {
  _id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:5001/api/categories');
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Kategoriler yüklenirken hata oluştu';
      });
  },
});

export default categorySlice.reducer;