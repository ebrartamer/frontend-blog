"use client"

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'
import Link from 'next/link'
import { tagService } from '@/lib/services/tag.service'
import { toast } from 'sonner'
import { categoryService } from '@/lib/services/category.service'

interface Category {
  _id: string
  name: string
  createdAt: string
}

interface Tag {
  _id: string
  name: string
  createdAt: string
}

export default function Categories() {
  // Kategoriler için state'ler
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)

  // Etiketler için state'ler
  const [tags, setTags] = useState<Tag[]>([])
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [showTagModal, setShowTagModal] = useState(false)

  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state: RootState) => state.auth)

  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false)
  const [showNewTagModal, setShowNewTagModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newTagName, setNewTagName] = useState('')

  // Veri yükleme fonksiyonları
  const fetchData = async () => {
    try {
      const [categoriesData, tagsData] = await Promise.all([
        fetch('http://localhost:5000/api/categories').then(res => res.json()),
        tagService.getTags()
      ]);

      setCategories(categoriesData.data)
      setTags(tagsData)
    } catch (error) {
      toast.error('Veriler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Kategori işlemleri
  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        setCategories(categories.filter(cat => cat._id !== id))
        toast.success('Kategori başarıyla silindi')
      }
    } catch (error) {
      toast.error('Kategori silinirken bir hata oluştu')
    }
  }

  const handleUpdateCategory = async (updatedCategory: Category) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${updatedCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedCategory)
      })

      if (response.ok) {
        setCategories(categories.map(cat => 
          cat._id === updatedCategory._id ? updatedCategory : cat
        ))
        setShowCategoryModal(false)
        setEditingCategory(null)
        toast.success('Kategori başarıyla güncellendi')
      }
    } catch (error) {
      toast.error('Kategori güncellenirken bir hata oluştu')
    }
  }

  // Etiket işlemleri
  const handleDeleteTag = async (id: string) => {
    if (!window.confirm('Bu etiketi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await tagService.deleteTag(id)
      setTags(tags.filter(tag => tag._id !== id))
      toast.success('Etiket başarıyla silindi')
    } catch (error) {
      toast.error('Etiket silinirken bir hata oluştu')
    }
  }

  const handleUpdateTag = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTag) return

    try {
      await tagService.updateTag(editingTag._id, editingTag.name)
      setTags(tags.map(tag => 
        tag._id === editingTag._id ? editingTag : tag
      ))
      setShowTagModal(false)
      setEditingTag(null)
      toast.success('Etiket başarıyla güncellendi')
    } catch (error) {
      toast.error('Etiket güncellenirken bir hata oluştu')
    }
  }

  // Yeni kategori oluştur
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await categoryService.createCategory(newCategoryName)
      toast.success('Kategori başarıyla oluşturuldu')
      setShowNewCategoryModal(false)
      setNewCategoryName('')
      fetchData() // Listeyi yenile
    } catch (error: any) {
      console.error('Error creating category:', error)
      toast.error(error.message)
    }
  }

  // Yeni etiket oluştur
  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await tagService.createTag(newTagName)
      toast.success('Etiket başarıyla oluşturuldu')
      setShowNewTagModal(false)
      setNewTagName('')
      fetchData() // Listeyi yenile
    } catch (error: any) {
      console.error('Error creating tag:', error)
      toast.error(error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex gap-6">
      {/* Kategoriler Bölümü */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Manage all categories from here.
            </p>
          </div>
          <button
            onClick={() => setShowNewCategoryModal(true)}
            className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Category
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="font-medium">{category.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {new Date(category.createdAt).toLocaleDateString('en-US')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingCategory(category)
                            setShowCategoryModal(true)
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        >
                          <Pencil className="w-4 h-4 text-blue-500" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(category._id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Etiketler Bölümü */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tags</h1>
            <p className="text-muted-foreground mt-1">
              Manage all tags from here.
            </p>
          </div>
          <button
            onClick={() => setShowNewTagModal(true)}
            className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Tag
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Tag Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {tags.map((tag) => (
                  <tr key={tag._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-accent" />
                        <span className="font-medium">{tag.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {new Date(tag.createdAt).toLocaleDateString('en-US')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditingTag(tag)
                            setShowTagModal(true)
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        >
                          <Pencil className="w-4 h-4 text-blue-500" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTag(tag._id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Kategori Düzenleme Modalı */}
      {showCategoryModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              handleUpdateCategory(editingCategory)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="px-4 py-2 text-gray-600 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Etiket Düzenleme Modalı */}
      {showTagModal && editingTag && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Tag</h2>
            <form onSubmit={handleUpdateTag}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tag Name</label>
                  <input
                    type="text"
                    value={editingTag.name}
                    onChange={(e) => setEditingTag({...editingTag, name: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTagModal(false)}
                    className="px-4 py-2 text-gray-600 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Yeni Kategori Modalı */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Category</h2>
            <form onSubmit={handleCreateCategory}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter category name"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryModal(false)}
                    className="px-4 py-2 text-gray-600 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-white rounded"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Yeni Etiket Modalı */}
      {showNewTagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Tag</h2>
            <form onSubmit={handleCreateTag}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tag Name</label>
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter tag name"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTagModal(false)}
                    className="px-4 py-2 text-gray-600 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-white rounded"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
