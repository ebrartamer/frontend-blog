"use client"

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Plus, Pencil, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { blogService } from '@/lib/services/blog.service'
import { toast } from 'sonner'

interface Blog {
  _id: string
  title: string
  content: string
  image: string
  author: {
    _id: string
    username: string
  }
  createdAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getBlogs()
      setBlogs(data)
    } catch (error) {
      console.error('Error loading blogs:', error)
      toast.error('Bloglar yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleDelete = async (blogId: string) => {
    if (!window.confirm('Bu blogu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await blogService.deleteBlog(blogId);
      toast.success('Blog başarıyla silindi');
      fetchBlogs(); // Listeyi yenile
    } catch (error: any) {
      console.error('Blog silme hatası:', error);
      toast.error(error.message || 'Blog silinirken bir hata oluştu');
    }
  };

  const isAdmin = user?.role === 'admin';
  const canDeleteBlog = (authorId: string) => {
    if (!user) return false;
    return isAdmin || authorId === user.id;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-sans text-primary font-bold">Blog Posts</h1>
          <p className="text-muted-foreground font-sans text-secondary mt-1">
            Manage all your blog posts from here.
          </p>
        </div>
        <Link href="/write">
          <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90">
            <Plus className="w-5 h-5" />
            New Blog
          </button>
        </Link>
      </div>

      {/* Blog List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Blog
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 relative rounded overflow-hidden">
                       
                      </div>
                      <div>
                        <div className="font-medium">{blog.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {blog.content}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{blog.author.username}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {new Date(blog.createdAt).toLocaleDateString('en-US')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {canDeleteBlog(blog.author._id) && (
                        <button 
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
