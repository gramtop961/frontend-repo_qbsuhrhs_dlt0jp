import { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

export default function MenuGrid({ category, onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    const url = category ? `${baseUrl}/api/items/${category}` : `${baseUrl}/api/items`
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load menu')
        return r.json()
      })
      .then(data => {
        if (!active) return
        setItems(data)
        setLoading(false)
      })
      .catch(err => {
        if (!active) return
        setError(err.message)
        setLoading(false)
      })
    return () => { active = false }
  }, [category])

  if (loading) return <p className="text-gray-500">Loading menu...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(it => (
        <ItemCard key={it._id} item={it} onAdd={onAdd} />
      ))}
    </div>
  )
}
