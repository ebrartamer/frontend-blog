import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Tag {
  _id: string;
  name: string;
}

interface TagState {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TagState = {
  tags: [],
  isLoading: false,
  error: null,
};

export const fetchTags = createAsyncThunk('tag/fetchTags', async () => {
  const response = await fetch('http://localhost:5000/api/tags');
  const data = await response.json();
  console.log(" TAGS ",data)
  if (!response.ok) throw new Error(data.message);
  return data.data;
});

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Etiketler yüklenirken hata oluştu';
      });
  },
});

export default tagSlice.reducer;