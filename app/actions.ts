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

  const prompt = `Create a hilarious but professional resignation letter based on the following details:
  
  Company: ${companyName}
  Job Title: ${jobTitle}
  Boss Name: ${bossName || "Manager"}
  Situation: ${situation}
  
  The letter should be:
  - Funny and witty but still professional
  - Include dramatic flair and humor
  - Reference the specific situation mentioned
  - Be memorable and entertaining
  - Include proper resignation letter format
  - End on a positive but cheeky note
  - Be around 200-300 words
  
  Make it sound like someone who's had enough but wants to leave with style and humor. Include some workplace humor and references to common office frustrations.`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    system:
      "You are a witty professional writer who specializes in humorous but appropriate resignation letters. Your letters are memorable, funny, and help people leave their jobs with dignity and style.",
  })

  return text
}
