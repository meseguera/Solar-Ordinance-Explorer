
import { GoogleGenAI, Type } from "@google/genai";
import type { Ordinance, GeminiResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    ordinances: {
      type: Type.ARRAY,
      description: "A list of solar farm ordinances and related regulations.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "The official title or name of the ordinance/regulation (e.g., 'Solar Energy Systems Ordinance')."
          },
          jurisdiction: {
            type: Type.STRING,
            description: "The governing body (e.g., Boulder County, Colorado)."
          },
          summary: {
            type: Type.STRING,
            description: "A concise summary of the ordinance's purpose and main points regarding solar farms."
          },
          key_points: {
            type: Type.ARRAY,
            description: "A list of the most important regulations, such as setback distances, height limits, decommissioning requirements, and permit processes.",
            items: { type: Type.STRING }
          },
          source_url: {
            type: Type.STRING,
            description: "A direct, publicly accessible URL to the official ordinance document or relevant government webpage, if available."
          }
        },
        required: ["title", "jurisdiction", "summary", "key_points"]
      }
    }
  }
};

export const fetchSolarOrdinances = async (location: string): Promise<Ordinance[]> => {
  const prompt = `
    Please act as a legal and policy research assistant. Your task is to find and summarize local ordinances and regulations specifically related to the development and siting of solar farms (also known as solar energy systems or photovoltaic facilities) for the following location: "${location}".

    Focus exclusively on regulations that apply to utility-scale or large commercial solar projects, not small residential rooftop installations.

    For each distinct ordinance or regulation you find, provide the following information in the specified JSON format:
    - The official title of the ordinance.
    - The jurisdiction it applies to (e.g., city, county).
    - A summary of its key provisions regarding solar farms.
    - A bulleted list of key points, including details on zoning requirements, setback distances from property lines and roads, height restrictions, screening/landscaping rules, and any requirements for decommissioning plans.
    - A direct, valid, and publicly accessible URL to the official government source document if one can be located. If not available, provide null for the source_url.

    If you cannot find specific "solar farm" ordinances, look for sections within broader zoning codes that address renewable energy facilities. If no relevant information can be found, return an empty list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });
    
    const responseText = response.text.trim();
    if (!responseText) {
      throw new Error("The AI model returned an empty response. This may be due to the query, content filters, or a temporary issue.");
    }
    
    try {
        const parsedJson: GeminiResponse = JSON.parse(responseText);
        return parsedJson.ordinances || [];
    } catch(jsonError) {
        console.error("Failed to parse JSON response from Gemini API:", responseText, jsonError);
        throw new Error("The AI model's response was not in the expected format. Please try rephrasing your search.");
    }

  } catch (error) {
    console.error("Error fetching or parsing data from Gemini API:", error);
    if (error instanceof Error) {
        // Pass the specific error message along
        throw error;
    }
    throw new Error("An unknown error occurred while communicating with the AI model.");
  }
};