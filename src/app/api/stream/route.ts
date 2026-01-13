import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    // Log token usage after streaming completes
    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    return new Response("Failed to stream text", { status: 500 });
  }
}