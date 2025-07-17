"use client"

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon
} from "react-share"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, Copy, Download } from "lucide-react"
import { generateResignationLetter } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function ResignationForm() {
  const [formData, setFormData] = useState({
    situation: "",
    email: "",
    bossName: "",
    companyName: "",
    jobTitle: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const letter = await generateResignationLetter(formData)
      setGeneratedLetter(letter)

      // 🔁 Send data to Make.com webhook
      await fetch("https://hook.us2.make.com/nh1h339uew28qs7jivuja70ju3rxtfz4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          resignation_letter: letter,
          timestamp: new Date().toISOString(),
          submission_id: crypto.randomUUID(),
        }),
      })

      toast({
        title: "Letter Generated!",
        description: "Your hilarious resignation letter is ready!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate letter. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter)
    toast({
      title: "Copied!",
      description: "Letter copied to clipboard",
    })
  }

  const downloadLetter = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedLetter], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "epic-resignation-letter.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <section id="resignation-form" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tell Us Your Story</h2>
          <p className="text-lg text-gray-600">
            The more dramatic the details, the funnier your resignation letter will be!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5 text-orange-500" />
                Your Epic Exit Details
              </CardTitle>
              <CardDescription>Fill out the form and we'll craft your legendary resignation letter</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Acme Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Your Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Senior Widget Maker"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bossName">Boss's Name (Optional)</Label>
                  <Input
                    id="bossName"
                    placeholder="Mr. Micromanager"
                    value={formData.bossName}
                    onChange={(e) => setFormData({ ...formData, bossName: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="situation">What's Your Situation?</Label>
                  <Textarea
                    id="situation"
                    placeholder="Tell us what happened... Did they make you work weekends? Steal your lunch? Make you use Internet Explorer? The more details, the better!"
                    className="min-h-32"
                    value={formData.situation}
                    onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll send you a copy of your epic resignation letter</p>
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Crafting Your Epic Exit...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate My Resignation Letter
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className={generatedLetter ? "border-green-200 bg-green-50" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center">Your Epic Resignation Letter</CardTitle>
              <CardDescription>
                {generatedLetter
                  ? "Ready to make your grand exit!"
                  : "Your hilarious resignation letter will appear here"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedLetter ? (
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{generatedLetter}</pre>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1 bg-transparent">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button onClick={downloadLetter} variant="outline" className="flex-1 bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Send className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Fill out the form to generate your epic resignation letter</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
