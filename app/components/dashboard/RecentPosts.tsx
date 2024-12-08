"use client"

import { useEffect, useState } from 'react'
import Card from '@/components/ui/card'
import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link'

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  author: {
    username: string;
  };
  category: {
    name: string;
  };
  comments: any[];
}

export default function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs?limit=5`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (response.ok) {
          setRecentPosts(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (error: any) {
        console.error('Error fetching recent posts:', error);
        toast.error('Son gönderiler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (image?: string) => {
    if (!image) return '/placeholder.png'
    if (image.startsWith('http')) return image
    return `${process.env.NEXT_PUBLIC_API_URL}/${image}`
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <Link 
          href="/dashboard/blogs" 
          className="text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {recentPosts.slice(0, 3).map((post) => (
          <Link href={`/blog/${post._id}`} key={post._id}>
            <div className="flex items-center gap-4 border-b pb-4 last:border-0 hover:bg-gray-50 transition-colors rounded-lg p-2">
              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-primary truncate hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                  <span>{formatDate(post.createdAt)}</span>
                  <span className="text-blue-500">{post.category?.name || 'Uncategorized'}</span>
                  <span>{post.comments?.length || 0} Comments</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
} 