"use client"

import { BookOpen, Users, Heart, Eye } from 'lucide-react'
import Card from '@/components/ui/card'

const stats = [
  {
    title: "Followers",
    value: "18,356",
    icon: Users,
    color: "text-[#EC3263]",
    backgroundColor: "bg-[#EC3263]/10" 
  },
  {
    title: "Posts",
    value: "248",
    icon: BookOpen,
    color: "text-[#00AEB8]",
    backgroundColor: "bg-[#00AEB8]/10"
  },
  {
    title: "Likes", 
    value: "22,627",
    icon: Heart,
    color: "text-[#1081E8]",
    backgroundColor: "bg-[#1081E8]/10"
  },
  {
    title: "Views",
    value: "427k",
    icon: Eye,
    color: "text-[#FF8700]",
    backgroundColor: "bg-[#FF8700]/10"
  }
]

export default function DashboardStats() {
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
  )
}