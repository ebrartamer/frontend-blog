'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Calendar, Edit, Image as ImageIcon, Mail, BookOpen, Heart, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link"
import { useState } from 'react'

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4 font-sans">You need to sign in</h1>
        <Link href="/auth/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Info */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Profile Header */}
            <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
              <div className="absolute -bottom-12 inset-x-0 flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                    <Image
                      src="/assets/users/me.jpeg"
                      alt={user.username}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 p-1.5 bg-accent hover:bg-accent/90 rounded-full shadow-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                    />
                    {isLoading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ImageIcon className="w-3.5 h-3.5 text-white" />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 px-6 pb-6">
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold font-sans text-primary dark:text-white mb-1">{user.username}</h1>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="font-sans text-sm">{user.email}</span>
                </div>
              </div>

              <Link href="/settings" className="block">
                <Button variant="outline" size="sm" className="w-full font-sans">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold font-sans text-primary dark:text-white mb-4">Statistics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span className="font-sans font-medium">Blog Posts</span>
                </div>
                <span className="font-sans font-bold text-accent">0</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-accent" />
                  <span className="font-sans font-medium">Total Likes</span>
                </div>
                <span className="font-sans font-bold text-accent">0</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <span className="font-sans font-medium">Total Comments</span>
                </div>
                <span className="font-sans font-bold text-accent">0</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-6 text-sm font-sans">
              <Calendar className="w-4 h-4" />
              <span>Joined: January 1, 2024</span>
            </div>
          </div>
        </div>

        {/* Right Column - Blog Posts */}
        <div className="w-full lg:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-sans text-primary dark:text-white">My Blog Posts</h2>
            <Link href="/write">
              <Button className="font-sans bg-accent text-white hover:bg-accent/90">
                <Edit className="w-4 h-4 mr-2" />
                Write New Blog
              </Button>
            </Link>
          </div>

          {/* Blog Cards */}
          <div className="space-y-4">
            {/* Example Blog Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6  transition-colors">
              <div className="flex gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-sans text-primary dark:text-white hover:text-accent transition-colors cursor-pointer mb-2">
                    Blog Title
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-sans mb-4 line-clamp-2">
                    Blog description will be here... Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-sans">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>January 1, 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-24 rounded-lg bg-gray-100 dark:bg-gray-700" />
                </div>
              </div>
            </div>

            {/* If No Blog Posts */}
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-sans mb-2">You don't have any blog posts yet.</p>
              <p className="text-gray-500 font-sans">Are you ready to write your first blog post?</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
