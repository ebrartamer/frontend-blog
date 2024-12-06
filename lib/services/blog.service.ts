import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogs'

interface BlogData {
  title: string;
  content: string;
  categoryId: string;
  tagsId: string[];
  author: string;
  image?: File;
}

export const blogService = {
  // Tüm blogları getir
  async getBlogs() {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data.data
  },

  // Blog oluştur
  async createBlog(formData: FormData, token: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    return response.json()
  }
} 