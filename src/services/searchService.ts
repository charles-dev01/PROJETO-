import * as React from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_VEHICLES } from "@/src/lib/mockData";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function semanticSearch(query: string) {
  if (!query || query.length < 3) return MOCK_VEHICLES;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise a seguinte busca de carro: "${query}". 
      Retorne um objeto JSON com critérios de filtragem baseados no texto.
      Exemplo: "SUV automático até 100k" -> { "category": "SUV", "transmission": "automático", "maxPrice": 100000 }
      
      Mock Data disponível (marcas): Toyota, Honda, Jeep, Volkswagen, BMW, Porsche.
      Mock Data disponível (modelos): Corolla, Civic, Compass, Nivus, 320i, 911, CB 500X, R 1250 GS.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            make: { type: Type.STRING },
            model: { type: Type.STRING },
            maxPrice: { type: Type.NUMBER },
            minYear: { type: Type.NUMBER },
            isNew: { type: Type.BOOLEAN }
          }
        }
      }
    });

    const filters = JSON.parse(response.text);
    console.log("AI Filters:", filters);

    // Simple client-side filtering based on AI interpretation
    return MOCK_VEHICLES.filter(v => {
      if (filters.make && !v.make.toLowerCase().includes(filters.make.toLowerCase())) return false;
      if (filters.model && !v.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.maxPrice && v.price > filters.maxPrice) return false;
      if (filters.minYear && parseInt(v.year.split('/')[0]) < filters.minYear) return false;
      if (filters.isNew !== undefined && v.isNew !== filters.isNew) return false;
      return true;
    });
  } catch (error) {
    console.error("Semantic search failed:", error);
    return MOCK_VEHICLES;
  }
}
