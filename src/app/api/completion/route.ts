import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST() {
   const { text } = await generateText({
     model: google("gemini-2.5-flash"), 
     prompt: "explain what is llm in simple terms",
   });

   return Response.json({ text });
}