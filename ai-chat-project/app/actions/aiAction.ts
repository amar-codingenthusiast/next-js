"use server"

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


export async function genTextAction(prompt: string): Promise<string> {
    const interaction = await ai.interactions.create({
      model: "gemini-2.5-flash-lite",
      input: prompt,
    });
    
    console.log(interaction.output_text);
    return interaction.output_text || "No output generated.";
}