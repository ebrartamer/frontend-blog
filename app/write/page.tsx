'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image as ImageIcon, X, Save } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

export default function WritePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Blog submission will be handled here
      toast.success("Blog post created successfully!")
      router.push("/profile")
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-8 px-28">
      <div className="container mx-auto px-4 ">
        <h1 className="text-2xl font-bold font-sans text-primary dark:text-white mb-8">
          New Blog Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-6">
            {/* Left Side - Title and Content */}
            <div className="flex-1 space-y-6">
              {/* Blog Title */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold font-sans text-primary dark:text-white mb-4">
                  Blog Title
                </h2>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Write an engaging title..."
                  className="font-sans text-lg"
                />
              </div>

              {/* Blog Content */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold font-sans text-primary dark:text-white mb-4">
                  Blog Content
                </h2>
                <div className="prose prose-lg max-w-none">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content here..."
                    className="w-full min-h-[400px] p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-y font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold font-sans text-primary dark:text-white">
                    Blog Image
                  </h2>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeImage}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {imagePreview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={imagePreview}
                      alt="Blog image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <label className="block w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-accent dark:hover:border-accent transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center h-full">
                      <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                        Click or drag to upload image
                      </p>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar - Publishing Buttons */}
          <div className="bg-transparent p-4 mt-8">
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="font-sans"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="font-sans bg-accent hover:bg-accent/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Publish
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}