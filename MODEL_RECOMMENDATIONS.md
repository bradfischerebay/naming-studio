# AI Sandbox Model Recommendations for Naming Studio

## Executive Summary

After analyzing all available models in eBay's AI Sandbox, here are the recommendations for the Naming Studio app:

**Top Pick: GPT-5.2** - Best balance of reasoning quality and rate limits (180 req/min)

## Model Comparison

| Model | Type | Context | Rate Limit | Tool Calling | Best For |
|-------|------|---------|------------|--------------|----------|
| **GPT-5.2** ⭐ | Reasoning | 400K | 180/min | ✅ | **RECOMMENDED** - Complex decisions with high throughput |
| Claude Sonnet 4.6 | Chat | 1M | 6/min | ✅ | Highest quality, low-traffic use cases |
| Claude Opus 4.6 | Chat | 1M | 6/min | ✅ | Premium quality, very low traffic |
| GPT-5.2 Chat | Fast Chat | 128K | 180/min | ✅ | Speed-optimized conversational |
| Gemini 3.1 Pro | Chat | 1M | 300/min | ✅ | Maximum throughput |
| GPT-5.1 | Reasoning | 400K | 180/min | ✅ | Slightly older reasoning model |
| GPT-4.1 | Chat | 1M | 180/min | ✅ | Legacy fallback |

## Why GPT-5.2 is Recommended

