import axios from 'axios';
import { authService } from './auth.service';

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
  },

  // Blog sil
  deleteBlog: async (id: string) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Yetkilendirme token\'ı bulunamadı');
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Blog silme işlemi başarısız');
      }

      return data;
    } catch (error: any) {
      console.error('Blog silme hatası:', error);
      if (error.message.includes('Token')) {
        throw new Error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
      }
      throw new Error(error.message || 'Blog silme işlemi başarısız');
    }
  },

  // Blog beğenme/beğenmekten vazgeçme
  async toggleLike(blogId: string) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Yetkilendirme token\'ı bulunamadı');
    }

    try {
        const response = await fetch(`${API_URL}/${blogId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Blog beğenme işlemi başarısız');
    }
  },

  // Blog beğeni durumunu kontrol et
  async checkLikeStatus(blogId: string) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('Yetkilendirme token\'ı bulunamadı');
    }

    try {
        const response = await fetch(`${API_URL}/${blogId}/like`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error: any) {
        throw new Error(error.message || 'Beğeni durumu kontrol edilemedi');
    }
  }
} 