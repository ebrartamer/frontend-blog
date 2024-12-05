"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Heart, MessageSquare, Bookmark } from 'lucide-react'

export default function BlogDetail() {
  const params = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}`)
        const data = await response.json()
        if (data.success) {
          setBlog(data.data)
        }
      } catch (error) {
        console.error('Blog yüklenirken hata oluştu:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getImageUrl = (image?: string) => {
    if (!image) return 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop'
    if (image.startsWith('http')) return image
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`
  }

  if (loading) {
    return (
      <div className="container mx-auto mt-12 px-4 lg:px-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-32 mb-8" />
          <div className="h-64 bg-gray-200 rounded-xl mb-8" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="container mx-auto mt-12 px-4 lg:px-24">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog bulunamadı</h1>
          <p className="text-gray-600">İstediğiniz blog yazısına ulaşılamadı.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto mt-12 px-4  lg:px-24">
      <article className="max-w-4xl mx-auto">
        {/* Blog Başlığı ve Meta Bilgiler */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">
            {blog.title}
          </h1>
          
          {/* Yazar Bilgileri */}
          <div className="flex justify-center items-center gap-4 my-8">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
              {blog.author?.username?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="font-medium text-lg text-primary text-start dark:text-white">
                {blog.author?.username || 'İsimsiz Yazar'}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                
              </div>
            </div>
          </div>
         <div className='flex jlex-row text-primary justify-between border-y border-gray-200 py-2 items-center gap-4'>
                <div className='flex flex-row gap-4'>
                <div className="flex hover:text-red-500 items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{blog.likes?.length || 0} </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{blog.comments?.length || 0} </span>
                </div>
                </div>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
         </div>
        </div>

        {/* Blog Görseli */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <Image
            src={getImageUrl(blog.image)}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover"
            unoptimized
          />
        </div>

        {/* Blog İçeriği */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Etiketler ve Kategoriler */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {blog.categoryId && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {blog.categoryId.name}
              </span>
            )}
            {blog.tagsId?.map((tag: any) => (
              <span
                key={tag._id}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Yorumlar Bölümü */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
            Yorumlar ({blog.comments?.length || 0})
          </h2>
          
          {blog.comments?.length > 0 ? (
            <div className="space-y-6">
              {blog.comments.map((comment: any) => (
                <div
                  key={comment._id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {comment.author?.username?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-primary dark:text-white">
                        {comment.author?.username || 'İsimsiz Kullanıcı'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Henüz yorum yapılmamış. İlk yorumu siz yapın!
            </p>
          )}
        </div>
      </article>
    </main>
  )
} 