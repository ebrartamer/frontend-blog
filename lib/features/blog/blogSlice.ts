import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async () => {
    const response = await fetch('http://localhost:5000/api/blogs');
    const data = await response.json();
    console.log(data)
    if (!response.ok) throw new Error(data.message);
    return data.data;
  }
);

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (data: { title: string; content: string; categoryId: string; tagsId: string[]; author: string; image?: File }) => {
    const response = await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);
    return responseData.data;
  }
);

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, data }: { id: string; data: any }) => {
    const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);
    return responseData.data;
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string) => {
    const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    return id;
  }
);

export const uploadImage = createAsyncThunk(
  'blog/uploadImage',
  async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('http://localhost:5000/api/blogs/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data.imageUrl;
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
        state.error = action.error.message || 'Bloglar yüklenirken hata oluştu';
      })
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
        state.error = action.error.message || 'Blog oluşturulurken hata oluştu';
      })
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
        state.error = action.error.message || 'Blog güncellenirken hata oluştu';
      })
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
        state.error = action.error.message || 'Blog silinirken hata oluştu';
      })
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
        state.error = action.error.message || 'Resim yüklenirken hata oluştu';
      });
  },
});

export const { setCurrentBlog, clearUploadedImage } = blogSlice.actions;
export default blogSlice.reducer;