### Pros:
1. **Reasoning Model** - Optimized for complex decision-making (perfect for gate evaluation)
2. **High Rate Limit** - 180 requests/min (30x better than Claude's 6/min)
3. **Large Context** - 400K tokens (more than enough for naming briefs)
4. **Tool Calling Support** - Structured outputs work perfectly
5. **Latest Release** - December 2025, cutting-edge capabilities

### Claude Rate Limit Warning:
Claude models are **only 6 requests per minute**. For the Naming Studio:
- Eval Lab with 3 test briefs = 6 API calls
- **You'd hit the limit immediately!**
- With 6/min, only ~86 evaluations per day possible
- GPT-5.2 allows ~25,920 evaluations per day

## Detailed Model Analysis

### GPT-5 Family (Azure OpenAI)

**GPT-5.2** (Latest - Dec 2025)
- Model: `azure-chat-completions-gpt-5-2-2025-12-11-sandbox`
- **Best for:** Complex reasoning with high throughput
- Context: 400K tokens
- Rate: 180 req/min
- Tool calling: ✅

**GPT-5.2 Chat**
- Model: `azure-chat-completions-gpt-5-2-chat-2025-12-11-sandbox`
- **Best for:** Fast conversational responses
- Context: 128K tokens (smaller but faster)
- Rate: 180 req/min
- Tool calling: ✅

**GPT-5.1** (Nov 2025)
- Model: `azure-chat-completions-gpt-5-1-2025-11-13-sandbox`
- Context: 400K tokens
- Rate: 180 req/min

**GPT-5** (Aug 2025)
- Model: `azure-chat-completions-gpt-5-2025-08-07-sandbox`
- Context: 400K tokens
- Rate: 180 req/min

### Claude Family (Anthropic via GCP)

**Claude Sonnet 4.6** (Latest)
- Model: `gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox`
- **Best for:** Highest quality structured reasoning (low traffic only)
- Context: 1M tokens (largest available!)
- Rate: **6 req/min** ⚠️
- Tool calling: ✅
- **Use case:** Manual testing, demo presentations

**Claude Opus 4.6**
- Model: `gcp-chat-completions-anthropic-claude-opus-4.6-sandbox`
- **Best for:** Premium quality analysis
- Context: 1M tokens
- Rate: **6 req/min** ⚠️
- **Cost:** Most expensive option

**Claude Sonnet 4.5**
- Model: `gcp-chat-completions-anthropic-claude-sonnet-4.5-sandbox`
- Context: 200K tokens
- Rate: **6 req/min** ⚠️

**Claude Haiku 4.5**
- Model: `gcp-chat-completions-anthropic-claude-haiku-4.5-sandbox`
- **Best for:** Budget option (still limited by 6/min)
- Context: 200K tokens
- Rate: **6 req/min** ⚠️

### Gemini Family (Google GCP)

**Gemini 3.1 Pro** (Latest)
- Model: `gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox`
- **Best for:** Maximum throughput + large context
- Context: 1M tokens
- Rate: **300 req/min** (highest!)
- Tool calling: ✅
- **Use case:** High-volume production workloads

**Gemini 3.1 Flash Lite**
- Model: `gcp-chat-completions-chat-gemini-3.1-flash-lite-preview-sandbox`
- **Best for:** Ultra-fast responses
- Context: 1M tokens
- Rate: **300 req/min**
- Tool calling: ✅

**Gemini 2.5 Pro**
- Model: `gcp-chat-completions-chat-gemini-2.5-pro-sandbox`
- Context: 1M tokens
- Rate: 60 req/min
- Tool calling: ✅

## Reasoning Models vs Chat Models

### Reasoning Models (o-series, GPT-5 family)
- **Purpose:** Complex multi-step reasoning, logic puzzles, coding, math
- **Architecture:** Additional "thinking" phase before response
- **Best for:** Gate evaluation, scoring logic, complex decision trees
- **Models:** GPT-5, GPT-5.1, GPT-5.2, o3-mini, o4-mini

### Chat Models (Standard)
- **Purpose:** General conversation, quick responses
- **Architecture:** Direct response generation
- **Best for:** Brand Coach chat, simple queries
- **Models:** GPT-5.2 Chat, Claude Sonnet 4.6, Gemini 3.1 Pro

## Configuration Recommendation

### For Production (High Traffic):
```bash
# Primary: GPT-5.2 for evaluation API
CHOMSKY_MODEL=azure-chat-completions-gpt-5-2-2025-12-11-sandbox

# Alternative: Gemini 3.1 Pro if you need even more throughput
# CHOMSKY_MODEL=gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox
```

### For Demo/Manual Testing (Quality over Speed):
```bash
# Claude Sonnet 4.6 for highest quality
CHOMSKY_MODEL=gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox
```

### For Brand Coach Chat Only:
```bash
# Faster chat-optimized model
CHOMSKY_MODEL=azure-chat-completions-gpt-5-2-chat-2025-12-11-sandbox
```

## Testing Different Models

To test a model:

1. Update your `.env`:
   ```bash
   CHOMSKY_MODEL=azure-chat-completions-gpt-5-2-2025-12-11-sandbox
   ```

2. Restart dev server:
   ```bash
   npm run dev
   ```

3. Run evaluation with test brief

4. Compare results quality and speed

## Rate Limit Math

### Eval Lab (3 briefs):
- Each evaluation = 2 API calls (Gatekeeper + Scorer)
- 3 briefs × 2 = **6 API calls**

**Claude:** 6/min = ✅ Barely fits, no room for reassessments or chat
**GPT-5.2:** 180/min = ✅ Can run 30 full evaluations per minute
**Gemini 3.1:** 300/min = ✅ Can run 50 full evaluations per minute

### With Reassessment Loop:
- Evaluation + 1 reassessment = 4 API calls per brief
- 3 briefs × 4 = **12 API calls**

**Claude:** 6/min = ❌ Would take 2 minutes
**GPT-5.2:** 180/min = ✅ 15 full cycles per minute
**Gemini 3.1:** 300/min = ✅ 25 full cycles per minute

## Model Selection Decision Tree

```
Are you running Eval Lab with 3+ briefs?
├─ Yes
│  └─ Need highest quality results?
│     ├─ Yes → GPT-5.2 (or Gemini 3.1 Pro)
│     └─ No  → GPT-5.2 Chat (faster)
│
└─ No (Single evaluations only)
   └─ Want absolute best quality?
      ├─ Yes → Claude Sonnet 4.6
      └─ No  → GPT-5.2
```

## Performance Expectations

| Model | Avg Response Time | Quality (1-10) | Cost (relative) |
|-------|------------------|----------------|-----------------|
| GPT-5.2 | ~2-3 sec | 9.5/10 | $$$ |
| GPT-5.2 Chat | ~1-2 sec | 8.5/10 | $$ |
| Claude Sonnet 4.6 | ~3-4 sec | 10/10 | $$$$ |
| Claude Opus 4.6 | ~4-5 sec | 10/10 | $$$$$ |
| Gemini 3.1 Pro | ~1-2 sec | 9/10 | $$ |
| Gemini 3.1 Flash Lite | ~0.5-1 sec | 8/10 | $ |

## Additional Resources

- [AI Sandbox Documentation](https://go/aisandbox)
- [Model Comparison Sheet](https://docs.google.com/spreadsheets/...)
- [Rate Limit Dashboard](https://chomskygw.vip.qa.ebay.com/dashboard)

## Summary

**Use GPT-5.2 for production.** It offers the best combination of:
- ✅ Reasoning capabilities for complex gate evaluation
- ✅ High rate limits (180/min vs Claude's 6/min)
- ✅ Large context (400K tokens)
- ✅ Tool calling support
- ✅ Latest model (Dec 2025)

**Use Claude Sonnet 4.6 only for:**
- Manual demo presentations
- One-off high-stakes evaluations
- Quality comparisons/benchmarking

**Avoid Claude 3.7 Sonnet** - it's outdated compared to 4.6 and newer GPT/Gemini models.
