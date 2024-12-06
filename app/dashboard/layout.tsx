"use client"

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Sidebar from '../components/dashboard/Sidebar'
import { RootState } from '@/lib/store'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className={`
          w-64 border-r bg-background transition-all duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed md:static h-screen
        `}
      >
        <Sidebar />
      </aside>

      {/* İçerik Alanı */}
      <main className={`
        flex-1 transition-all duration-300 md:ml-0
      `}>
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center  gap-4">
              {/* Mobil Menü Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-accent/10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isSidebarOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Arama */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Ara..."
                  className="pl-10 pr-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-accent"
                />
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Kullanıcı Profili */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium">{user?.username}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Admin</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-accent/10 overflow-hidden">
                <Image
                  src={user?.avatar || '/default-avatar.png'}
                  alt="Profil"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="p-6 max-w-7xl mx-auto">
          {/* Ana İçerik */}
          {children}
        </div>
      </main>
    </div>
  )
}
