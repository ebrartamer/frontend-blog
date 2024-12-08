"use client"

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Plus, Pencil, Trash2, Users, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { blogService } from '@/lib/services/blog.service'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
  comments?: {
    _id: string;
    content: string;
    author: {
      username: string;
    };
    createdAt: string;
  }[];
}

interface Comment {
  _id: string;
  content: string;
  author: {
    username: string;
  };
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedBlogComments, setSelectedBlogComments] = useState<Comment[]>([]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [selectedBlogTitle, setSelectedBlogTitle] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState('');

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

  // Yorumları getir
  const fetchComments = async (blogId: string, blogTitle: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        setSelectedBlogComments(data.data.comments);
        setSelectedBlogTitle(blogTitle);
        setSelectedBlogId(blogId);
        setIsCommentsOpen(true);
      } else {
        toast.error('Yorumlar yüklenirken bir hata oluştu');
      }
    } catch (error) {
      toast.error('Yorumlar yüklenirken bir hata oluştu');
    }
  };

  // Yorumu sil
  const handleDeleteComment = async (blogId: string, commentId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blogId}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        toast.success('Yorum başarıyla silindi');
        // Yorumları güncelle
        setSelectedBlogComments(prev => 
          prev.filter(comment => comment._id !== commentId)
        );
      } else {
        toast.error('Yorum silinirken bir hata oluştu');
      }
    } catch (error) {
      toast.error('Yorum silinirken bir hata oluştu');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                      <Button
                        onClick={() => fetchComments(blog._id, blog.title)}
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-100"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="ml-1 text-xs">{blog.comments?.length || 0}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Yorumlar Dialog */}
      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedBlogTitle} - Yorumlar</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {selectedBlogComments.length > 0 ? (
              selectedBlogComments.map((comment) => (
                <div 
                  key={comment._id} 
                  className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        {comment.author?.username?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {comment.author?.username || 'Anonim'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => handleDeleteComment(selectedBlogId, comment._id)}
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                Henüz yorum yapılmamış
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
