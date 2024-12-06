'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image as ImageIcon, X, Save } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/lib/store"
import { authService } from "@/lib/services/auth.service"
import { fetchCategories } from "@/lib/features/category/categorySlice"
import { fetchTags } from "@/lib/features/tag/tagSlice"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface User {
  token: string;
  username?: string;
  email?: string;
  _id?: string;
}

export default function WritePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { categories } = useSelector((state: RootState) => state.category)
  const { tags } = useSelector((state: RootState) => state.tag)

  useEffect(() => {
    setIsMounted(true)
    dispatch(fetchCategories())
    dispatch(fetchTags())
  }, [dispatch])

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

  const handleTagSelect = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId])
    } else {
      setSelectedTags(selectedTags.filter(id => id !== tagId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error("Lütfen bir başlık girin")
      return
    }
    if (!content.trim()) {
      toast.error("Lütfen içerik ekleyin")
      return
    }
    if (!image) {
      toast.error("Lütfen bir görsel yükleyin")
      return
    }
    if (!selectedCategory) {
      toast.error("Lütfen bir kategori seçin")
      return
    }
    setIsLoading(true)
    try {
      const formData = new FormData()
      const user = authService.getCurrentUser();
      const token = authService.getToken();

      formData.append('title', title)
      formData.append('content', content)
      formData.append('image', image)
      formData.append('author', user?.id || '')
      formData.append('categoryId', selectedCategory)
      formData.append('tagsId', JSON.stringify(selectedTags))

      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Blog oluşturulamadı')
      }

      const data = await response.json()
      toast.success("Blog başarıyla oluşturuldu!")
      router.push("/profile")
    } catch (error) {
      toast.error("Bir hata oluştu")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) return null
  if (!user) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="container max-w-screen-xl mx-auto px-4 py-8">
        <form id="blog-form" onSubmit={handleSubmit} className="flex gap-8">
          {/* Sol Taraf - Yazı Alanı */}
          <div className="flex-1 space-y-8">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Başlığınızı yazın"
              className="text-5xl font-serif border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40 font-medium"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Hikayenizi anlatmaya başlayın..."
              className="w-full min-h-[calc(100vh-300px)] text-xl font-serif leading-relaxed bg-transparent border-none resize-none focus:outline-none placeholder:text-muted-foreground/40"
            />
          </div>

          {/* Sağ Taraf - Görsel ve Ayarlar */}
          <div className="w-80">
            <div className="sticky top-8 space-y-4">
              <div className="p-6 bg-muted/20 rounded-2xl backdrop-blur-sm">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="aspect-[3/2] rounded-xl overflow-hidden bg-muted">
                      <img
                        src={imagePreview}
                        alt="Blog görseli"
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeImage}
                      className="w-full text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Görseli Kaldır
                    </Button>
                  </div>
                ) : (
                  <label className="block aspect-[3/2] rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 transition-all duration-300 cursor-pointer hover:bg-muted/30">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center h-full">
                      <ImageIcon className="w-6 h-6 text-muted-foreground/40 mb-2" />
                      <p className="text-sm text-muted-foreground/60 text-center px-4 font-medium">
                        Kapak görseli ekle
                      </p>
                    </div>
                  </label>
                )}

                {/* Kategori Seçimi */}
                <div className="mt-4">
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                    placeholder="Kategori seçin"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category: any) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Etiket Seçimi */}
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Etiketler</p>
                  <div className="flex flex-wrap gap-2">
                    {tags?.map((tag: any) => (
                      <Badge 
                        key={tag._id} 
                        variant={selectedTags.includes(tag._id) ? "default" : "secondary"}
                        className="px-2 py-1 cursor-pointer"
                        onClick={() => handleTagSelect(tag._id)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Yayınla Butonu */}
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-medium h-12 rounded-xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Yayınla
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}