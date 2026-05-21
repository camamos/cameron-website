import { GoogleGenAI, Type } from "@google/genai";
import { UserIntakeData, JokeResponse } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. Gemini features will be simulated.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWelcomeMessage = async (userData: UserIntakeData): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return `Welcome to the inner circle, ${userData.firstName}! Glad to have a fan from ${userData.city}.`;
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Write a short, witty, and slightly roasting welcome message for a new fan named ${userData.firstName} who lives in ${userData.city}.
      The comedian has a dry, self-deprecating style. 
      Keep it under 2 sentences.
      Do not be mean, just playful.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    return response.text || "Welcome to the show!";
  } catch (error) {
    console.error("Gemini welcome generation failed:", error);
    return `Welcome to the crew, ${userData.firstName}!`;
  }
};

export const generateTopicJoke = async (topic: string): Promise<JokeResponse> => {
  const ai = getClient();
  if (!ai) {
    // Fallback mock response if API key is missing
    return {
      setup: "Why did the developer cross the road?",
      punchline: "Because they forgot to render the sidewalk component."
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short joke about ${topic}. Return ONLY JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                setup: { type: Type.STRING },
                punchline: { type: Type.STRING }
            },
            required: ["setup", "punchline"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");
    return JSON.parse(text) as JokeResponse;

  } catch (error) {
    console.error("Gemini joke generation failed:", error);
    return {
      setup: `I tried to write a joke about ${topic}...`,
      punchline: "But the AI is on a coffee break."
    };
  }
};

export const generateRoast = async (name: string, city: string): Promise<string> => {
  const ai = getClient();
  const fallbackRoasts = [
    `Look at ${name} from ${city}. I bet you clap when the plane lands.`,
    `${name} from ${city}? That explains the haircut.`,
    `I'd roast you ${name}, but living in ${city} is punishment enough.`
  ];
  
  if (!ai) {
     return fallbackRoasts[Math.floor(Math.random() * fallbackRoasts.length)];
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Write a short, sharp, funny roast for a comedy fan named ${name} from ${city}.
      Be direct but playful. Max 25 words.
      Style: Stand-up crowd work roast.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || fallbackRoasts[0];
  } catch (error) {
    console.error("Gemini roast generation failed:", error);
    return fallbackRoasts[0];
  }
};