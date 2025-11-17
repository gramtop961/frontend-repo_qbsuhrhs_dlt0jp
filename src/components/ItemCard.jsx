import { useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'

export default function ItemCard({ item, onAdd }) {
  const [open, setOpen] = useState(false)
  const hasSizes = Array.isArray(item.sizes) && item.sizes.length > 0
  const basePrice = item.price
  const [size, setSize] = useState(hasSizes ? item.sizes[0] : null)

  const price = useMemo(() => {
    if (!hasSizes || !size) return basePrice
    const delta = (item.size_price_delta && item.size_price_delta[size]) || 0
    return Number((basePrice + delta).toFixed(2))
  }, [size, hasSizes, basePrice, item.size_price_delta])

  const add = () => {
    const payload = { ...item, selected_size: size, price }
    onAdd?.(payload)
    setOpen(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg truncate" title={item.title}>{item.title}</h3>
          {item.featured && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>}
        </div>
        {item.image && (
          <img src={item.image} alt={item.title} className="mt-2 h-32 w-full object-cover rounded-md" />
        )}
        <p className="text-gray-600 mt-1 text-sm line-clamp-3">{item.description}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-gray-900 font-semibold">${price.toFixed(2)}</div>
        {hasSizes ? (
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg hover:opacity-90">
            <Plus className="w-4 h-4" /> Choose size
          </button>
        ) : (
          <button onClick={add} className="inline-flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg hover:opacity-90">
            <Plus className="w-4 h-4" /> Add
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold">Customize</h4>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-100"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Size</div>
                <div className="flex gap-2">
                  {item.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-full border ${size===s ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="font-semibold">${price.toFixed(2)}</div>
              <button onClick={add} className="bg-black text-white px-4 py-2 rounded-lg">Add to tray</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
