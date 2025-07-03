"use server";

import { generateSummaryFromGemini } from "@/lib/geminiai";
import { getPDFText } from "@/lib/langchain";
import { getNeonDB } from "@/lib/neondb";
import { formatFileNameAsTitle } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PDFSummary {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePDFSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "Upload failed",
      data: null,
    };
  }
  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "PDF URL is missing",
      data: null,
    };
  }

  try {
    const pdfText = await getPDFText(pdfUrl);
    console.log("PDF text", pdfText);

    let summary;

    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log("Summary", summary);
    } catch (error) {
      console.error("Error generating summary from Gemini", error);
      summary = null;
    }

    if (!summary) {
      return {
        success: false,
        message: "Error generating summary",
        data: null,
      };
    }

    const title = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
        userId,
        fileName,
        title,
      },
    };
  } catch (error) {
    console.error("Error generating PDF summary", error);
    return {
      success: false,
      message: "Upload failed",
      data: null,
    };
  }
}

export async function savePDFSummary({userId, fileUrl, summary, title, fileName}: PDFSummary) {
  try {
    const sql = await getNeonDB();
    await sql`INSERT INTO pdf_summaries (
  user_id,
  original_file_url,
  summary_text,
  title,
  file_name
)
VALUES
  (
    ${userId},
    ${fileUrl},
    ${summary},
    ${title},
    ${fileName}
  );`;

  } catch(error) {
    console.log("Error saving pdf summary to db", error);
    throw error;
  }
}

export async function storePDFSummaryAction({fileUrl, summary, title, fileName}: PDFSummary) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    savedSummary = await savePDFSummary({
      userId,
      fileUrl: fileUrl,
      summary: summary,
      title: title,
      fileName: fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Error saving PDF summary to DB",
      }
    }
    
  } catch (error) {
    console.error("Error saving PDF summary to DB", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error saving PDF summary to DB",
    };
  }

  //revalidate the summary page
  revalidatePath(`/summaries/${savedSummary.id}`);

  return  {
    success: true,
    message: "PDF summary saved to DB",
    data: {
      id: savedSummary.id
    }
  }
}
