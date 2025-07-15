"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "@/utils/format-utils";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummary(
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
      message: "File upload failed",
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
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    let summary;

    try {
      summary = await generateSummaryFromGemini(pdfText);
    } catch (error) {
      console.log("Gemini failed, trying fallback...", error);
      try {
        summary = await generateSummaryFromOpenAI(pdfText);
      } catch (fallbackError) {
        console.error("Both AI providers failed", fallbackError);
        return {
          success: false,
          message: "Failed to generate summary",
          data: null,
        };
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Summary generation returned empty",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        userId,
        fileUrl: pdfUrl,
        summary,
        title: formattedFileName,
        fileName,
      },
    };
  } catch (err) {
    console.error("PDF processing failed", err);
    return {
      success: false,
      message: "Something went wrong while processing the PDF",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    );`;
    return true;
  } catch (error) {
    console.error("Error saving PDF summary", error);
    return false;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: Omit<PdfSummaryType, "userId">) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const isSaved = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!isSaved) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again.",
      };
    }

    return {
      success: true,
      message: "PDF summary saved successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
}
