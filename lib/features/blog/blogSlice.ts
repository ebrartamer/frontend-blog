import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  categoryId: {
    _id: string;
    name: string;
  };
  tagsId: Array<{
    _id: string;
    name: string;
  }>;
  comments: Array<{
    _id: string;
    content: string;
    author: {
      _id: string;
      username: string;
    };
    createdAt: string;
  }>;
  createdAt: string;
}

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  isLoading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const response = await fetch('http://localhost:5000/api/blogs');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.data;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Blog yüklenirken hata oluştu';
      });
  },
});

export const { setCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;