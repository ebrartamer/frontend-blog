"use client"

import { PlusIcon, Calendar, Heart, MessageSquare } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { fetchCategories } from "@/lib/features/category/categorySlice"
import { fetchBlogs } from "@/lib/features/blog/blogSlice"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function MainContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading: categoriesLoading } = useSelector((state: RootState) => state.category);
  const { blogs, isLoading: blogsLoading } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBlogs());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getImageUrl = (image?: string) => {
    if (!image) return '/assets/blog/default.png'
    if (image.startsWith('http')) return image
    return `${process.env.NEXT_PUBLIC_API_URL}/${image}`
  }

  return (
    <main className="container mx-auto mt-12 px-4 lg:px-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol Sütun (8 birim) */}
        <div className="w-full md:w-2/3">
          <div className="w-full">
            <div className="container border-b border-gray-200 mx-auto flex items-center space-x-6 pb-4 px-4">
              {/* "+" Button */}
              <button className="flex items-center justify-center w-8 h-8 hover:bg-blue-100">
                <PlusIcon />
              </button>

              {/* Menu Items */}
              <ul className="flex items-center space-x-6 overflow-x-auto">
                {!categoriesLoading && categories && categories.length > 0 && categories.map((category: any) => (
                  <li key={category.name}>
                    <a
                      href={`/category/${category.name}`}
                      className="text-m font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Blog Listesi */}
          <div className="mt-8 space-y-6">
            {blogsLoading ? (
              // Loading durumu
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
            ) : blogs && blogs.length > 0 ? (
              blogs.map((blog: any) => (
                blog && blog.author && (
                  <Link href={`/blog/${blog._id}`} key={blog._id}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-md transition-all duration-200 my-6">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          {/* Yazar Bilgileri */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                              {blog.author.username?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <div>
                              <p className="font-sans font-medium text-primary dark:text-white">
                                {blog.author.username || 'İsimsiz Yazar'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {blog.createdAt ? formatDate(blog.createdAt) : 'Tarih belirtilmemiş'}
                              </p>
                            </div>
                          </div>

                          {/* Blog İçeriği */}
                          <h3 className="text-xl font-bold font-sans text-primary dark:text-white hover:text-accent transition-colors duration-200 mb-2">
                            {blog.title || 'Başlıksız Blog'}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-sans mb-4 line-clamp-2">
                            {blog.content || 'İçerik bulunmuyor'}
                          </p>

                          {/* Meta Bilgiler */}
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-sans">
                                {blog.createdAt ? formatDate(blog.createdAt) : 'Tarih belirtilmemiş'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              <span className="font-sans">0</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span className="font-sans">{blog.comments?.length || 0}</span>
                            </div>
                          </div>
                        </div>

                        {/* Blog Görseli */}
                        <div className="hidden md:block">
                          <div className="w-40 h-32 rounded-xl overflow-hidden">
                            <Image
                              src={getImageUrl(blog.image)}
                              alt={blog.title || 'Blog görseli'}
                              width={160}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <p className="text-gray-500 font-sans">Henüz blog yazısı bulunmuyor.</p>
              </div>
            )}
          </div>
        </div>

        {/* Border */}
        <div className="hidden md:block w-px bg-border/60 mx-4"></div>

        {/* Sağ Sütun (4 birim) */}
        <div className="w-full md:w-1/3 space-y-8">
          {/* Popüler Yazılar */}
          <div>
            <h2 className="text-xl font-sans text-primary font-bold mb-4">Popüler Yazılar</h2>
            <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl">
              {blogs?.slice(0, 3).map((blog: any) => (
                blog && blog.author && (
                  <Link href={`/blog/${blog._id}`} key={blog._id}>
                    <div className="flex items-center gap-4 group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={getImageUrl(blog.image)}
                          alt={blog.title || 'Blog görseli'}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-sans font-medium text-primary dark:text-white group-hover:text-accent transition-colors duration-200 line-clamp-2">
                          {blog.title || 'Başlıksız Blog'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {blog.createdAt ? formatDate(blog.createdAt) : 'Tarih belirtilmemiş'}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h2 className="text-xl font-sans text-primary font-bold mb-4">Kategoriler</h2>
            <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 p-6 rounded-xl">
              {blogs?.reduce((categories: Set<string>, blog: any) => {
                if (blog?.categoryId?.name) {
                  categories.add(blog.categoryId.name)
                }
                return categories
              }, new Set()).size > 0 ? (
                Array.from(blogs.reduce((categories: Set<string>, blog: any) => {
                  if (blog?.categoryId?.name) {
                    categories.add(blog.categoryId.name)
                  }
                  return categories
                }, new Set())).map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-sans text-gray-600 dark:text-gray-300"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 font-sans">Henüz kategori bulunmuyor.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}   