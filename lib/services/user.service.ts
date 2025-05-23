const API_URL = 'http://localhost:5001/api/users'

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export const userService = {
  // Tüm kullanıcıları getir
  async getUsers() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Yetkilendirme token\'ı bulunamadı');
    }

    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kullanıcılar getirilemedi');
      }

      return data.data;
    } catch (error: any) {
      console.error('Kullanıcıları getirme hatası:', error);
      throw new Error(error.message || 'Kullanıcılar getirilemedi');
    }
  },

  // Kullanıcı sil
  async deleteUser(id: string) {
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
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kullanıcı silinemedi');
      }

      return data;
    } catch (error: any) {
      console.error('Kullanıcı silme hatası:', error);
      throw new Error(error.message || 'Kullanıcı silinemedi');
    }
  },

  // Kullanıcı güncelle
  async updateUser(id: string, userData: Partial<User>) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Yetkilendirme token\'ı bulunamadı');
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kullanıcı güncellenemedi');
      }

      return data;
    } catch (error: any) {
      console.error('Kullanıcı güncelleme hatası:', error);
      throw new Error(error.message || 'Kullanıcı güncellenemedi');
    }
  }
}; 