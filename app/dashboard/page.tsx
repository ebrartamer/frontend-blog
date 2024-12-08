"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

import DeviceUsage from '@/components/dashboard/DeviceUsage'
import RecentPosts from '@/components/dashboard/RecentPosts'
import DashboardStats from '../components/dashboard/DashboardStats'
import DashboardChart from '../components/dashboard/DashboardChart'

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-primary font-sans font-bold">
          Welcome, {user?.username}!
        </h1>
        <p className="text-muted-foreground font-sans text-secondary mt-1">
          Here are your dashboard statistics and recent activities.
        </p>
      </div>

      <DashboardStats />
      <DashboardChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       
        <RecentPosts />
        <DeviceUsage />
      </div>

      
    </div>
  )
}
