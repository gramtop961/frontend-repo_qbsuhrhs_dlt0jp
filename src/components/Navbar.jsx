import { Menu, ShoppingBag } from 'lucide-react'

export default function Navbar({ count }) {
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-black tracking-tight">Galaxy Bites</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600 hidden sm:block">Fast food × coffee house</div>
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">{count}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
