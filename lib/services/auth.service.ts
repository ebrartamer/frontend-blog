import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message?: string;
}

// Axios instance oluştur
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  async register(data: RegisterData) {
    try {
      const response = await api.post<AuthResponse>('/api/users/register', data);
      console.log('Register response:', response.data);
      
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return {
        user: response.data.data.user,
        token: response.data.data.token
      };
    } catch (error: any) {
      console.error('Register error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Kayıt sırasında bir hata oluştu' };
    }
  },

  async login(data: LoginData) {
    try {
      // Request detaylarını logla
      console.log('Login request:', {
        url: `${API_URL}/api/users/login`,
        data: data
      });

      // Backend'e istek at
      const response = await axios.post<AuthResponse>(`${API_URL}/api/users/login`, data);

      // Response detaylarını logla
      console.log('Login response:', {
        status: response.status,
        data: response.data
      });

      // Response kontrolü
      if (!response.data) {
        throw new Error('Sunucudan yanıt alınamadı');
      }

      // Success kontrolü
      if (!response.data.success) {
        throw new Error(response.data.message || 'Giriş başarısız');
      }

      // Data kontrolü
      if (!response.data.data) {
        throw new Error('Veri alınamadı');
      }

      const { token, user } = response.data.data;

      // Token kontrolü
      if (!token) {
        throw new Error('Token alınamadı');
      }

      // User kontrolü
      if (!user) {
        throw new Error('Kullanıcı bilgileri alınamadı');
      }

      // Bilgileri kaydet
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Başarılı sonucu döndür
      return { user, token };

    } catch (error: any) {
      // Hata detaylarını logla
      console.error('Login error details:', {
        error: error,
        response: error.response?.data,
        status: error.response?.status,
        message: error.message
      });

      // HTTP durum kodlarına göre özel mesajlar
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw { message: 'Geçersiz kullanıcı adı veya şifre' };
          case 401:
            throw { message: 'Kullanıcı adı veya şifre hatalı' };
          case 404:
            throw { message: 'Kullanıcı bulunamadı' };
          case 500:
            throw { message: 'Sunucu hatası' };
          default:
            if (error.response.data?.message) {
              throw { message: error.response.data.message };
            }
            throw { message: 'Giriş sırasında bir hata oluştu' };
        }
      }

      // Backend'den gelen özel hata mesajı
      if (error.message) {
        throw { message: error.message };
      }

      // Genel hata
      throw { message: 'Giriş sırasında bir hata oluştu' };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          return JSON.parse(userStr);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    return null;
  }
}; 