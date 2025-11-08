// FIX: Import GoogleGenAI and Type from @google/genai.
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import necessary types from the local types file.
import { SoilData, HistoricalSoilEntry, Seed, AIRecommendation } from '../types';

// FIX: Initialize GoogleGenAI with API key from environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// FIX: Define the response schema for structured JSON output to ensure reliable parsing.
const recommendationSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: "The name of the recommended seed."
            },
            match_score: {
                type: Type.NUMBER,
                description: "A score from 0-100 indicating the suitability of the seed."
            },
            reason: {
                type: Type.STRING,
                description: "A brief justification for the recommendation."
            }
        },
        required: ["name", "match_score", "reason"],
    },
};

export const getRiceRecommendation = async (
    currentSoil: SoilData,
    historicalSoil: HistoricalSoilEntry[],
    availableSeeds: Seed[]
): Promise<AIRecommendation[]> => {

    // FIX: Construct a detailed prompt for the AI model.
    const prompt = `
    You are an expert agricultural advisor for Bangladeshi rice farmers.
    Your task is to recommend the top 3 most suitable native rice seeds based on the provided soil data.

    Current Soil Conditions:
    - pH: ${currentSoil.ph}
    - Moisture: ${currentSoil.moisture}%
    - Fertility: ${currentSoil.fertility}

    Historical Soil Data (last 7 days):
    ${historicalSoil.map(d => `- ${d.day}: pH ${d.ph}, Moisture ${d.moisture}%`).join('\n')}

    Available Native Rice Seeds:
    ${availableSeeds.map(s => `- ${s.name}: ${s.description} (Optimal pH: ${s.optimal_ph}, Optimal Moisture: ${s.optimal_moisture})`).join('\n')}

    Analyze the data and provide your top 3 recommendations. For each, include the seed name, a match score from 0 to 100, and a brief, clear reason for the recommendation.
    Ensure the recommended seed names exactly match one of the available seeds.
    `;

    try {
        // FIX: Use generateContent with a model and JSON config as per guidelines.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
            },
        });
        
        // FIX: Extract text and parse JSON from the response. Handle potential parsing errors.
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (!Array.isArray(result)) {
            console.error("AI response is not an array:", result);
            throw new Error("Invalid response format from AI.");
        }

        return result as AIRecommendation[];

    } catch (error) {
        console.error("Error fetching recommendations from Gemini API:", error);
        throw new Error("Failed to get AI recommendations.");
    }
};
