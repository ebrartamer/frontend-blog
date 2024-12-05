'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image as ImageIcon, X, Save } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

export default function WritePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    if (!title.trim()) {
      toast.error("Lütfen bir başlık girin")
      return
    }
    if (!content.trim()) {
      toast.error("Lütfen içerik ekleyin")
      return
    }

    setIsLoading(true)
    try {
      // Blog gönderme işlemi burada yapılacak
      toast.success("Blog başarıyla oluşturuldu!")
      router.push("/profile")
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) return null

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

          {/* Sağ Taraf - Görsel */}
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
                      accept="image/*"
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