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
  - Funny and with a definite edge.
  - Avoid standard phrasing and boilerplate approaches
  - Include dramatic flair and humor
  - Reference the specific situation mentioned
  - Be memorable and entertaining
  - Include informal resignation letter format
  - End on a cheeky note
  - Keep it short - no more than 125 words
  
  Make it sound like someone who's fed up with the situation and wants to leave with a splash. Don't include cute or predictable puns or overused references to office frustrations. Think of how Stephen Colbert might write about his recent firing.`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    system:
      "You are a witty and satirical writer who specializes in humorous resignation letters. Your letters are memorable, funny, sarcastic and irreverent - in the style of Jon Stewart. They help people leave their jobs with a parting shot - just ahead of a foreseeable dismissal.",
  })

  return text
}
