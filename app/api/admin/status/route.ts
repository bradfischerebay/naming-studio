import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const providedKey = searchParams.get('key');

  // Check authentication
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authenticated = !adminPassword || providedKey === adminPassword;

  // Check which integrations are configured
  const chomsky = {
    configured: !!(process.env.CHOMSKY_ENDPOINT && process.env.CHOMSKY_MODEL),
    endpoint: process.env.CHOMSKY_MODEL || null,
  };

  const redis = {
    configured: !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  };

  const deepsights = {
    configured: !!process.env.DEEPSIGHTS_API_KEY,
  };

  const glean = {
    configured: !!process.env.GLEAN_API_TOKEN,
  };

  const slack = {
    configured: !!process.env.SLACK_WEBHOOK_URL,
  };

  const jira = {
    configured: !!(process.env.JIRAP_API_TOKEN && process.env.JIRAP_PROJECT_KEY),
    projectKey: process.env.JIRAP_PROJECT_KEY || null,
  };

  const ebayApi = {
    configured: !!(process.env.EBAY_APP_ID && process.env.EBAY_CERT_ID),
  };

  const vp2Embeddings = {
    configured: chomsky.configured, // Uses same Chomsky gateway
  };

  return NextResponse.json({
    authenticated,
    integrations: {
      chomsky,
      redis,
      deepsights,
      glean,
      slack,
      jira,
      ebayApi,
      vp2Embeddings,
    },
  });
}
