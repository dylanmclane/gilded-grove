'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

type Asset = {
  id: string
  name: string
  type: string
  value: string
  location: string
  description?: string
  imageUrl?: string
}

type Inventory = {
  id: string
  name: string
  description?: string
  assets: Asset[]
}

export default function InventoryPage() {
  const router = useRouter()
  const params = useParams()
  const inventoryId = params.id as string

  const [inventory, setInventory] = useState<Inventory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<Asset>>({})
  const [darkMode, setDarkMode] = useState(false)

  const loadInventory = useCallback(async () => {
    try {
      const response = await fetch(`/api/inventories/${inventoryId}`)
      if (response.ok) {
        const data = await response.json()
        setInventory(data)
      } else {
        router.push('/prod/dashboard')
      }
    } catch (error) {
      console.error('Failed to load inventory:', error)
      router.push('/prod/dashboard')
    } finally {
      setIsLoading(false)
    }
  }, [inventoryId, router])

  useEffect(() => {
    if (inventoryId) {
      loadInventory()
    }
  }, [inventoryId, loadInventory])

  useEffect(() => {
    const stored = localStorage.getItem("gg_dark_mode")
    if (stored) setDarkMode(stored === "true")
  }, [])

  useEffect(() => {
    localStorage.setItem("gg_dark_mode", darkMode ? "true" : "false")
  }, [darkMode])

  const handleSaveAsset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.type || !form.value || !form.location) return

    try {
      const response = await fetch(`/api/inventories/${inventoryId}/assets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        const newAsset = await response.json()
        setInventory(prev => prev ? {
          ...prev,
          assets: [...prev.assets, newAsset]
        } : null)
        setShowForm(false)
        setForm({})
      }
    } catch (error) {
      console.error('Failed to save asset:', error)
    }
  }

  const handleDeleteAsset = async (assetId: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return

    try {
      const response = await fetch(`/api/assets/${assetId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setInventory(prev => prev ? {
          ...prev,
          assets: prev.assets.filter(asset => asset.id !== assetId)
        } : null)
      }
    } catch (error) {
      console.error('Failed to delete asset:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!inventory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Inventory not found</h1>
          <Link href="/app/dashboard">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#18191a]" : "bg-[#f4f5f7]"}`}>
      {/* Header */}
      <header className={`${darkMode ? "bg-[#23272f] border-[#35373b]" : "bg-white border-[#ececec]"} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/prod/dashboard" className="text-blue-600 hover:text-blue-700">
                ← Back to Dashboard
              </Link>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
                {inventory.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition font-medium text-sm shadow-sm border ${darkMode ? 'bg-[#23272f] text-[#f7f8fa] border-[#35373b]' : 'bg-[#f2f2f7] text-gray-800 border-[#ececec]'} hover:brightness-110`}
                onClick={() => setDarkMode(dm => !dm)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <span role="img" aria-label="moon">🌙</span>
                ) : (
                  <span role="img" aria-label="sun">☀️</span>
                )}
                <span className="hidden md:inline">{darkMode ? "Light" : "Dark"} Mode</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {inventory.description && (
          <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-[#23272f] border border-[#35373b]' : 'bg-white border border-[#ececec]'}`}>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {inventory.description}
            </p>
          </div>
        )}

        {/* Assets Section */}
        <div className={`rounded-2xl shadow-sm border p-6 ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
              Assets ({inventory.assets.length})
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              + Add Asset
            </button>
          </div>

          {inventory.assets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
                No assets yet
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Add your first asset to start tracking your inventory
              </p>
              <button
                onClick={() => setShowForm(true)}
                className={`px-6 py-3 rounded-lg font-medium transition ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Add Your First Asset
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.assets.map((asset) => (
                <div key={asset.id} className={`rounded-xl border p-6 ${darkMode ? 'border-[#35373b] bg-[#18191a]' : 'border-[#ececec] bg-[#fafafd]'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
                      {asset.name}
                    </h3>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className={`text-red-500 hover:text-red-700 text-sm ${darkMode ? 'hover:text-red-400' : ''}`}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Type</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{asset.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Value</span>
                      <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{asset.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{asset.location}</span>
                    </div>
                    {asset.description && (
                      <div className="mt-3">
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {asset.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Asset Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`rounded-2xl shadow-xl p-6 max-w-md w-full ${darkMode ? 'bg-[#23272f] border border-[#35373b]' : 'bg-white border border-[#ececec]'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
                Add New Asset
              </h3>
              <form onSubmit={handleSaveAsset} className="space-y-4">
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'border-[#35373b] bg-[#18191a] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                  placeholder="Asset Name"
                  value={form.name || ""}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'border-[#35373b] bg-[#18191a] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                  placeholder="Type (e.g., Jewelry, Art, Property)"
                  value={form.type || ""}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  required
                />
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'border-[#35373b] bg-[#18191a] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                  placeholder="Value (e.g., $1,000)"
                  value={form.value || ""}
                  onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                  required
                />
                <input
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'border-[#35373b] bg-[#18191a] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                  placeholder="Location"
                  value={form.location || ""}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  required
                />
                <textarea
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'border-[#35373b] bg-[#18191a] text-[#f7f8fa] placeholder:text-gray-500' : 'border-[#ececec] bg-white text-gray-900 placeholder:text-gray-500'}`}
                  placeholder="Description (optional)"
                  value={form.description || ""}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className={`flex-1 py-2 rounded-lg font-medium transition ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Save Asset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={`flex-1 py-2 rounded-lg font-medium transition ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
