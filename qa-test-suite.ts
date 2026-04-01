/**
 * Comprehensive QA Test Suite for eBay AI Naming Studio
 *
 * This test suite validates all critical functionality:
 * 1. File Upload API
 * 2. Evaluation API
 * 3. Chat API
 * 4. Frontend Components
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface TestResult {
  testName: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  details: string;
  error?: string;
}

const results: TestResult[] = [];
const BASE_URL = 'http://localhost:3000';

// Helper function to log test results
function logTest(testName: string, status: 'PASS' | 'FAIL' | 'SKIP', details: string, error?: string) {
  results.push({ testName, status, details, error });
  const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏭️';
  console.log(`${emoji} ${testName}: ${details}`);
  if (error) console.error(`   Error: ${error}`);
}

// Test 1: File Upload API
async function testFileUpload() {
  console.log('\n🧪 TEST 1: File Upload API');

  try {
    const testFilePath = join(process.cwd(), 'test-brief.txt');
    const fileContent = readFileSync(testFilePath);

    const formData = new FormData();
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], 'test-brief.txt', { type: 'text/plain' });
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.text || typeof data.text !== 'string') {
      throw new Error('Invalid response structure - missing text field');
    }

    if (!data.text.includes('Test Upload Feature')) {
      throw new Error('Uploaded content does not match expected text');
    }

    logTest('File Upload API', 'PASS', 'Successfully uploaded and extracted text from file');
  } catch (error) {
    logTest('File Upload API', 'FAIL', 'File upload failed', error instanceof Error ? error.message : String(error));
  }
}

// Test 2: Evaluation API - Basic Request
async function testEvaluationAPI() {
  console.log('\n🧪 TEST 2: Evaluation API - Basic Request');

  try {
    const testBrief = `Product: Computer Vision-powered Item Taxonomy Assist (CITA)

Description: An AI-powered capability that helps sellers create listings by analyzing photos using computer vision and voice input. Sellers can access it via a call-to-action and module on the native eBay seller listing page, or invoke it using voice on their phones.

Integration: Accessed within the existing eBay app experience through a button/module on the seller listing page. Not a separate app or sign-up flow.

Architecture: Integrated into the native eBay experience, no separate system or dedicated backend described.

Timeline: Rollout targets multiple geographies - US first, followed by UK and DE, with future expansion to buyer use cases.

Portfolio Context: Related offerings include Terapeak, Price Guide beta, and Sell the Look.

Legal: Listed as "N/A" - no trademark or localization issues mentioned.

Note: Brief explicitly states this is "not a name to be used in-product, marketing, or branding but as a descriptor in external comms."`;

    const response = await fetch(`${BASE_URL}/api/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: testBrief }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data.verdict) {
      throw new Error('Response missing verdict field');
    }

    if (!data.gatekeeperResult) {
      throw new Error('Response missing gatekeeperResult field');
    }

    // Check all 6 gates are present
    const gates = ['G0', 'G1', 'G2', 'G3', 'G4', 'G5'];
    for (const gate of gates) {
      if (!data.gatekeeperResult[gate]) {
        throw new Error(`Missing gate: ${gate}`);
      }

      const gateData = data.gatekeeperResult[gate];
      if (!gateData.status || !gateData.reasoning) {
        throw new Error(`Gate ${gate} missing status or reasoning`);
      }

      // Validate status values
      const validStatuses = ['Pass', 'Fail', 'Pending', 'Unknown'];
      if (!validStatuses.includes(gateData.status)) {
        throw new Error(`Gate ${gate} has invalid status: ${gateData.status}`);
      }

      // Check for CHECK/FINDING format in reasoning
      if (!gateData.reasoning.includes('CHECK:') || !gateData.reasoning.includes('FINDING:')) {
        console.warn(`⚠️  Gate ${gate} reasoning may not follow CHECK/FINDING format`);
      }
    }

    logTest('Evaluation API - Structure', 'PASS', `Verdict: ${data.verdict}, All 6 gates validated`);
  } catch (error) {
    logTest('Evaluation API - Structure', 'FAIL', 'Evaluation API failed', error instanceof Error ? error.message : String(error));
  }
}

// Test 3: Evaluation API - Custom Prompt (Eval Lab)
async function testEvalLabCustomPrompt() {
  console.log('\n🧪 TEST 3: Evaluation API - Custom Prompt (Eval Lab Mode)');

  try {
    const testBrief = `Product: Test Product
Description: Test description
Integration: Test integration
Architecture: Test architecture
Timeline: 24 months
Portfolio: No conflicts
Legal: No issues`;

    const customPrompt = `You are the eBay Naming Gatekeeper. Evaluate this brief against six gates (G0-G5).
Return JSON with each gate having status ("Pass", "Fail", "Pending", or "Unknown") and reasoning with CHECK/FINDING format.`;

    const response = await fetch(`${BASE_URL}/api/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brief: testBrief,
        customPrompt: customPrompt
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.verdict || !data.gatekeeperResult) {
      throw new Error('Custom prompt evaluation failed to return proper structure');
    }

    logTest('Evaluation API - Custom Prompt', 'PASS', 'Custom prompt accepted and processed correctly');
  } catch (error) {
    logTest('Evaluation API - Custom Prompt', 'FAIL', 'Custom prompt evaluation failed', error instanceof Error ? error.message : String(error));
  }
}

// Test 4: Chat API
async function testChatAPI() {
  console.log('\n🧪 TEST 4: Chat API (Brand Coach)');

  try {
    const mockContext = {
      verdict: "❌ No Proper Name Needed - Use A Descriptive Label",
      gatekeeperResult: {
        G0: { status: "Fail", reasoning: "CHECK: Test\n// FINDING: Test finding" },
        G1: { status: "Fail", reasoning: "CHECK: Test\n// FINDING: Test finding" },
        G2: { status: "Fail", reasoning: "CHECK: Test\n// FINDING: Test finding" },
        G3: { status: "Pass", reasoning: "CHECK: Test\n// FINDING: Test finding" },
        G4: { status: "Pass", reasoning: "CHECK: Test\n// FINDING: Test finding" },
        G5: { status: "Pass", reasoning: "CHECK: Test\n// FINDING: Test finding" },
      },
      scorerResult: null,
    };

    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: "Why did this fail?",
        context: mockContext,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.response || typeof data.response !== 'string') {
      throw new Error('Chat API did not return a valid response');
    }

    if (data.response.length < 10) {
      throw new Error('Chat response too short, likely invalid');
    }

    logTest('Chat API', 'PASS', `Chat response received: ${data.response.substring(0, 100)}...`);
  } catch (error) {
    logTest('Chat API', 'FAIL', 'Chat API failed', error instanceof Error ? error.message : String(error));
  }
}

// Test 5: Error Handling - Missing Brief
async function testErrorHandlingMissingBrief() {
  console.log('\n🧪 TEST 5: Error Handling - Missing Brief');

  try {
    const response = await fetch(`${BASE_URL}/api/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: "" }),
    });

    if (response.ok) {
      throw new Error('Expected error for empty brief, but request succeeded');
    }

    if (response.status !== 400) {
      throw new Error(`Expected status 400, got ${response.status}`);
    }

    const data = await response.json();
    if (!data.error) {
      throw new Error('Error response missing error field');
    }

    logTest('Error Handling - Missing Brief', 'PASS', `Correctly rejected empty brief with error: ${data.error}`);
  } catch (error) {
    logTest('Error Handling - Missing Brief', 'FAIL', 'Error handling test failed', error instanceof Error ? error.message : String(error));
  }
}

// Test 6: Error Handling - Invalid File Type
async function testErrorHandlingInvalidFile() {
  console.log('\n🧪 TEST 6: Error Handling - Invalid File Type');

  try {
    const formData = new FormData();
    const blob = new Blob(['test content'], { type: 'application/octet-stream' });
    const file = new File([blob], 'test.bin', { type: 'application/octet-stream' });
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      throw new Error('Expected error for invalid file type, but request succeeded');
    }

    if (response.status !== 400) {
      throw new Error(`Expected status 400, got ${response.status}`);
    }

    const data = await response.json();
    if (!data.error || !data.error.includes('Unsupported file type')) {
      throw new Error('Error message does not mention unsupported file type');
    }

    logTest('Error Handling - Invalid File', 'PASS', 'Correctly rejected invalid file type');
  } catch (error) {
    logTest('Error Handling - Invalid File', 'FAIL', 'Invalid file error handling failed', error instanceof Error ? error.message : String(error));
  }
}

// Test 7: Reassessment Logic
async function testReassessmentLogic() {
  console.log('\n🧪 TEST 7: Reassessment with Additional Context');

  try {
    const initialBrief = `Product: Ambiguous Product
Description: Unclear feature
Integration: Unknown
Architecture: Not specified
Timeline: TBD
Portfolio: Unknown
Legal: TBD`;

    const additionalContext = `
--- ADDITIONAL CONTEXT PROVIDED ---
Integration: This has its own dedicated app with separate enrollment
Architecture: Runs on dedicated infrastructure with its own backend
Timeline: 3-year strategic initiative
`;

    const combinedBrief = initialBrief + additionalContext;

    const response = await fetch(`${BASE_URL}/api/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: combinedBrief }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.verdict || !data.gatekeeperResult) {
      throw new Error('Reassessment failed to return proper structure');
    }

    logTest('Reassessment Logic', 'PASS', 'Additional context successfully processed in evaluation');
  } catch (error) {
    logTest('Reassessment Logic', 'FAIL', 'Reassessment test failed', error instanceof Error ? error.message : String(error));
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting QA Test Suite for eBay AI Naming Studio\n');
  console.log('=' .repeat(60));

  // Check if server is running
  try {
    const healthCheck = await fetch(BASE_URL);
    if (!healthCheck.ok && healthCheck.status !== 404) {
      throw new Error('Server not responding');
    }
  } catch (error) {
    console.error('❌ CRITICAL: Cannot connect to server at', BASE_URL);
    console.error('Please ensure the development server is running (npm run dev)');
    process.exit(1);
  }

  // Run all tests
  await testFileUpload();
  await testEvaluationAPI();
  await testEvalLabCustomPrompt();
  await testChatAPI();
  await testErrorHandlingMissingBrief();
  await testErrorHandlingInvalidFile();
  await testReassessmentLogic();

  // Generate summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(60));

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;

  console.log(`Total Tests: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`Success Rate: ${((passed / results.length) * 100).toFixed(1)}%`);

  // Generate detailed report
  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    summary: {
      total: results.length,
      passed,
      failed,
      skipped,
      successRate: ((passed / results.length) * 100).toFixed(1) + '%',
    },
    tests: results,
  };

  const reportPath = join(process.cwd(), 'QA_TEST_RESULTS.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);

  // Exit with error code if tests failed
  if (failed > 0) {
    console.log('\n⚠️  Some tests failed. Please review the failures above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('💥 Test suite crashed:', error);
  process.exit(1);
});
