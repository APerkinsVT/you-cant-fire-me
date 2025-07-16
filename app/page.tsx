import { ResignationForm } from "@/components/resignation-form"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />
      <main>
        <Hero />
        <ResignationForm />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
