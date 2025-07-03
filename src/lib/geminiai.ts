import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export const generateSummaryFromGemini = async (pdfText: string) =>  {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite-001",
            contents: `Transform this document into an engaging easy-to-read summary, in the language of the document, with contextually relevant emojis and proper markdown formatting: \n\n${pdfText}`,
        });
        console.log(response.text)

        if (!response.text) {
            throw new Error("No response from Gemini");
        }

        return response.text;

    } catch (error) {
        console.error("Error generating summary from Gemini:", error)
        return null
    }
}