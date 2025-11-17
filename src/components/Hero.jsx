import { Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white p-6 md:p-10">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-fuchsia-200 mb-2">
          <Sparkles className="h-5 w-5" />
          <span className="uppercase tracking-widest text-xs">Welcome to</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black leading-tight">Galaxy Bites</h1>
        <p className="mt-3 md:mt-4 text-fuchsia-100/90 md:text-lg">
          Fast food meets coffee house in a neon space diner. Build your cosmic combo and fuel your day.
        </p>
      </div>
      <div className="absolute -right-10 -top-10 h-40 w-40 md:h-64 md:w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 md:h-64 md:w-64 rounded-full bg-white/10 blur-2xl" />
    </div>
  )
}
