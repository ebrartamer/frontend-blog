'use client';

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { searchBlogs } from '@/lib/features/search/searchSlice'
import { Calendar, Heart, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const { results, loading, error } = useSelector((state: RootState) => state.search)
  const query = searchParams.get('q')

  useEffect(() => {
    if (query) {
      dispatch(searchBlogs({ 
        query,
        page: 1,
        limit: 10
      }))
    }
  }, [query, dispatch])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const getImageUrl = (image?: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop'
    if (image.startsWith('http')) return image
    return `${process.env.NEXT_PUBLIC_API_URL}/${image}`
  }

  if (loading) return (
    <div className="container mx-auto mt-12 px-4 lg:px-24">
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
              <div className="hidden md:block w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (error) return (
    <div className="container mx-auto mt-12 px-4 lg:px-24">
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
        <p className="text-red-500 font-sans">Error: {error}</p>
      </div>
    </div>
  )

  if (!query) return (
    <div className="container mx-auto mt-12 px-4 lg:px-24">
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
        <p className="text-gray-500 font-sans">Please enter a search term</p>
      </div>
    </div>
  )

  return (
    <main className="container mx-auto mt-12 px-4 lg:px-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column (8 units) */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold mb-6 text-primary dark:text-white">
            Results for &quot;{query}&quot;
          </h1>

          {results.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 font-sans">No results found for your search.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((blog: any) => (
                <Link href={`/blog/${blog.id}`} key={blog.id}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                    <div className="flex gap-6">
                      <div className="flex-1">
                        {/* Blog Content */}
                        <h3 className="text-xl font-bold font-sans text-primary dark:text-white hover:text-accent transition-colors duration-200 mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-sans mb-4 line-clamp-2">
                          {blog.content}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="font-sans">
                              {formatDate(blog.createdAt)}
                            </span>
                          </div>
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex gap-2">
                              {blog.tags.map((tag: string, index: number) => (
                                <span 
                                  key={index} 
                                  className="text-xs bg-accent/10 text-accent px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Highlights */}
                        {blog.highlights && (
                          <div className="mt-4 p-4 bg-accent/5 rounded-lg">
                            {Object.entries(blog.highlights).map(([field, highlights]) => (
                              <div key={field} className="text-sm">
                                <span className="font-semibold capitalize">{field}: </span>
                                {/* @ts-ignore */}
                                {highlights.map((highlight: string, i: number) => (
                                  <span 
                                    key={i}
                                    dangerouslySetInnerHTML={{ __html: highlight }}
                                    className="text-accent"
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Blog Image */}
                      <div className="hidden md:block">
                        <div className="w-40 h-32 rounded-xl overflow-hidden">
                          <Image
                            src={getImageUrl(blog.image)}
                            alt={blog.title}
                            width={160}
                            height={128}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Border */}
        <div className="hidden md:block w-px bg-border/60 mx-4"></div>

        {/* Right Column (4 units) */}
        <div className="w-full md:w-1/3 space-y-8">
          {/* Search Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-sans text-primary dark:text-white font-bold mb-4">
              Search Statistics
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                Found {results.length} results
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Search term: "{query}"
              </p>
            </div>
          </div>

          {/* Related Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-sans text-primary dark:text-white font-bold mb-4">
              Related Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(results.flatMap((blog: any) => blog.tags || []))).map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-sans text-gray-600 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}