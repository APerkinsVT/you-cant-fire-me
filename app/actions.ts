"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface FormData {
  situation: string
  email: string
  bossName: string
  companyName: string
  jobTitle: string
}

export async function generateResignationLetter(formData: FormData) {
  const { situation, bossName, companyName, jobTitle } = formData

  const prompt = `Create a hilarious resignation letter based on the following details:
  
  Company: ${companyName}
  Job Title: ${jobTitle}
  Boss Name: ${bossName || "Manager"}
  Situation: ${situation}
  
  The letter should be:
  - Funny and witty but with a definite edge.
  - Avoid standard phrasing and boilerplate approaches
  - Include dramatic flair and humor
  - Reference the specific situation mentioned
  - Be memorable and entertaining
  - Include informal resignation letter format
  - End on a cheeky note
  - Keep the length to no more than 150-200 words
  
  Make it sound like someone who's fed up with the situation but wants to leave with a splash. Don't include cute or predictable puns or overused references to office frustrations. Think of how Stephen Colbert might write.`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    system:
      "You are a witty and satirical writer who specializes in humorous resignation letters. Your letters are memorable, funny, and irreverent in the vein of Jon Stewart. They help people leave their jobs with style - just ahead of a foreseeable dismissal.",
  })

  return text
}
