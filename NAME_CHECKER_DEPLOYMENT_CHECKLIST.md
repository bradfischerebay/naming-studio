# eBay Name Checker - Deployment Checklist

Use this checklist to deploy the name checking system to production.

## Pre-Deployment

### 1. Environment Setup

- [ ] **Get eBay App ID**
  - Visit: https://developer.ebay.com/
  - Create developer account
  - Create new application
  - Copy Application ID (App ID)
  
- [ ] **Configure Environment Variables**
  ```bash
  # Add to .env.local (development)
  EBAY_APP_ID=your_ebay_app_id_here
  
  # Add to production environment (Vercel/hosting)
  EBAY_APP_ID=your_ebay_app_id_here
  ```

- [ ] **Optional: Setup Redis Cache (Recommended for Production)**
  - Get Redis instance from Upstash or Vercel Marketplace
  - Add to environment:
  ```bash
  UPSTASH_REDIS_REST_URL=your_redis_url
  UPSTASH_REDIS_REST_TOKEN=your_redis_token
  ```

### 2. Code Review

- [ ] **Review Core Modules**
  - `/lib/modules/ebay-client.ts` - eBay API integration
  - `/lib/modules/trademark-client.ts` - Trademark checking
  - `/lib/modules/name-checker.ts` - Main orchestration
  - `/lib/modules/name-check-cache.ts` - Caching layer
  - `/lib/modules/g4-integration.ts` - G4 gate helpers

- [ ] **Review API Endpoint**
  - `/app/api/check-names/route.ts` - REST API

- [ ] **Check Tests**
  - `/tests/name-checker.test.ts` - Run test suite
  ```bash
  npm run test tests/name-checker.test.ts
  ```

### 3. Configuration Review

- [ ] **Update eBay Portfolio**
  - Edit `/lib/modules/name-checker.ts`
  - Update `EBAY_PORTFOLIO` array with latest eBay products
  - Current list has 30+ products, verify it's current

- [ ] **Review Rate Limits**
  - API endpoint: 20 req/min (POST), 30 req/min (GET)
  - Adjust if needed in `/app/api/check-names/route.ts`
  - eBay API: 5,000 calls/day (free tier)

- [ ] **Review Cache TTL**
  - Default: 24 hours
  - Adjust if needed in cache initialization

## Testing

### 4. Local Testing

- [ ] **Start Development Server**
  ```bash
  npm run dev
  ```

- [ ] **Test API Endpoint - Single Name**
  ```bash
  curl -X POST http://localhost:3000/api/check-names \
    -H "Content-Type: application/json" \
    -d '{"names": "TestProduct"}'
  ```
  Expected: Valid JSON response with `results` and `summary`

- [ ] **Test API Endpoint - Batch**
  ```bash
  curl -X POST http://localhost:3000/api/check-names \
    -H "Content-Type: application/json" \
    -d '{"names": ["Product1", "Product2"]}'
  ```
  Expected: Array of results, summary with `totalChecked: 2`

- [ ] **Test Portfolio Conflict**
  ```bash
  curl -X POST http://localhost:3000/api/check-names \
    -H "Content-Type: application/json" \
    -d '{"names": "eBay AutoList"}'
  ```
  Expected: `riskLevel: "critical"`, portfolio conflict detected

- [ ] **Test GET Endpoint**
  ```bash
  curl "http://localhost:3000/api/check-names?name=TestProduct"
  ```
  Expected: Single result object

- [ ] **Test Rate Limiting**
  - Send 25 requests in quick succession
  - Expected: 429 status after 20 requests

- [ ] **Test Caching**
  - Call same name twice
  - First: `cachedResult: false`
  - Second: `cachedResult: true`

- [ ] **Run Test Suite**
  ```bash
  npm run test tests/name-checker.test.ts
  ```
  Expected: All tests pass

### 5. Integration Testing

