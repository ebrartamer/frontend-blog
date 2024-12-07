"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Heart, MessageSquare, Bookmark, Send, Bold, Italic } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-hot-toast'
import { authService } from '@/lib/services/auth.service'
import ReactMarkdown from 'react-markdown'

export default function BlogDetail() {
  const params = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}`)
        const data = await response.json()
        if (data.success) {
          setBlog(data.data)
        }
      } catch (error) {
        console.error('Error loading blog:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchBlog()
    }

  }, [params.id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = authService.getToken();
 
    if (!user) {
      toast.error('Please login to comment')
      return
    }

    if (!comment.trim()) {
      toast.error('Comment cannot be empty')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: comment
        })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Comment added successfully')
        setComment('')
        const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${params.id}`)
        const blogData = await blogResponse.json()
        if (blogData.success) {
          setBlog(blogData.data)
        }
      } else {
        toast.error(data.message || 'Error adding comment')
      }
    } catch (error) {
      toast.error('Error adding comment')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const handleBoldClick = () => {
    const textarea = document.querySelector('textarea')
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      const before = text.substring(0, start)
      const selection = text.substring(start, end)
      const after = text.substring(end)
      setComment(`${before}**${selection}**${after}`)
    }
  }

  const handleItalicClick = () => {
    const textarea = document.querySelector('textarea')
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      const before = text.substring(0, start)
      const selection = text.substring(start, end)
      const after = text.substring(end)
      setComment(`${before}_${selection}_${after}`)
    }
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h1>
          <p className="text-gray-600">The requested blog post could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto mt-12 px-4  lg:px-24">
      <article className="max-w-4xl mx-auto">
        {/* Blog Title and Meta Info */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">
            {blog.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex justify-center items-center gap-4 my-8">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
              {blog.author?.username?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
              <p className="font-medium text-lg text-primary text-start dark:text-white">
                {blog.author?.username || 'Anonymous Author'}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                
              </div>
            </div>
          </div>
         
        </div>

        {/* Blog Image */}
        <div className="mb-8 rounded-xl overflow-hidden px-12">
          <Image
            src={getImageUrl(blog.image)}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-[400px] object-cover"
            unoptimized
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none px-12">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>

        {/* Tags and Categories */}
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

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
            Comments ({blog.comments?.length || 0})
          </h2>

          {/* Comment Form */}
          {user ? (
            <div className="mb-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <Textarea
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none bg-transparent border-none"
                  rows={4}
                />
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={handleBoldClick}
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 hover:bg-gray-100"
                    >
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleItalicClick}
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 hover:bg-gray-100"
                    >
                      <Italic className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleCommentSubmit}
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500">Please login to comment.</p>
            </div>
          )}
          
          {blog.comments?.length > 0 ? (
            <div className="space-y-6">
              {blog.comments.map((comment: any) => (
                <div
                  key={comment._id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {comment.author?.username?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-primary dark:text-white">
                        {comment.author?.username || 'Anonymous User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <ReactMarkdown>{comment.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </article>
    </main>
  )
} 