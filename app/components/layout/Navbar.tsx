'use client'

import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "../ThemeToggle"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { logout } from "@/lib/features/auth/authSlice"
import { useTheme } from "next-themes"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { User, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  // Giriş durumuna göre farklı navigasyon linkleri
  const navLinks = user 
    ? [
        { href: "/ourStory", label: "Our Story" },
        { href: "/write", label: "Write" },
      ]
    : [
        { href: "/ourStory", label: "Our Story" },
        { href: "/write", label: "Write" },
        { href: "/auth/login", label: "Sign In" },
      ]
      console.log(user)
      console.log(navLinks)

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  return (
    
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-24">
      <div className="container flex h-16 justify-between items-center">
        {/* Logo ve Sol Menü */}
        <div className="flex flex-1 items-center md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={theme === 'dark' ? '/logoDark.svg' : '/postLogo.svg'}
              alt="Blog Logo"
              width={100}
              height={64}
              priority
            />
          </Link>
        </div>

        {/* Sağ Menü */}
        <div className="flex items-center justify-end gap-4">
          <div className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium font-sans text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />

          {user ? (
            <div className="hidden items-center gap-4 md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 hover:text-accent transition-colors">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/auth/register"
                className="rounded-md bg-accent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/90"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobil Menü Butonu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:bg-accent/10 md:hidden"
          >
            <span className="sr-only">Ana menüyü aç</span>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="container py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-foreground hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-lg font-medium text-foreground hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    className="w-full rounded-md bg-accent text-white px-4 py-2 text-lg font-medium transition-colors hover:bg-accent/90"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/register"
                  className="w-full rounded-md bg-accent text-white px-4 py-2 text-lg font-medium text-center transition-colors hover:bg-accent/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
