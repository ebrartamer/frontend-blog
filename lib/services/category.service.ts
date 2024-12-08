const API_URL = 'http://localhost:5000/api/categories'

interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

export const categoryService = {
  // Tüm kategorileri getir
  async getCategories() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      throw new Error(error.message || 'Kategoriler getirilemedi');
    }
  },

  // Yeni kategori oluştur
  async createCategory(name: string) {
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
        throw new Error(data.message || 'Kategori oluşturulamadı');
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Kategori oluşturulamadı');
    }
  }
}; 