- [ ] **Test G4 Integration (if implementing)**
  ```typescript
  // Test augmentG4WithNameCheck
  import { augmentG4WithNameCheck } from '@/lib/modules/g4-integration';
  
  const brief = `Launching "eBay QuickSell" for automated listings`;
  const result = await augmentG4WithNameCheck(brief);
  
  console.log(result.status); // Should be 'Fail'
  console.log(result.reasoning); // Should mention portfolio conflict
  ```

- [ ] **Test Error Handling**
  - Remove `EBAY_APP_ID` temporarily
  - Call API
  - Expected: 503 status with clear error message
  - Restore `EBAY_APP_ID`

- [ ] **Test Invalid Input**
  ```bash
  # Empty names
  curl -X POST http://localhost:3000/api/check-names \
    -H "Content-Type: application/json" \
    -d '{"names": []}'
  # Expected: 400 error
  
  # Too many names
  curl -X POST http://localhost:3000/api/check-names \
    -H "Content-Type: application/json" \
    -d '{"names": ["1","2","3","4","5","6","7","8","9","10","11"]}'
  # Expected: 400 error (max 10)
  ```

## Deployment

### 6. Staging Deployment

- [ ] **Deploy to Staging**
  - Push code to staging branch
  - Verify deployment completes
  - Check environment variables are set

- [ ] **Smoke Test on Staging**
  ```bash
  curl -X POST https://your-staging-url.com/api/check-names \
    -H "Content-Type: application/json" \
    -d '{"names": "TestProduct"}'
  ```

- [ ] **Test Redis Cache (if configured)**
  - Check Redis connection
  - Verify cache writes
  - Monitor cache hit rate

- [ ] **Load Testing (Optional)**
  ```bash
  # Use Apache Bench or similar
  ab -n 100 -c 10 -p payload.json -T application/json \
    https://your-staging-url.com/api/check-names
  ```

### 7. Production Deployment

- [ ] **Backup Current State**
  - Create git tag for current release
  - Document current configuration

- [ ] **Deploy to Production**
  - Merge to main/production branch
  - Verify deployment succeeds
  - Check environment variables

- [ ] **Verify API Endpoint**
  ```bash
  curl -X POST https://your-production-url.com/api/check-names \
    -H "Content-Type: application/json" \
    -d '{"names": "TestProduct"}'
  ```

- [ ] **Monitor Initial Traffic**
  - Watch server logs
  - Check for errors
  - Monitor response times
  - Track cache hit rate

### 8. Integration Deployment (if chosen)

#### Option A: Automatic G4 Enhancement

- [ ] **Modify `/app/api/evaluate/route.ts`**
  - Add import: `import { augmentG4WithNameCheck } from '@/lib/modules/g4-integration';`
  - Add enhancement code after gatekeeper (see INTEGRATION_EXAMPLE.md)
  - Test locally first

- [ ] **Deploy Enhanced Evaluate Endpoint**
  - Deploy to staging
  - Test with known conflicts
  - Verify G4 reasoning includes name check data
  - Deploy to production

#### Option B: Pre-flight Check

- [ ] **Add Frontend Validation**
  - Update evaluation form component
  - Add name extraction logic
  - Add confirmation dialog for high-risk names
  - Test user flow

- [ ] **Deploy Frontend Changes**
  - Deploy to staging
  - Test user experience
  - Deploy to production

## Post-Deployment

### 9. Monitoring Setup

- [ ] **Set Up Error Tracking**
  - Configure Sentry or similar
  - Track API errors
  - Alert on rate limit exceeded
  - Monitor external API failures

- [ ] **Set Up Analytics**
  - Track API usage
  - Monitor cache hit rate
  - Measure response times
  - Track conflict detection rate

- [ ] **Create Dashboard**
  - API request volume
  - Error rates
  - Average response time
  - Cache performance
  - G4 impact (if integrated)

### 10. Documentation

- [ ] **Update README**
  - Add section about name checking
  - Link to documentation files
  - Document environment variables

- [ ] **Team Training**
  - Share documentation with team
  - Demo API usage
  - Explain integration options
  - Document troubleshooting steps

- [ ] **API Documentation**
  - Add to API docs
  - Document request/response format
  - List error codes
  - Provide examples

## Maintenance

### 11. Ongoing Tasks

