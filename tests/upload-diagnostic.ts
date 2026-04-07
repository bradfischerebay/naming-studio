/**
 * Upload Diagnostic Script
 *
 * Run this to test upload reliability in a live environment.
 * This script simulates the bug scenario: rapid consecutive uploads.
 *
 * Usage:
 *   npm run dev (in another terminal)
 *   npx tsx tests/upload-diagnostic.ts
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface UploadResult {
  attempt: number;
  success: boolean;
  status: number;
  elapsed: number;
  error?: string;
  textLength?: number;
}

async function uploadFile(
  filePath: string,
  attemptNumber: number
): Promise<UploadResult> {
  const startTime = Date.now();

  try {
    const fs = await import("fs");
    const path = await import("path");

    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    // Determine MIME type
    let mimeType = "text/plain";
    if (fileName.endsWith(".pdf")) {
      mimeType = "application/pdf";
    } else if (fileName.endsWith(".docx")) {
      mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    const formData = new FormData();
    const file = new File([fileBuffer], fileName, { type: mimeType });
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const elapsed = Date.now() - startTime;
    const data = await response.json();

    if (response.ok) {
      return {
        attempt: attemptNumber,
        success: true,
        status: response.status,
        elapsed,
        textLength: data.text?.length || 0,
      };
    } else {
      return {
        attempt: attemptNumber,
        success: false,
        status: response.status,
        elapsed,
        error: data.error || "Unknown error",
      };
    }
  } catch (error) {
    const elapsed = Date.now() - startTime;
    return {
      attempt: attemptNumber,
      success: false,
      status: 0,
      elapsed,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runDiagnostics() {
  console.log("🔍 Upload Reliability Diagnostic");
  console.log("================================\n");

  // Create a test file
  const fs = await import("fs");
  const path = await import("path");
  const os = await import("os");

  const testFilePath = path.join(os.tmpdir(), "test-brief.txt");
  const testContent = `
Product Naming Brief

Initiative: eBay AI Assistant
Description: An AI-powered assistant to help sellers create better listings.
Target Markets: US, UK, Germany
Expected Launch: Q2 2026
Strategic Importance: High - Multi-year initiative
  `.trim();

  fs.writeFileSync(testFilePath, testContent);

  console.log(`📝 Test file created: ${testFilePath}`);
  console.log(`   Content length: ${testContent.length} characters\n`);

  // Test 1: Single upload
  console.log("Test 1: Single upload (baseline)");
  console.log("-".repeat(50));
  const singleResult = await uploadFile(testFilePath, 1);
  console.log(
    `  Attempt ${singleResult.attempt}: ${
      singleResult.success ? "✅ SUCCESS" : "❌ FAILED"
    } (${singleResult.elapsed}ms)`
  );
  if (singleResult.success) {
    console.log(`  Extracted ${singleResult.textLength} characters`);
  } else {
    console.log(`  Error: ${singleResult.error}`);
  }
  console.log();

  // Wait a bit to avoid rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Test 2: Three rapid consecutive uploads (the bug scenario)
  console.log("Test 2: Three rapid consecutive uploads (bug scenario)");
  console.log("-".repeat(50));

  const rapidResults = await Promise.allSettled([
    uploadFile(testFilePath, 1),
    uploadFile(testFilePath, 2),
    uploadFile(testFilePath, 3),
  ]);

  let successCount = 0;
  let failCount = 0;

  rapidResults.forEach((result, index) => {
    if (result.status === "fulfilled") {
      const upload = result.value;
      const icon = upload.success ? "✅" : "❌";
      console.log(
        `  Attempt ${upload.attempt}: ${icon} ${
          upload.success ? "SUCCESS" : "FAILED"
        } (${upload.elapsed}ms)`
      );
      if (upload.success) {
        successCount++;
        console.log(`    Extracted ${upload.textLength} characters`);
      } else {
        failCount++;
        console.log(`    Error: ${upload.error}`);
      }
    } else {
      failCount++;
      console.log(`  Attempt ${index + 1}: ❌ REJECTED - ${result.reason}`);
    }
  });

  console.log();
  console.log("Results Summary");
  console.log("=".repeat(50));
  console.log(`  Total attempts: 3`);
  console.log(`  Successful: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
  console.log(
    `  Success rate: ${((successCount / 3) * 100).toFixed(1)}%`
  );

  if (successCount === 3) {
    console.log("\n✅ ALL TESTS PASSED - Upload is 100% reliable!");
  } else if (successCount === 1 && failCount === 2) {
    console.log(
      "\n❌ BUG DETECTED - Only 1/3 uploads succeeded (race condition present)"
    );
  } else {
    console.log(
      "\n⚠️  PARTIAL SUCCESS - Some uploads failed (may indicate rate limiting or other issues)"
    );
  }

  // Cleanup
  fs.unlinkSync(testFilePath);
  console.log(`\n🧹 Test file cleaned up`);
}

// Run diagnostics
runDiagnostics().catch((error) => {
  console.error("Diagnostic failed:", error);
  process.exit(1);
});
