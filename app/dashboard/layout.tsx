"use client"

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardNavbar from '../components/dashboard/DashboardNavbar'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`
          w-64 border-r bg-background transition-all duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed md:relative md:translate-x-0 min-h-screen
        `}
      >
        <Sidebar />
      </aside>

      {/* İçerik Alanı */}
      <main className="flex-1 flex flex-col h-screen overflow-auto">
        {/* Navbar */}
        <DashboardNavbar  toggleSidebar={toggleSidebar} />

        {/* Ana İçerik */}
        <div className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
