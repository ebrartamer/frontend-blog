import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { blogService } from '@/lib/services/blog.service';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
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
  uploadedImageUrl: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  isLoading: false,
  error: null,
  uploadedImageUrl: null,
};

export const uploadImage = createAsyncThunk(
  'blog/uploadImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await blogService.uploadImage(file);
      return response.data.imageUrl;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (data: { title: string; content: string; categoryId: string; tagsId: string[]; author: string; image?: File }, { rejectWithValue }) => {
    try {
      const response = await blogService.createBlog(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogService.getBlogs();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await blogService.updateBlog(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string, { rejectWithValue }) => {
    try {
      await blogService.deleteBlog(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },
    clearUploadedImage: (state) => {
      state.uploadedImageUrl = null;
    },
  },
  extraReducers: (builder) => {
    // Upload Image
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadedImageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Blog
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Blogs
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
        state.error = action.payload as string;
      });

    // Update Blog
    builder
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete Blog
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentBlog, clearUploadedImage } = blogSlice.actions;
export default blogSlice.reducer;