import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getNameChecker, type NameCheckOptions } from "@/lib/modules/name-checker";

/**
 * POST /api/check-names
 *
 * Check product names against:
 * 1. eBay marketplace (existing products)
 * 2. eBay portfolio (internal product conflicts)
 * 3. Trademark database (legal conflicts)
 *
 * Request body:
 * {
 *   "names": string | string[],  // Single name or array of names
 *   "options": {
 *     "checkEbay": boolean,         // Default: true
 *     "checkTrademarks": boolean,   // Default: true
 *     "maxEbayResults": number,     // Default: 20
 *     "useCache": boolean,          // Default: true
 *     "includeRelatedTerms": boolean // Default: false
 *   }
 * }
 *
 * Response:
 * {
 *   "results": NameCheckResult[],
 *   "summary": {
 *     "totalChecked": number,
 *     "available": number,
 *     "conflicts": number,
 *     "highRisk": number
 *   }
 * }
 */

export async function POST(req: NextRequest) {
  // Rate limiting: 20 requests per minute (more generous for batch checks)
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000, // 1 minute
    maxRequests: 20,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: rateLimitResult.headers
      }
    );
  }

  try {
    const body = await req.json();
    const { names, options = {} } = body;

    // Validate input
    if (!names) {
      return NextResponse.json(
        { error: "Missing required field: names" },
        { status: 400 }
      );
    }

    // Normalize to array
    const nameArray = Array.isArray(names) ? names : [names];

    if (nameArray.length === 0) {
      return NextResponse.json(
        { error: "At least one name is required" },
        { status: 400 }
      );
    }

    if (nameArray.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 names per request" },
        { status: 400 }
      );
    }

    // Validate each name
    for (const name of nameArray) {
      if (typeof name !== "string" || name.trim().length === 0) {
        return NextResponse.json(
          { error: "All names must be non-empty strings" },
          { status: 400 }
        );
      }
    }

    console.log(`Checking ${nameArray.length} name(s):`, nameArray);

    // Check names
    const nameChecker = getNameChecker();
    const checkOptions: NameCheckOptions = {
      checkEbay: options.checkEbay !== false, // Default true
      checkTrademarks: options.checkTrademarks !== false, // Default true
      maxEbayResults: options.maxEbayResults || 20,
      useCache: options.useCache !== false, // Default true
      includeRelatedTerms: options.includeRelatedTerms || false,
    };

    let results;
    if (nameArray.length === 1) {
      const result = await nameChecker.checkName(nameArray[0], checkOptions);
      results = [result];
    } else {
      results = await nameChecker.batchCheckNames(nameArray, checkOptions);
    }

    // Calculate summary
    const summary = {
      totalChecked: results.length,
      available: results.filter(r => r.isAvailable).length,
      conflicts: results.filter(r => r.conflicts.length > 0).length,
      highRisk: results.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length,
    };

    return NextResponse.json({
      results,
      summary,
    });

  } catch (error) {
    console.error("Name check error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Handle specific errors
    if (errorMessage.includes("eBay API not configured")) {
      return NextResponse.json(
        {
          error: "eBay API not configured. Set EBAY_APP_ID environment variable.",
          details: errorMessage
        },
        { status: 503 }
      );
    }

    if (errorMessage.includes("rate limit")) {
      return NextResponse.json(
        {
          error: "External API rate limit exceeded. Please try again later.",
          details: errorMessage
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Name check failed. Please try again later." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/check-names?name=<name>
 *
 * Simple GET endpoint for single name checks
 */
export async function GET(req: NextRequest) {
  // Rate limiting
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000,
    maxRequests: 30,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: rateLimitResult.headers
      }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid query parameter: name" },
        { status: 400 }
      );
    }

    console.log(`Checking name: ${name}`);

    const nameChecker = getNameChecker();
    const result = await nameChecker.checkName(name);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Name check error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("eBay API not configured")) {
      return NextResponse.json(
        {
          error: "eBay API not configured. Set EBAY_APP_ID environment variable.",
          details: errorMessage
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Name check failed. Please try again later." },
      { status: 500 }
    );
  }
}
