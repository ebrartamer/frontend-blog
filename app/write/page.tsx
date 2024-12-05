'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { uploadImage, createBlog, clearUploadedImage } from '@/lib/features/blog/blogSlice'
import { fetchCategories } from '@/lib/features/category/categorySlice'
import { fetchTags } from '@/lib/features/tag/tagSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { ImagePlus, Loader2 } from 'lucide-react'

export default function WritePage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  
  const { isLoading: blogLoading, uploadedImageUrl, error: blogError } = useSelector((state: RootState) => state.blog)
  const { categories } = useSelector((state: RootState) => state.category)
  const { tags } = useSelector((state: RootState) => state.tag)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    tagsId: [] as string[],
    image: null as File | null,
  })

  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchTags())
    return () => {
      dispatch(clearUploadedImage())
    }
  }, [dispatch])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Dosya boyutu 5MB\'dan küçük olmalıdır')
        return
      }

      // Dosya tipi kontrolü
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        toast.error('Sadece JPEG, JPG ve PNG dosyaları yüklenebilir')
        return
      }

      setFormData(prev => ({ ...prev, image: file }))
      
      // Önizleme için
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.categoryId) {
      toast.error('Lütfen gerekli alanları doldurun')
      return
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const result = await dispatch(createBlog({ 
        ...formData,
        author: user.id,
        image: formData.image || undefined 
      })).unwrap()
      toast.success('Blog başarıyla oluşturuldu')
      router.push(`/blog/${result._id}`)
    } catch (error: any) {
      toast.error(error.message || 'Blog oluşturulurken bir hata oluştu')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Yeni Blog Yazısı</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Başlık</label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Blog başlığı"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">İçerik</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Blog içeriği"
            className="w-full min-h-[200px] p-3 rounded-md border border-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kategori</label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            className="w-full p-2 rounded-md border border-input"
          >
            <option value="">Kategori seçin</option>
            {categories?.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Etiketler</label>
          <select
            multiple
            value={formData.tagsId}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value)
              setFormData(prev => ({ ...prev, tagsId: values }))
            }}
            className="w-full p-2 rounded-md border border-input"
          >
            {tags?.map((tag: any) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">Birden fazla seçim için Ctrl/Cmd tuşunu kullanın</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Görsel</label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
              className="flex items-center gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              Görsel Seç
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={blogLoading}
          className="w-full"
        >
          {blogLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Yükleniyor...
            </>
          ) : (
            'Blog Yayınla'
          )}
        </Button>
      </form>
    </div>
  )
} 