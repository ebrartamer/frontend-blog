'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Bell, Search, Menu } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  toggleSidebar: () => void
}

export default function DashboardNavbar({ toggleSidebar }: Props) {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <nav className="h-16 border-b bg-background/95 backdrop-blur px-2 supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center px-4 gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Mobil Menü Butonu */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Arama */}
          <div className="max-w-md w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-9 pr-4 py-2 rounded-md bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>
        </div>

        {/* Sağ Menü */}
        <div className="flex items-center gap-6">
          {/* Bildirimler */}
          <Button variant="ghost" size="icon" className="relative hover:bg-accent/20">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-background" />
          </Button>

          {/* Kullanıcı Menüsü */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-accent/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-lg">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="font-medium text-sm">
                    {user?.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Admin
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}