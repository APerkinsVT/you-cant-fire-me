import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Laugh, Shield, Clock } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Humor",
      description: "Our AI crafts witty, professional-yet-hilarious resignation letters tailored to your situation.",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get your epic resignation letter in seconds. No waiting, no hassle, just pure comedic gold.",
    },
    {
      icon: Laugh,
      title: "Memorable Exit",
      description: "Leave your job with style and humor. Your colleagues will be talking about it for years.",
    },
    {
      icon: Shield,
      title: "Professional Safe",
      description:
        "Funny but professional. We ensure your letter is hilarious without being offensive or unprofessional.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose YouCantFireMe.co?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We turn your workplace frustrations into comedy gold, helping you exit with dignity and a smile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
