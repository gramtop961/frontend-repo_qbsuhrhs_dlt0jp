import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

export default function MenuGrid({ category, onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    setLoading(true)
    const url = category ? `${baseUrl}/api/items/${category}` : `${baseUrl}/api/items`
    fetch(url).then(r => r.json()).then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [category])

  if (loading) return <p className="text-gray-500">Loading menu...</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(it => (
        <div key={it._id} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{it.title}</h3>
              {it.featured && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>}
            </div>
            <p className="text-gray-600 mt-1 text-sm">{it.description}</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-gray-900 font-semibold">${'{'}it.price.toFixed(2){'}'}</div>
            <button onClick={() => onAdd?.(it)} className="inline-flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg hover:opacity-90">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
