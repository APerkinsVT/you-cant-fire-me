import { Flame } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Flame className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">YouCantFireMe.co</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">© 2025 YouCantFireMe.co. Making exits epic since today.</p>
            <p className="text-gray-500 text-xs mt-1">For entertainment purposes. Please resign responsibly. 😄</p>
          </div>
        </div>

        {/* Privacy link below */}
        <div className="text-center mt-6">
          <a href="/privacy" className="text-gray-400 text-xs underline hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
