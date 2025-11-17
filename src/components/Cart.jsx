import { useMemo } from 'react'

export default function Cart({ items, onClear, onCheckout }) {
  const total = useMemo(() => items.reduce((sum, it) => sum + (it.price * (it.qty || 1)), 0), [items])

  if (!items.length) return (
    <div className="bg-white border border-dashed border-gray-300 rounded-xl p-4 text-center text-gray-500">
      Your tray is empty. Add something tasty!
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">Your Tray</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700" onClick={onClear}>Clear</button>
      </div>
      <div className="space-y-2 max-h-60 overflow-auto pr-1">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="truncate">
              <span className="font-medium">{it.title}</span>
              <span className="text-gray-500 ml-2">x{it.qty || 1}</span>
            </div>
            <div className="tabular-nums">${'{'}(it.price * (it.qty || 1)).toFixed(2){'}'}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 mt-3 border-t">
        <div className="text-gray-600">Total</div>
        <div className="font-bold tabular-nums">${'{'}total.toFixed(2){'}'}</div>
      </div>
      <button onClick={onCheckout} className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
        Place Order
      </button>
    </div>
  )
}
