
import { GoogleGenAI } from "@google/genai";

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
    const { records } = await req.json();

    if (!records || records.length < 2) {
      return new Response(JSON.stringify({ error: 'Not enough records for analysis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const prompt = `Act as a data analyst for a motorcycle rider. Analyze the following JSON data of refuel records. Calculate the fuel economy (km/l) between each refuel. Identify trends in the rider's fuel economy. Provide a concise summary and three actionable, personalized tips for improving fuel efficiency. Format the output as simple text with newlines. Data: ${JSON.stringify(records)}`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    const analysisText = response.text;

    return new Response(JSON.stringify({ analysis: analysisText }), {
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
