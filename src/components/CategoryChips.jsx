import { useEffect, useState } from 'react'

export default function CategoryChips({ onSelect }) {
  const [categories, setCategories] = useState([])
  const [active, setActive] = useState('all')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/categories`).then(r => r.json()).then(setCategories)
  }, [])

  const click = (slug) => {
    setActive(slug || 'all')
    onSelect?.(slug)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button onClick={() => click(null)} className={`px-3 py-1.5 rounded-full border ${active==='all' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}>All</button>
      {categories.map(c => (
        <button key={c._id} onClick={() => click(c.slug)} className={`px-3 py-1.5 rounded-full border whitespace-nowrap ${active===c.slug ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}>
          <span className="mr-1">{c.emoji}</span>{c.name}
        </button>
      ))}
    </div>
  )
}
