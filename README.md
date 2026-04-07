# eBay AI Naming Studio & Eval Lab

An internal governance application designed to evaluate product naming briefs using a hybrid agent system with eBay's Chomsky LLM gateway.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- eBay VPN connection (required for Chomsky gateway access)

### Setup

```bash
cd ~/naming-studio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Tests

```bash
npm test                  # Run all tests (37+ tests)
npm run test:ui          # Interactive test UI
npm run test:coverage    # Coverage report
```

## 📚 Documentation

**For comprehensive documentation, see [CLAUDE.md](./CLAUDE.md)** - the complete developer guide covering:

- Agent dispatch protocol for complex tasks
- Full architecture overview (3-step DAG)
- Development setup and VPN requirements
- Testing procedures and best practices
- API reference and usage examples
- Model selection guide (GPT-5, Claude 4.6, Gemini)
- Configuration and business rules
- Deployment and troubleshooting

### Additional Resources

- **[docs/AGENT_README.md](./docs/AGENT_README.md)** - Deep dive into modules and data flow
- **[docs/USAGE_EXAMPLES.md](./docs/USAGE_EXAMPLES.md)** - Code examples and patterns
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Production deployment guide
- **[docs/IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md)** - Architecture decisions

## 🏗️ Architecture Overview

### Hybrid Design: LLM + Deterministic Logic

**LLM-Powered** (Semantic Understanding):
- Brief parsing, landscape research, fact extraction, question generation

**Deterministic TypeScript** (Business Logic):
- Gate evaluation (G0-G5), scoring calculation (0-70 points), verdict routing (PATH_A0/A1/A2/B/C)

### The 6 Gates (G0-G5)

| Gate | Criterion | Pass | Fail |
|------|-----------|------|------|
| G0 | Interaction Model | User actively selects/sees | Invisible background |
| G1 | Integration Level | Standalone app | Embedded feature |
| G2 | Standalone Architecture | Distinct service | Shared platform |
| G3 | Strategic Lifespan | ≥12 months | <12 months |
| G4 | Portfolio Alignment | No collisions | Name conflicts |
| G5 | Legal & Localization | No blockers | Trademark/regulatory issues |

### The 5 Verdict Paths

1. **PATH_A0** - Do Not Name (G0 Fail: no user interaction)
2. **PATH_A1** - No Proper Name (Gate failure)
3. **PATH_A2** - No Proper Name (Score < 60)
4. **PATH_B** - Need More Information (Missing data)
5. **PATH_C** - Proceed With Naming (All pass + Score ≥ 60)

## 🔧 Configuration

Create `.env.local`:

```bash
# Chomsky LLM Gateway
CHOMSKY_ENDPOINT=https://chomskygw.vip.qa.ebay.com/api/v1/genai

# Model Selection (recommended: GPT-5.2)
CHOMSKY_MODEL=azure-chat-completions-gpt-5-2-2025-12-11-sandbox

# Alternative Models:
# CHOMSKY_MODEL=gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox
# CHOMSKY_MODEL=gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox
```

See [CLAUDE.md > Model Selection](./CLAUDE.md#model-selection) for detailed guidance.

## 📊 Testing

```bash
npm test                # Run all 37+ tests
npm test evaluator      # Run gate evaluation tests
npm test scorer         # Run scoring tests
npm test verdict        # Run verdict routing tests
```

Test with baseline briefs from `/data/mockBriefs.ts`.

---

**Built by**: Brad Fischer  
**Version**: 2.0  
**Status**: Production Ready  
**Tests**: 37+ passing (100% coverage on deterministic logic)  
**Last Updated**: April 2026

**For complete documentation, see [CLAUDE.md](./CLAUDE.md)**
