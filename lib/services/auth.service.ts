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
  message: string;
}

export const authService = {
  async register(data: RegisterData) {
    try {
      console.log('Register request:', {
        url: `${API_URL}/api/users/register`,
        data: data
      });

      const response = await axios.post<AuthResponse>(`${API_URL}/api/users/register`, data);
      console.log('Register response:', response.data);

      // Response kontrolü
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Kayıt başarısız');
      }

      // Backend'den gelen veriyi kontrol et
      const { user, token } = response.data.data;
      

      // Veri kontrolü
      if (!user || !token) {
        console.error('Invalid response format:', response.data);
        throw new Error('Geçersiz sunucu yanıtı');
      }

      // Token ve user bilgilerini kaydet
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Başarılı sonucu döndür
      return { user, token };
    } catch (error: any) {
      console.error('Register error:', error);

      // Backend'den gelen hata mesajı
      if (error.response?.data?.message) {
        throw { message: error.response.data.message };
      }

      // HTTP durum kodlarına göre özel mesajlar
      if (error.response?.status) {
        switch (error.response.status) {
          case 400:
            throw { message: 'Geçersiz kayıt bilgileri' };
          case 409:
            throw { message: 'Bu kullanıcı adı veya email zaten kullanımda' };
          case 422:
            throw { message: 'Eksik veya hatalı bilgi' };
          case 500:
            throw { message: 'Sunucu hatası' };
          default:
            throw { message: 'Kayıt sırasında bir hata oluştu' };
        }
      }

      throw { message: error.message || 'Kayıt sırasında bir hata oluştu' };
    }
  },

  async login(data: LoginData) {
    try {
      console.log('Login request:', {
        url: `${API_URL}/api/users/login`,
        data: data
      });

      const response = await axios.post<AuthResponse>(`${API_URL}/api/users/login`, data);
      console.log('Login response:', response.data);

      // Backend'den gelen veriyi kontrol et
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Giriş başarısız');
      }

      const { user, token } = response.data.data;

      if (!user || !token) {
        console.error('Invalid response format:', response.data);
        throw new Error('Geçersiz giriş yanıtı');
      }

      // Token ve user bilgilerini kaydet
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { user, token };
    } catch (error: any) {
      console.error('Login error:', error);

      // Backend'den gelen hata mesajı
      if (error.response?.data?.message) {
        throw { message: error.response.data.message };
      }

      // HTTP durum kodlarına göre özel mesajlar
      if (error.response?.status) {
        switch (error.response.status) {
          case 401:
            throw { message: 'Kullanıcı adı veya şifre hatalı' };
          case 404:
            throw { message: 'Kullanıcı bulunamadı' };
          case 500:
            throw { message: 'Sunucu hatası' };
          default:
            throw { message: 'Giriş sırasında bir hata oluştu' };
        }
      }

      throw { message: error.message || 'Giriş sırasında bir hata oluştu' };
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