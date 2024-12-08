"use client"

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Plus, Pencil, Trash2, Shield } from 'lucide-react'
import Link from 'next/link'
import { userService } from '@/lib/services/user.service'
import { toast } from 'sonner'

interface User {
  _id: string
  username: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)
  const { user: currentUser } = useSelector((state: RootState) => state.auth)

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers()
      setUsers(data)
    } catch (error: any) {
      console.error('Kullanıcılar yüklenirken hata:', error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await userService.deleteUser(id)
      toast.success('Kullanıcı başarıyla silindi')
      fetchUsers() // Listeyi yenile
    } catch (error: any) {
      console.error('Kullanıcı silinirken hata:', error)
      toast.error(error.message)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowModal(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      await userService.updateUser(editingUser._id, {
        username: editingUser.username,
        email: editingUser.email,
        role: editingUser.role
      })
      
      toast.success('Kullanıcı başarıyla güncellendi')
      setShowModal(false)
      fetchUsers() // Listeyi yenile
    } catch (error: any) {
      console.error('Kullanıcı güncellenirken hata:', error)
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-sans text-primary font-bold">Users</h1>
          <p className="text-muted-foreground font-sans text-secondary mt-1">
            Manage all users from here.
          </p>
        </div>
        
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
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
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString('en-US')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                      >
                        <Pencil className="w-4 h-4 text-blue-500" />
                      </button>
                      {currentUser?.role === 'admin' && user._id !== currentUser.id && (
                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
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

      {/* Edit Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                {currentUser?.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value as 'user' | 'admin'})}
                      className="w-full p-2 border rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
    </div>
  )
}
