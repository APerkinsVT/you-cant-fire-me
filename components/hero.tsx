"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Zap, Laugh } from "lucide-react"

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("resignation-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
            <Zap className="h-5 w-5 text-orange-500" />
            <span className="text-orange-700 font-medium">AI-Powered Resignation Letters</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          You Can't{" "}
          <span className="text-orange-500 relative">
            Fire Me
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
              <path d="M2 10C60 2 140 2 198 10" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Generate hilariously dramatic resignation letters that'll make your exit unforgettable.
          <br className="hidden md:block" />
          Because if you're going out, you might as well go out with style! 🔥
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
            onClick={scrollToForm}
          >
            <Laugh className="mr-2 h-5 w-5" />
            Create My Epic Exit
          </Button>
          <p className="text-sm text-gray-500">Free • No signup required • Instant results</p>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400 mx-auto" />
        </div>
      </div>
    </section>
  )
}
