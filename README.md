# eBay AI Naming Studio & Eval Lab

An internal governance application designed to evaluate product naming briefs using a modular DAG architecture with eBay's Chomsky LLM gateway.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Connected to eBay VPN (required for Chomsky gateway access)

### Setup

```bash
cd ~/naming-studio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Modular DAG Architecture (3 Steps)

**Step 1: The Gatekeeper (LLM via `generateObject`)**
- Evaluates brief against 6 strict architectural gates (G0-G5)
- Uses Zod schema for structured output
- Returns Pass/Fail/Pending/Unknown for each gate

**Step 2: The Scorer (LLM via `generateObject` - CONDITIONAL)**
- Only runs if ALL gates pass
- Scores on 5 criteria (Standalone, Longevity, Legal, Global, Clarity)
- Total possible: 70 points, Threshold: 60 points

**Step 3: The Verdict Engine (TypeScript Logic)**
- Pure TypeScript function (NO LLM)
- Returns one of 4 exact verdicts based on gate/score results

### Gate Criteria

| Gate | Criterion | Pass | Fail |
|------|-----------|------|------|
| G0 | Interaction Model | User-visible | Invisible background |
| G1 | Integration Level | Distinct enrollment | Embedded in flows |
| G2 | UX & Service Boundary | Distinct environment | Feature/button |
| G3 | Strategic Lifespan | >12 months | Temporary |
| G4 | Portfolio Alignment | No collisions | Naming conflicts |
| G5 | Legal & Localization | No red flags | Trademark/regulatory issues |

## 📊 Testing

Test with the three baseline briefs from `/data/mockBriefs.ts`:
1. **CITA** - Expected: ❌ No Proper Name Needed
2. **Managed Shipping** - Expected: ❌ No Proper Name Needed  
3. **Carrier Network** - Expected: ❌ No Proper Name Needed

## 🔧 Configuration

The app uses eBay's internal Chomsky gateway. Make sure you're on eBay VPN.

`.env.local`:
```bash
CHOMSKY_ENDPOINT=https://chomskygw.vip.qa.ebay.com/api/v1/genai
CHOMSKY_MODEL=gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox
```

---

**Built by**: Brad Fischer  
**Status**: MVP Development  
**Last Updated**: April 2026
