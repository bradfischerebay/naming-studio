/**
 * Test File Generator
 *
 * Generates test files for upload testing (PDF, DOCX, TXT)
 * Run: npx tsx tests/test-file-generator.ts
 */

import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const TEST_FILES_DIR = path.join(os.tmpdir(), "naming-studio-test-files");

// Sample naming brief content
const SAMPLE_BRIEFS = {
  valid_high_score: `
Product Naming Brief: eBay AI Listing Assistant

Initiative Overview:
eBay AI Listing Assistant is a standalone product that helps sellers create high-quality product listings using artificial intelligence. It operates as a separate service with its own enrollment process and dedicated user interface.

User Interaction Model (G0):
Sellers actively access the AI Assistant through a dedicated entry point in the seller hub. The tool provides an interactive interface where sellers can input product details, review AI-generated suggestions, and edit listings before publishing.

Integration & Entry Point (G1):
The AI Assistant has its own enrollment flow requiring sellers to opt-in and agree to AI usage terms. Sellers access it through a dedicated "AI Assistant" section with its own navigation and onboarding experience.

System Architecture (G2):
Built as a microservice with dedicated backend infrastructure, the AI Assistant establishes a distinct user environment with personalized settings, history, and preferences separate from the main listing flow.

Strategic Timeline (G3):
This is a multi-year strategic initiative planned to launch in Q2 2026 with a 5-year roadmap including expanded AI capabilities, integration with more listing types, and international rollout.

Portfolio Position (G4):
The name "AI Listing Assistant" clearly differentiates this from eBay's existing tools like "Quick Listing" and "Listing Builder" while maintaining brand consistency with the eBay family.

Legal & Global Readiness (G5):
Preliminary trademark searches show no conflicts in target markets (US, UK, Germany, France, Japan). The term "AI Assistant" is descriptive enough to avoid trademark issues while being specific to eBay's implementation. Localization team confirms the concept translates well across all target languages.

Target Markets:
- United States
- United Kingdom
- Germany
- France
- Japan

Strategic Importance: High
Expected Launch: Q2 2026
Business Owner: Sarah Chen, VP Product
Budget: $15M (Year 1)
`,

  valid_medium_score: `
Product Naming Brief: eBay Quick Ship Plus

Initiative: eBay Quick Ship Plus is an enhancement to eBay's shipping services that provides sellers with discounted rates and priority handling for fast shipping options.

User Interaction: Sellers can opt into Quick Ship Plus through their shipping preferences. The feature is visible during the listing creation process and checkout flow.

Integration: Quick Ship Plus has a separate enrollment page where sellers agree to terms and link their preferred shipping carriers. It maintains its own dashboard for tracking shipments and performance metrics.

Architecture: Operates as a feature layer on top of existing shipping infrastructure but with dedicated backend services for rate calculation and carrier integration.

Timeline: Planned as a permanent addition to eBay's shipping suite with a 3-year initial commitment and expansion roadmap.

Portfolio: Complements existing shipping tools without replacing them. No naming conflicts with current eBay products.

Legal Status: Trademark available in US, UK, Germany. Some localization needed for Asian markets.

Markets: US, UK, Germany, Australia
Launch: Q3 2026
Owner: Mike Rodriguez, Director Shipping
`,

  gate_failure: `
Product Naming Brief: Fast Checkout

We want to add a fast checkout button to product pages that reduces clicks.

This is a temporary 6-month experiment to test if fewer clicks increase conversion.

It will be embedded in the existing checkout flow as an additional button.

No separate sign-up needed - it's just a UI enhancement.

Launch: Next quarter
Owner: Jane Smith
`,

  missing_info: `
Product Naming Brief: eBay Connect

We're building something called eBay Connect. It's going to be great.

It will help users in some way with their eBay experience.

More details coming soon.

Owner: TBD
Launch: TBD
`,
};

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateTXT(content: string, filename: string): string {
  const filepath = path.join(TEST_FILES_DIR, filename);
  fs.writeFileSync(filepath, content);
  return filepath;
}

