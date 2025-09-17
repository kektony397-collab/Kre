
import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { input, tankCapacity } = await req.json();

    if (!input || !tankCapacity) {
      return new Response(JSON.stringify({ error: 'Missing input or tankCapacity' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const prompt = `You are an intelligent assistant for a motorcycle dashboard. Your task is to parse the user's input and extract the amount of fuel added. The bike's tank capacity is ${tankCapacity} liters. If the user indicates they 'filled up', use the tank capacity. Respond ONLY with a valid JSON object in the format { "litersAdded": <number> }. Do not include any other text or explanations. User input: '${input}'`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              litersAdded: { type: Type.NUMBER }
            }
          }
        }
    });

    const text = response.text.trim();
    // The response is already a stringified JSON, so we can parse it
    const parsedJson = JSON.parse(text);

    return new Response(JSON.stringify(parsedJson), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to process request with AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
