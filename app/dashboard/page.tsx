"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import  Card  from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  TrendingUp 
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth)

  const stats = [
    {
      title: "Toplam Blog",
      value: "12",
      icon: BookOpen,
      trend: "+2.5%",
    },
    {
      title: "Toplam Okuyucu",
      value: "2.4K",
      icon: Users,
      trend: "+12%",
    },
    {
      title: "Toplam Yorum",
      value: "45",
      icon: MessageSquare,
      trend: "+5%",
    },
    {
      title: "Görüntülenme",
      value: "8.5K",
      icon: TrendingUp,
      trend: "+18%",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Karşılama Mesajı */}
      <div>
        <h1 className="text-3xl font-bold">
          Hoş Geldin, {user?.username}!
        </h1>
        <p className="text-muted-foreground mt-1">
          İşte dashboard istatistiklerin ve son aktivitelerin.
        </p>
      </div>


      {/* Son Aktiviteler veya Diğer İçerikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buraya diğer dashboard bileşenleri eklenebilir */}
      </div>
    </div>
  )
}
