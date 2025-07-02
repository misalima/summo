'use server';

import { getPDFText } from "@/lib/langchain";


export async function generatePDFSummary(uploadResponse:  [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        }
    }
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "Upload failed",
            data: null,
        }
    }
    const {
        serverData: {
            userId,
            file: { url: pdfUrl, name: fileName }
        }
    } = uploadResponse[0];

    if (!pdfUrl) {
        return {
            success: false,
            message: "PDF URL is missing",
            data: null,
        }
    }

    try {
        const pdfText = await getPDFText(pdfUrl);
        console.log("PDF text", pdfText);
    } catch (error) {
        console.error("Error generating PDF summary", error);
        return {
            success: false,
            message: "Upload failed",
            data: null,
        }
    }
}