"use client"

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '@/components/ui/card'
import { toast } from 'sonner'

interface VisitorStats {
  last24Hours: number;
  last7Days: number;
  totalUniqueVisitors: number;
  popularPages: Array<{
    _id: string;
    count: number;
  }>;
}

interface ChartData {
  name: string;
  value: number;
}

export default function DashboardChart() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitors/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setStats(data.data);
          
          // Chart verilerini hazırla
          const chartData: ChartData[] = [
            {
              name: 'Last 24h',
              value: data.data.last24Hours
            },
            {
              name: 'Last 7d',
              value: data.data.last7Days
            },
            {
              name: 'Total Unique',
              value: data.data.totalUniqueVisitors
            }
          ];

          // Popüler sayfaları ekle - uploads klasörünü filtrele
          data.data.popularPages
            .filter((page: { _id: string }) => !page._id.includes('/uploads/')) // uploads klasörünü filtrele
            .forEach((page: { _id: string; count: number }) => {
              chartData.push({
                name: page._id.split('/').pop() || 'Home', // URL'nin son kısmını al veya Home göster
                value: page.count
              });
            });

          setChartData(chartData);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.error('Error fetching visitor stats:', error);
        toast.error('Ziyaretçi istatistikleri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorStats();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[300px] bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">SITE VISITORS</h2>
        <div className="text-sm text-muted-foreground">
          Total Unique Visitors: {stats?.totalUniqueVisitors.toLocaleString()}
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#4ade80" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Popüler Sayfalar */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Popular Pages</h3>
        <div className="space-y-2">
          {stats?.popularPages
            .filter(page => !page._id.includes('/uploads/')) // Image URL'lerini filtrele
            .map((page, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {page._id === '/' ? 'Home' : page._id.split('/').pop()}
                </span>
                <span className="font-medium">{page.count} views</span>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
} 