function generateMinimalPDF(content: string, filename: string): string {
  // Create a minimal valid PDF with the content
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj
4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
5 0 obj
<<
/Length ${content.length + 50}
>>
stream
BT
/F1 10 Tf
50 750 Td
15 TL
${content.split('\n').map(line => `(${line.replace(/[()\\]/g, '\\$&')}) Tj T*`).join('\n')}
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000264 00000 n
0000000337 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${400 + content.length}
%%EOF`;

  const filepath = path.join(TEST_FILES_DIR, filename);
  fs.writeFileSync(filepath, pdfContent);
  return filepath;
}

function generateTestFiles() {
  console.log("🔧 Test File Generator");
  console.log("=".repeat(50));
  console.log();

  ensureDir(TEST_FILES_DIR);

  const generatedFiles: string[] = [];

  // Generate TXT files
  console.log("📝 Generating TXT files...");
  for (const [name, content] of Object.entries(SAMPLE_BRIEFS)) {
    const filepath = generateTXT(content.trim(), `${name}.txt`);
    generatedFiles.push(filepath);
    console.log(`  ✅ Created: ${path.basename(filepath)}`);
  }

  // Generate PDF files
  console.log("\n📄 Generating PDF files...");
  for (const [name, content] of Object.entries(SAMPLE_BRIEFS)) {
    const filepath = generateMinimalPDF(content.trim(), `${name}.pdf`);
    generatedFiles.push(filepath);
    console.log(`  ✅ Created: ${path.basename(filepath)}`);
  }

  // Generate edge case files
  console.log("\n🔬 Generating edge case files...");

  // Empty file
  const emptyFile = path.join(TEST_FILES_DIR, "empty.txt");
  fs.writeFileSync(emptyFile, "");
  generatedFiles.push(emptyFile);
  console.log(`  ✅ Created: empty.txt`);

  // Large file (just under 20MB limit)
  const largeContent = "x".repeat(19 * 1024 * 1024);
  const largeFile = path.join(TEST_FILES_DIR, "large_19mb.txt");
  fs.writeFileSync(largeFile, largeContent);
  generatedFiles.push(largeFile);
  console.log(`  ✅ Created: large_19mb.txt (${(fs.statSync(largeFile).size / 1024 / 1024).toFixed(2)}MB)`);

  // Too large file (over 20MB)
  const tooLargeContent = "x".repeat(21 * 1024 * 1024);
  const tooLargeFile = path.join(TEST_FILES_DIR, "too_large_21mb.txt");
  fs.writeFileSync(tooLargeFile, tooLargeContent);
  generatedFiles.push(tooLargeFile);
  console.log(`  ✅ Created: too_large_21mb.txt (${(fs.statSync(tooLargeFile).size / 1024 / 1024).toFixed(2)}MB)`);

  // Invalid PDF (text file claiming to be PDF)
  const fakePDF = path.join(TEST_FILES_DIR, "fake.pdf");
  fs.writeFileSync(fakePDF, "This is not a real PDF file");
  generatedFiles.push(fakePDF);
  console.log(`  ✅ Created: fake.pdf (invalid magic bytes)`);

  console.log();
  console.log("=".repeat(50));
  console.log(`✅ Generated ${generatedFiles.length} test files`);
  console.log(`📂 Location: ${TEST_FILES_DIR}`);
  console.log();
  console.log("File Categories:");
  console.log("  • valid_high_score.* - Should pass all gates and score >60");
  console.log("  • valid_medium_score.* - Should pass gates but score <60");
  console.log("  • gate_failure.* - Should fail gatekeeper (temporary feature)");
  console.log("  • missing_info.* - Should have Pending/Unknown gates");
  console.log("  • empty.txt - Edge case: zero length");
  console.log("  • large_19mb.txt - Edge case: maximum valid size");
  console.log("  • too_large_21mb.txt - Should reject: exceeds 20MB");
  console.log("  • fake.pdf - Should reject: magic byte validation");
  console.log();
  console.log("Usage:");
  console.log(`  curl -F "file=@${TEST_FILES_DIR}/valid_high_score.txt" http://localhost:3000/api/upload`);
  console.log();
}

// Run generator
try {
  generateTestFiles();
} catch (error) {
  console.error("❌ Error generating test files:", error);
  process.exit(1);
}
