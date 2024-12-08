"use client"

import Card from '@/components/ui/card'

const recentBlogs = [
  {
    title: "Your Rooftop Garden Could Be a Solar",
    date: "16 Nov 2021",
    category: "Science",
    comments: "136 Comments"
  },
  {
    title: "Looking for Alien Life? Seek Out Alien Tech",
    date: "27 Nov 2021",
    category: "Ideas",
    comments: "108 Comments"
  },
  {
    title: "Why I Love to Scrounge in Video",
    date: "29 Nov 2021",
    category: "Games",
    comments: "48 Comment"
  }
]

export default function RecentPosts() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <select className="border rounded-md p-1">
          <option>This Month</option>
        </select>
      </div>
      <div className="space-y-4">
        {recentBlogs.map((blog, index) => (
          <div key={index} className="flex items-center gap-4 border-b pb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
            <div className="flex-1">
              <h3 className="font-medium">{blog.title}</h3>
              <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                <span>{blog.date}</span>
                <span className="text-blue-500">{blog.category}</span>
                <span>{blog.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
} 