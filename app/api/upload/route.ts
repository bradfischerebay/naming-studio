import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// Maximum file size: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

// Uses file extension as fallback when browser sends empty/variant MIME types
function validateMagicBytes(buffer: Buffer, extension: string, claimedType: string): boolean {
  const type = claimedType.toLowerCase();

  if (type.includes("pdf") || extension === "pdf") {
    // PDF files start with %PDF (hex: 25 50 44 46)
    return buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;
  } else if (type.includes("word") || type.includes("officedocument") || extension === "docx" || extension === "doc") {
    // DOCX files start with PK (hex: 50 4B) - ZIP format header
    return buffer[0] === 0x50 && buffer[1] === 0x4B;
  } else if (type.includes("text") || extension === "txt") {
    // TXT files have no magic bytes to check
    return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log("[Upload] Request received at", new Date().toISOString());

  try {
    // Rate limiting: 5 uploads per minute
    const rateLimitResult = await rateLimit(req, {
      interval: 60 * 1000,
      maxRequests: 5,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many upload requests. Please try again later." },
        { status: 429, headers: rateLimitResult.headers }
      );
    }
  } catch (rateLimitError) {
    console.error("[Upload] Rate limiter error (allowing request to proceed):", rateLimitError);
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds 20MB limit. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.` },
        { status: 400 }
      );
    }

    // Use extension as reliable fallback when browser sends empty/variant MIME type
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const fileType = file.type.toLowerCase();

    console.log("[Upload] File received:", { name: file.name, type: fileType, extension, size: file.size });

    let buffer: Buffer;
    try {
      buffer = Buffer.from(await file.arrayBuffer());
    } catch {
      throw new Error("Failed to read file contents");
    }

    if (!validateMagicBytes(buffer, extension, fileType)) {
      console.error("[Upload] Magic bytes validation failed — type:", fileType, "extension:", extension);
      return NextResponse.json(
        { error: "File content does not match the expected format. Please ensure it is a valid PDF, DOCX, or TXT." },
        { status: 400 }
      );
    }

    let text = "";

    if (fileType.includes("pdf") || extension === "pdf") {
      console.log("[Upload] Parsing PDF file");
      try {
        // pdf-parse v2 uses a class-based API: new PDFParse({ data: buffer }).getText()
        const { PDFParse } = await import("pdf-parse");
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        text = result.text;
        console.log("[Upload] PDF parsed, text length:", text.length);
      } catch (pdfError) {
        throw new Error(`Failed to parse PDF: ${pdfError instanceof Error ? pdfError.message : "Unknown error"}`);
      }
    } else if (fileType.includes("word") || fileType.includes("officedocument") || extension === "docx" || extension === "doc") {
      console.log("[Upload] Parsing DOCX file");
      try {
        const mammothModule = await import("mammoth");
        const mammoth = mammothModule.default || mammothModule;
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
        console.log("[Upload] DOCX parsed, text length:", text.length);
      } catch (docxError) {
        throw new Error(`Failed to parse DOCX: ${docxError instanceof Error ? docxError.message : "Unknown error"}`);
      }
    } else if (fileType.includes("text") || extension === "txt") {
      console.log("[Upload] Processing plain text file");
      text = buffer.toString("utf-8");
    } else {
      console.error("[Upload] Unsupported file type:", fileType, "extension:", extension);
      return NextResponse.json(
        { error: "Unsupported file type. Please upload PDF, DOCX, or TXT files." },
        { status: 400 }
      );
    }

    const elapsed = Date.now() - startTime;
    console.log(`[Upload] Processed in ${elapsed}ms, extracted ${text.length} characters`);

    if (!text.trim()) {
      return NextResponse.json(
        { error: "No readable text found in this file. If it is a scanned PDF or image-only document, please copy and paste the text directly." },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });

  } catch (error) {
    const elapsed = Date.now() - startTime;
    console.error(`[Upload] Failed after ${elapsed}ms:`, error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        error: error instanceof Error && error.message.startsWith("Failed to")
          ? error.message
          : "Failed to process file. Please try again.",
      },
      { status: 500 }
    );
  }
}
