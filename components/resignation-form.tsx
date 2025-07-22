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
  const [submissionId, setSubmissionId] = useState("")

  const [rating, setRating] = useState<number | null>(null);

  const handleRating = async (value: number) => {
    if (rating !== null) return; // prevents multiple votes
    setRating(value);
  
  try {
    await fetch("https://hook.us2.make.com/nh1h339uew28qs7jivuja70ju3rxtfz4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        submission_id: submissionId,
        action: "rating",
        rating: value,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Error sending rating:", error);
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const letter = await generateResignationLetter(formData)
      setGeneratedLetter(letter)
      const id = crypto.randomUUID()
      setSubmissionId(id)

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
          submission_id: id,
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

  const trackShareClick = async (action: string) => {
    try {
      await fetch("https://hook.us2.make.com/nh1h339uew28qs7jivuja70ju3rxtfz4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          submission_id: submissionId,
          action,
          timestamp: new Date().toISOString()
        }),
      })
    } catch (error) {
      console.error("Tracking failed:", error)
    }
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

          <Card className={generatedLetter ? "border-green-200 bg-[#f5f5f5]" : ""}>
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
                    <Button
                      onClick={() => {
                        copyToClipboard();
                        trackShareClick("copy");
                    
                        // Google Analytics tracking
                        if (typeof window !== 'undefined' && typeof gtag === 'function') {
                          gtag('event', 'copy_click', {
                            event_category: 'interaction',
                            event_label: 'Copy Resignation Letter',
                          });
                        }
                      }}
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>

                    <Button
                      onClick={() => {
                        downloadLetter(); // your existing function
                        trackShareClick("download");
                    
                        if (typeof window !== 'undefined' && typeof gtag === 'function') {
                          gtag('event', 'download_click', {
                            event_category: 'interaction',
                            event_label: 'Download Resignation Letter',
                          });
                        }
                      }}
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <TwitterShareButton
                      url="https://youcantfireme.co"
                      title="I just used AI to write my resignation letter. Brutal. 😂"
                      onClick={() => {
                        trackShareClick("twitter");
                    
                        if (typeof window !== 'undefined' && typeof gtag === 'function') {
                          gtag('event', 'twitter_share', {
                            event_category: 'interaction',
                            event_label: 'Twitter Share Button',
                          });
                        }
                      }}
                    >
                      <TwitterIcon size={24} round />
                    </TwitterShareButton>
                    
                    <RedditShareButton
                      url="https://youcantfireme.co"
                      title="Check out this AI-generated resignation letter. 😳"
                      onClick={() => {
                        trackShareClick("reddit");
                    
                        if (typeof window !== 'undefined' && typeof gtag === 'function') {
                          gtag('event', 'reddit_share', {
                            event_category: 'interaction',
                            event_label: 'Reddit Share Button',
                          });
                        }
                      }}
                    >
                      <RedditIcon size={24} round />
                    </RedditShareButton>
                    
                    <LinkedinShareButton
                      url="https://youcantfireme.co"
                      title="Quit with flair. I just used AI to resign."
                      onClick={() => {
                        trackShareClick("linkedin");
                    
                        if (typeof window !== 'undefined' && typeof gtag === 'function') {
                          gtag('event', 'linkedin_share', {
                            event_category: 'interaction',
                            event_label: 'LinkedIn Share Button',
                          });
                        }
                      }}
                    >
                      <LinkedinIcon size={24} round />
                    </LinkedinShareButton>
                    
                    <FacebookShareButton
                      url="https://youcantfireme.co"
                      quote="AI helped me quit my job. This is hilarious."
                      onClick={() => {
                        trackShareClick("facebook");
                    
                        if (typeof window !== 'undefined' && typeof gtag === 'function') {
                          gtag('event', 'facebook_share', {
                            event_category: 'interaction',
                            event_label: 'Facebook Share Button',
                          });
                        }
                      }}
                    >
                      <FacebookIcon size={24} round />
                    </FacebookShareButton>
                  </div>

                  {rating === null ? (
                    <div className="mt-4 flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => {
                            handleRating(star);
                  
                            // GA4 rating event
                            if (typeof window !== 'undefined' && typeof gtag === 'function') {
                              gtag('event', 'rating_given', {
                                value: star,
                                event_category: 'interaction',
                                event_label: `Star Rating: ${star}`,
                              });
                            }
                          }}
                          className="mx-1 text-2xl"
                        >
                          {star <= rating ? "★" : "☆"}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center mt-2 text-green-600">Thanks for rating ⭐️ {rating}</p>
                  )}

                  <div className="mt-6 flex flex-col items-center">
                    <a
                      href="https://www.buymeacoffee.com/Fuel_My_Exit?amount=3&message=🔥%20Fueling%20the%20exit!"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={async () => {
                        // 🔁 Send to Make.com webhook
                        try {
                          await fetch("https://hook.us2.make.com/nh1h339uew28qs7jivuja70ju3rxtfz4", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              email: formData.email,
                              submission_id: submissionId,
                              action: "bmac_click",
                              timestamp: new Date().toISOString(),
                            }),
                          });
                        } catch (err) {
                          console.error("BMAC webhook failed", err);
                        }
                      
                        // 🔎 Google Analytics tracking
                        if (typeof window !== 'undefined' && typeof gtag === 'function') {
                          gtag('event', 'bmac_click', {
                            event_category: 'interaction',
                            event_label: 'Buy Me a Coffee Link',
                          });
                        }
                      }}

                      className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold py-1 px-3 rounded shadow"
                    >
                      ☕ Fuel the Flame ($3)
                    </a>
                    <p className="mt-2 text-sm text-gray-600">
                      Like what you see? Help keep the fire burning.
                    </p>
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
