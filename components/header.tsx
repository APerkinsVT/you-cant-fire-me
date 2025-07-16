import { Button } from "@/components/ui/button"
import { Flame } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame className="h-8 w-8 text-orange-500" />
          <span className="text-2xl font-bold text-gray-900">YouCantFireMe.com</span>
        </div>
        <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
          How It Works
        </Button>
      </div>
    </header>
  )
}