- [ ] **Weekly**
  - Check error logs
  - Monitor API usage
  - Review cache hit rate
  - Check eBay API quota usage

- [ ] **Monthly**
  - Update eBay portfolio list
  - Review and optimize rate limits
  - Analyze naming patterns
  - Update documentation

- [ ] **Quarterly**
  - Review trademark client implementation
  - Consider upgrading to paid APIs if needed
  - Analyze G4 gate accuracy
  - Plan feature enhancements

### 12. Future Enhancements

- [ ] **Implement Real USPTO API**
  - Replace mock trademark implementation
  - Test with real data
  - Monitor costs and rate limits

- [ ] **Add International Trademarks**
  - Integrate WIPO Global Brand Database
  - Add EU trademark checking
  - Support multi-region validation

- [ ] **Improve Name Extraction**
  - Use LLM for better parsing
  - Support multiple name candidates
  - Handle variations automatically

- [ ] **Add ML/AI Features**
  - Train model on historical decisions
  - Predict G4 pass/fail probability
  - Suggest alternative names

## Rollback Plan

### If Issues Occur

- [ ] **Quick Rollback - API Endpoint**
  ```bash
  # Revert to previous deployment
  git revert HEAD
  git push
  ```

- [ ] **Quick Rollback - G4 Integration**
  ```typescript
  // In /app/api/evaluate/route.ts
  // Comment out or wrap in feature flag
  const ENABLE_NAME_CHECKING = false;
  
  if (ENABLE_NAME_CHECKING) {
    // name checking code
  }
  ```

- [ ] **Disable in Production**
  - Remove `EBAY_APP_ID` environment variable
  - System will gracefully degrade
  - Portfolio checking still works

- [ ] **Emergency Contact**
  - Data engineering team
  - DevOps on-call
  - API provider support

## Success Metrics

Track these KPIs after deployment:

- [ ] **API Health**
  - Uptime: > 99.9%
  - Error rate: < 1%
  - Average response time: < 2s (uncached), < 200ms (cached)

- [ ] **Usage Metrics**
  - Daily API calls
  - Unique names checked
  - Cache hit rate: > 70%
  - Rate limit hits: < 5/day

- [ ] **Business Impact**
  - G4 gate accuracy improvement
  - Time saved on manual review
  - Conflicts caught automatically
  - False positive rate

## Checklist Summary

### Critical Path
1. ✅ Get eBay App ID
2. ✅ Set environment variables
3. ✅ Test locally
4. ✅ Deploy to staging
5. ✅ Test on staging
6. ✅ Deploy to production
7. ✅ Monitor initial traffic

### Optional Enhancements
- ⚠️ Configure Redis cache (recommended)
- ⚠️ Integrate with G4 gate (high value)
- ⚠️ Add frontend validation
- ⚠️ Set up monitoring dashboard

### Future Work
- 📅 Implement real USPTO API
- 📅 Add international trademark support
- 📅 Improve name extraction with LLM
- 📅 Build ML model for predictions

---

**Last Updated:** April 2, 2026
**Version:** 1.0.0
**Status:** Ready for Deployment ✅

## Quick Reference

### Environment Variables
```bash
EBAY_APP_ID=required
UPSTASH_REDIS_REST_URL=optional
UPSTASH_REDIS_REST_TOKEN=optional
```

### Test Commands
```bash
# Run tests
npm run test tests/name-checker.test.ts

# Start dev server
npm run dev

# Test API
curl -X POST http://localhost:3000/api/check-names \
  -H "Content-Type: application/json" \
  -d '{"names": "TestProduct"}'
```

### Key Files
- API: `/app/api/check-names/route.ts`
- Core: `/lib/modules/name-checker.ts`
- G4: `/lib/modules/g4-integration.ts`
- Tests: `/tests/name-checker.test.ts`
- Docs: `EBAY_NAME_CHECKER_GUIDE.md`

### Support
- Documentation: 4 guide files in repo root
- Examples: `/examples/name-checker-usage.ts`
- Integration: `INTEGRATION_EXAMPLE.md`
