import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface BlogData {
  title: string;
  content: string;
  categoryId: string;
  tagsId: string[];
  author: string;
  image?: File;
}

export const blogService = {
  async createBlog(data: BlogData) {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('categoryId', data.categoryId);
      formData.append('author', data.author);
      data.tagsId.forEach(tagId => {
        formData.append('tagsId', tagId);
      });
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axios.post(`${API_URL}/api/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Blog oluşturma hatası:', error);
      throw error.response?.data || { message: 'Blog oluşturulurken bir hata oluştu' };
    }
  },

  async uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Görsel yükleme hatası:', error);
      throw error.response?.data || { message: 'Görsel yüklenirken bir hata oluştu' };
    }
  },

  async getBlogs() {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`);
      return response.data;
    } catch (error: any) {
      console.error('Blog getirme hatası:', error);
      throw error.response?.data || { message: 'Bloglar getirilirken bir hata oluştu' };
    }
  },

  async getBlogById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/api/blogs/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Blog getirme hatası:', error);
      throw error.response?.data || { message: 'Blog getirilirken bir hata oluştu' };
    }
  },

  async updateBlog(id: string, data: Partial<BlogData>) {
    try {
      const formData = new FormData();
      
      if (data.title) formData.append('title', data.title);
      if (data.content) formData.append('content', data.content);
      if (data.categoryId) formData.append('categoryId', data.categoryId);
      if (data.tagsId) {
        data.tagsId.forEach(tagId => {
          formData.append('tagsId', tagId);
        });
      }
      if (data.image) formData.append('image', data.image);

      const response = await axios.put(`${API_URL}/api/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Blog güncelleme hatası:', error);
      throw error.response?.data || { message: 'Blog güncellenirken bir hata oluştu' };
    }
  },

  async deleteBlog(id: string) {
    try {
      const response = await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Blog silme hatası:', error);
      throw error.response?.data || { message: 'Blog silinirken bir hata oluştu' };
    }
  }
}; 