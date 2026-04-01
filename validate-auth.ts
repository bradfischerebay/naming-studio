/**
 * Quick validation script to test Chomsky token generation
 * Run with: npx tsx validate-auth.ts
 */

async function validateAuth() {
  console.log("Chomsky Authentication Validation");
  console.log("=".repeat(60));

  const tokenEndpoint = "https://dcputilityexecutorsvc.vip.qa.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run";

  console.log("\n1. Testing token endpoint reachability...");
  console.log(`   Endpoint: ${tokenEndpoint}`);

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appName: "chomskygw",
      }),
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("\n❌ Token generation failed!");
      console.error(`   Error: ${errorText}`);
      console.error("\n   Troubleshooting:");
      console.error("   - Are you connected to eBay VPN?");
      console.error("   - Is the token service accessible?");
      process.exit(1);
    }

    const data = await response.json();

    if (!data.outputData?.appToken) {
      console.error("\n❌ No token in response!");
      console.error(`   Response: ${JSON.stringify(data, null, 2)}`);
      process.exit(1);
    }

    const token = data.outputData.appToken;
    console.log(`   ✅ Token received (length: ${token.length})`);
    console.log(`   Token preview: ${token.substring(0, 20)}...`);

    console.log("\n2. Testing Chomsky API endpoint...");

    const chomskyEndpoint = "https://chomskygw.vip.qa.ebay.com/api/v1/genai";
    const modelName = "gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox";

    const apiResponse = await fetch(chomskyEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-genai-api-provider": "azure",
        "X-EBAY-USER-ID": process.env.USER || "naming-studio",
        "X-EBAY-CHOMSKY-MODEL-NAME": modelName,
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "user",
            content: "Say 'Authentication successful!' if you can read this.",
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    console.log(`   Status: ${apiResponse.status} ${apiResponse.statusText}`);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("\n❌ Chomsky API call failed!");
      console.error(`   Error: ${errorText}`);
      process.exit(1);
    }

    const apiData = await apiResponse.json();
    const content = apiData.choices?.[0]?.message?.content || apiData.content || "";

    console.log(`   ✅ API call successful`);
    console.log(`   Response: ${content}`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ All validation checks passed!");
    console.log("\nNext steps:");
    console.log("1. Run full test: npx tsx test-chomsky.ts");
    console.log("2. Or start dev server: npm run dev");

  } catch (error) {
    console.error("\n❌ Validation failed with error:");
    console.error(error);
    console.error("\nTroubleshooting:");
    console.error("- Ensure you're connected to eBay VPN");
    console.error("- Check network connectivity");
    console.error("- Verify the endpoints are correct");
    process.exit(1);
  }
}

validateAuth();
