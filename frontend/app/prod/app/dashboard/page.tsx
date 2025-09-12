'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [inventories, setInventories] = useState<Inventory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Load user's inventories
  useEffect(() => {
    if (session) {
      loadInventories()
    }
  }, [session])

  // Load dark mode preference
  useEffect(() => {
    const stored = localStorage.getItem("gg_dark_mode")
    if (stored) setDarkMode(stored === "true")
  }, [])

  useEffect(() => {
    localStorage.setItem("gg_dark_mode", darkMode ? "true" : "false")
  }, [darkMode])

  const loadInventories = async () => {
    try {
      const response = await fetch('/api/inventories')
      if (response.ok) {
        const data = await response.json()
        setInventories(data)
      }
    } catch (error) {
      console.error('Failed to load inventories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const totalAssets = inventories.reduce((sum, inv) => sum + inv.assets.length, 0)

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#18191a]" : "bg-[#f4f5f7]"}`}>
      {/* Header */}
      <header className={`${darkMode ? "bg-[#23272f] border-[#35373b]" : "bg-white border-[#ececec]"} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Gilded Grove
              </Link>
              <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Welcome back, {session.user?.name}
              </span>
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
              <button
                onClick={handleSignOut}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`rounded-2xl shadow-sm border p-6 ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
              Total Inventories
            </h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {inventories.length}
            </p>
          </div>
          <div className={`rounded-2xl shadow-sm border p-6 ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
              Total Assets
            </h3>
            <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {totalAssets}
            </p>
          </div>
          <div className={`rounded-2xl shadow-sm border p-6 ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
              Quick Actions
            </h3>
            <Link href="/app/inventories/new">
              <button className={`px-4 py-2 rounded-lg font-medium text-sm transition ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                + New Inventory
              </button>
            </Link>
          </div>
        </div>

        {/* Inventories List */}
        <div className={`rounded-2xl shadow-sm border p-6 ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
              Your Inventories
            </h2>
            <Link href="/app/inventories/new">
              <button className={`px-4 py-2 rounded-lg font-medium text-sm transition ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                + Create Inventory
              </button>
            </Link>
          </div>

          {inventories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
                No inventories yet
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Create your first inventory to start tracking your assets
              </p>
              <Link href="/app/inventories/new">
                <button className={`px-6 py-3 rounded-lg font-medium transition ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Create Your First Inventory
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventories.map((inventory) => (
                <Link key={inventory.id} href={`/app/inventories/${inventory.id}`}>
                  <div className={`rounded-xl border p-6 transition hover:shadow-md cursor-pointer ${darkMode ? 'border-[#35373b] bg-[#18191a] hover:bg-[#23272f]' : 'border-[#ececec] bg-[#fafafd] hover:bg-white'}`}>
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
                      {inventory.name}
                    </h3>
                    {inventory.description && (
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {inventory.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {inventory.assets.length} assets
                      </span>
                      <span className="text-blue-600 text-sm font-medium">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Demo Link */}
        <div className={`mt-8 rounded-2xl shadow-sm border p-6 ${darkMode ? 'border-[#35373b] bg-[#23272f]' : 'border-[#ececec] bg-white'}`}>
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#f7f8fa]' : 'text-gray-900'}`}>
            Want to see the demo?
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Check out our interactive demo to see all the features in action
          </p>
          <Link href="/demo">
            <button className={`px-4 py-2 rounded-lg font-medium text-sm transition ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-600 text-white hover:bg-gray-700'}`}>
              View Demo
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
