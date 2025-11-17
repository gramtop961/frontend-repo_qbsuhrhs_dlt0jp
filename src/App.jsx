import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import CategoryChips from './components/CategoryChips'
import MenuGrid from './components/MenuGrid'
import Cart from './components/Cart'

function App() {
  const [category, setCategory] = useState(null)
  const [tray, setTray] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // Auto-seed menu on first load if collections are empty
    fetch(`${baseUrl}/test`).then(r => r.json()).then(async status => {
      if (!status.collections || !status.collections.includes('menuitem')) {
        await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
      }
    })
  }, [])

  const addToTray = (item) => {
    setTray(prev => {
      const idx = prev.findIndex(p => p._id === item._id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 }
        return copy
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const clearTray = () => setTray([])

  const checkout = async () => {
    const order = {
      items: tray.map(t => ({
        item_id: t._id,
        title: t.title,
        quantity: t.qty,
        base_price: t.price,
        addons: [],
        subtotal: t.price * t.qty
      })),
      total: tray.reduce((s,t)=> s + t.price*(t.qty||1), 0)
    }
    const res = await fetch(`${baseUrl}/api/order`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order)})
    const data = await res.json()
    alert(`Order placed! ID: ${data.order_id}`)
    setTray([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <Hero />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <CategoryChips onSelect={setCategory} />
            <MenuGrid category={category} onAdd={addToTray} />
          </div>
          <div className="md:col-span-1 space-y-4">
            <Cart items={tray} onClear={clearTray} onCheckout={checkout} />
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-sm text-gray-600">
              Tip: Tap items to add them. Mix burgers, fries, shakes and coffee for a cosmic combo!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
