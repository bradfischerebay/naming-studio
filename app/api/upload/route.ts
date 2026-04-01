import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/upload
 * Handles file uploads (PDF, DOCX, TXT) and extracts text content
 */

// Maximum file size: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function POST(req: NextRequest) {
  // Rate limiting: 5 uploads per minute
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000,
    maxRequests: 5,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many upload requests. Please try again later." },
      {
        status: 429,
        headers: rateLimitResult.headers
      }
    );
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds 20MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.` },
        { status: 400 }
      );
    }

    const fileType = file.type;
    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    // Handle different file types
    if (fileType === "application/pdf") {
      // PDF parsing
      const pdfParse = (await import("pdf-parse")).default;
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      // DOCX parsing
      const mammoth = (await import("mammoth")).default;
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (fileType === "text/plain") {
      // Plain text
      text = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload PDF, DOCX, or TXT files." },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });

  } catch (error) {
    console.error("File upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process file";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
