'use client'

import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "../ThemeToggle"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { logout } from "@/lib/features/auth/authSlice"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
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

  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/');
  }

  const navLinks = [
    { href: "/ourStory", label: "Our Story" },
    { href: "/write", label: "Write" },
  ]

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
          {/* Search Box - Sadece giriş yapmış kullanıcılara göster */}
          {user && (
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search Post"
                  className="w-full h-10 pl-10 pr-4 rounded-full border border-border bg-background"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
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
            <div className="flex  items-center gap-4 md:gap-6">
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:text-accent transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
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
                href="/auth/login"
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Sign In
              </Link>
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
                  <div className="flex items-center gap-2 py-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="text-lg font-medium text-foreground hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="text-lg font-medium text-foreground hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    className="w-full rounded-md bg-accent text-white px-4 py-2 text-lg font-medium transition-colors hover:bg-accent/90"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-lg font-medium text-foreground hover:text-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="w-full rounded-md bg-accent text-white px-4 py-2 text-lg font-medium text-center transition-colors hover:bg-accent/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
