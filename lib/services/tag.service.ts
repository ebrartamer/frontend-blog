const API_URL = 'http://localhost:5001/api/tags'

interface Tag {
  _id: string;
  name: string;
  createdAt: string;
}

export const tagService = {
  // Tüm etiketleri getir
  async getTags() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      throw new Error(error.message || 'Etiketler getirilemedi');
    }
  },

  // Etiket sil
  async deleteTag(id: string) {
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
        throw new Error(data.message || 'Etiket silinemedi');
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Etiket silinemedi');
    }
  },

  // Etiket güncelle
  async updateTag(id: string, name: string) {
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
        body: JSON.stringify({ name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Etiket güncellenemedi');
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Etiket güncellenemedi');
    }
  },

  // Yeni etiket oluştur
  async createTag(name: string) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Yetkilendirme token\'ı bulunamadı');
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Etiket oluşturulamadı');
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Etiket oluşturulamadı');
    }
  }
}; 