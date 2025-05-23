const API_URL = 'http://localhost:5001/api/stats';

interface DashboardStats {
  followers: number;
  posts: number;
  likes: number;
  views: number;
  monthlyStats: {
    month: number;
    year: number;
    views: number;
  }[];
}

export const statsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Yetkilendirme token\'ı bulunamadı');
    }

    try {
      const response = await fetch(`${API_URL}/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'İstatistikler getirilemedi');
      }

      return data.data;
    } catch (error: any) {
      throw new Error(error.message || 'İstatistikler getirilemedi');
    }
  }
}; 