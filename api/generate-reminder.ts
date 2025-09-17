
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
    const { totalOdometerKm, lastServiceKm, bikeModel } = await req.json();

    if (totalOdometerKm === undefined || lastServiceKm === undefined || !bikeModel) {
      return new Response(JSON.stringify({ error: 'Missing required data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const prompt = `You are a friendly, helpful assistant for a ${bikeModel} owner. The bike's total mileage is ${totalOdometerKm} km. The last oil change was at ${lastServiceKm} km, and it is recommended every 4,000 km. Generate a short, friendly, and non-alarming maintenance reminder for the upcoming oil change. Mention the bike model in the message.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    const reminderText = response.text;

    return new Response(JSON.stringify({ reminder: reminderText }), {
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
