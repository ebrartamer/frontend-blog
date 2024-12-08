"use client"

import { useEffect, useState } from 'react'
import { BookOpen, Users, Heart, Eye } from 'lucide-react'
import Card from '@/components/ui/card'
import { toast } from 'sonner'

interface StatsData {
  totalUsers: number;
  totalPosts: number;
  totalLikes: number;
  totalViews: number;
}

export default function DashboardStats() {
  const [statsData, setStatsData] = useState<StatsData>({
    totalUsers: 0,
    totalPosts: 0,
    totalLikes: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersResponse, blogsResponse, likesResponse, visitorsResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/stats/total-likes`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitors`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        const [usersData, blogsData, likesData, visitorsData] = await Promise.all([
          usersResponse.json(),
          blogsResponse.json(),
          likesResponse.json(),
          visitorsResponse.json()
        ]);

        if (usersResponse.ok && blogsResponse.ok && likesResponse.ok && visitorsResponse.ok) {
          setStatsData({
            totalUsers: usersData.data.length,
            totalPosts: blogsData.data.length,
            totalLikes: likesData.data.totalLikes,
            totalViews: visitorsData.data.totalVisits
          });
        } else {
          throw new Error('Veriler alınırken bir hata oluştu');
        }
      } catch (error: any) {
        console.error('Stats error:', error);
        toast.error('İstatistikler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: statsData.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-[#EC3263]",
      backgroundColor: "bg-[#EC3263]/10" 
    },
    {
      title: "Total Posts",
      value: statsData.totalPosts.toLocaleString(),
      icon: BookOpen,
      color: "text-[#00AEB8]",
      backgroundColor: "bg-[#00AEB8]/10"
    },
    {
      title: "Total Likes",
      value: statsData.totalLikes.toLocaleString(),
      icon: Heart,
      color: "text-[#1081E8]",
      backgroundColor: "bg-[#1081E8]/10"
    },
    {
      title: "Total Views",
      value: statsData.totalViews.toLocaleString(),
      icon: Eye,
      color: "text-[#FF8700]",
      backgroundColor: "bg-[#FF8700]/10"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="p-6">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center gap-4">
            <div className={`${stat.backgroundColor} p-2 rounded-sm`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-primary/80">{stat.title}</p>
              <h3 className="text-2xl font-bold text-primary mt-1">{stat.value}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}