"use client"

import { useEffect, useState } from 'react'
import Card from '@/components/ui/card'
import { Smartphone, Monitor } from 'lucide-react'
import { toast } from 'sonner'

interface DeviceStats {
  totalVisits: number;
  deviceStats: {
    mobile: {
      count: number;
      percentage: number;
    };
    desktop: {
      count: number;
      percentage: number;
    };
  };
  dailyStats: Array<{
    _id: {
      date: string;
      deviceType: 'mobile' | 'desktop';
    };
    count: number;
  }>;
}

export default function DeviceUsage() {
  const [stats, setStats] = useState<DeviceStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitors/device-stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setStats(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.error('Error fetching device stats:', error);
        toast.error('Cihaz istatistikleri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceStats();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="flex justify-center gap-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">DEVICE USAGE</h2>
      <div className="flex items-center justify-center gap-8">
        {/* Mobile Usage */}
        <div className="text-center">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full border-8 border-blue-500/20">
              <div 
                className="absolute inset-0 rounded-full border-8 border-blue-500"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${stats?.deviceStats.mobile.percentage || 0}%, 0 ${stats?.deviceStats.mobile.percentage || 0}%)`
                }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Smartphone className="w-6 h-6 text-blue-500 mb-1" />
              <div className="text-2xl font-bold">{stats?.deviceStats.mobile.percentage || 0}%</div>
              <div className="text-sm text-muted-foreground">Mobile</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {stats?.deviceStats.mobile.count || 0} visits
          </div>
        </div>

        {/* Desktop Usage */}
        <div className="text-center">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full border-8 border-green-500/20">
              <div 
                className="absolute inset-0 rounded-full border-8 border-green-500"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${stats?.deviceStats.desktop.percentage || 0}%, 0 ${stats?.deviceStats.desktop.percentage || 0}%)`
                }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Monitor className="w-6 h-6 text-green-500 mb-1" />
              <div className="text-2xl font-bold">{stats?.deviceStats.desktop.percentage || 0}%</div>
              <div className="text-sm text-muted-foreground">Desktop</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {stats?.deviceStats.desktop.count || 0} visits
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-center text-muted-foreground">
        Total Visits: {stats?.totalVisits || 0}
      </div>

      {/* Son 7 günlük trend */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Last 7 Days Trend</h3>
        <div className="space-y-2">
          {stats?.dailyStats.map((stat, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {new Date(stat._id.date).toLocaleDateString('tr-TR', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
                {' - '}
                {stat._id.deviceType}
              </span>
              <span className="font-medium">{stat.count} visits</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 